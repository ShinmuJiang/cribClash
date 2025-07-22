"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';

// Define a type for the component props
interface CropModalProps {
  imageFile: File;
  onSave: (croppedImageFile: File, zoom?: number, offset?: { x: number; y: number }) => void;
  onCancel: () => void;
  initialZoom?: number;
  initialOffset?: { x: number; y: number };
}

const CROP_BOX_ASPECT_RATIO = 4 / 3;

// Clamp offset so the image always covers the crop box
function clampOffset(image: HTMLImageElement, zoom: number, offset: { x: number; y: number }, canvas: HTMLCanvasElement) {
  const scaledImageWidth = image.width * zoom;
  const scaledImageHeight = image.height * zoom;
  const cropWidth = canvas.width;
  const cropHeight = canvas.height;
  let maxX = Math.max(0, (scaledImageWidth - cropWidth) / 2);
  let minX = -maxX;
  let maxY = Math.max(0, (scaledImageHeight - cropHeight) / 2);
  let minY = -maxY;
  return {
    x: Math.round(Math.max(minX, Math.min(maxX, offset.x))),
    y: Math.round(Math.max(minY, Math.min(maxY, offset.y)))
  };
}

export const CropModal: React.FC<CropModalProps> = ({ imageFile, onSave, onCancel, initialZoom, initialOffset }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(initialZoom ?? 1);
  const [internalInitialZoom, setInternalInitialZoom] = useState(1);
  const [offset, setOffset] = useState(initialOffset ?? { x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  // Load the image file and initialize state
  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        const canvas = canvasRef.current;
        if (canvas) {
          const imageAspect = img.width / img.height;
          let newInitialZoom;
          if (imageAspect > CROP_BOX_ASPECT_RATIO) {
            newInitialZoom = canvas.height / img.height;
          } else {
            newInitialZoom = canvas.width / img.width;
          }
          setInternalInitialZoom(newInitialZoom);
          if (initialZoom === undefined) setZoom(newInitialZoom);
          if (initialOffset === undefined) setOffset({ x: 0, y: 0 });
        }
      };
      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(imageFile);
    // Only reset zoom/offset if not provided
  }, [imageFile, initialZoom, initialOffset]);

  // Clamp zoom and offset after zoom changes
  useEffect(() => {
    if (!image || !canvasRef.current) return;
    // Clamp zoom
    if (zoom < internalInitialZoom) setZoom(internalInitialZoom);
    // Clamp offset
    setOffset((prev) => clampOffset(image, Math.max(zoom, internalInitialZoom), prev, canvasRef.current!));
  }, [zoom, internalInitialZoom, image]);

  // Clamp offset after image or zoom changes
  useEffect(() => {
    if (!image || !canvasRef.current) return;
    setOffset((prev) => clampOffset(image, zoom, prev, canvasRef.current!));
  }, [image, zoom]);

  // The main drawing function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.translate(centerX + offset.x, centerY + offset.y);
    ctx.scale(zoom, zoom);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();

    // Draw gridlines
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 3);
    ctx.lineTo(canvas.width, canvas.height / 3);
    ctx.moveTo(0, (2 * canvas.height) / 3);
    ctx.lineTo(canvas.width, (2 * canvas.height) / 3);
    ctx.moveTo(canvas.width / 3, 0);
    ctx.lineTo(canvas.width / 3, canvas.height);
    ctx.moveTo((2 * canvas.width) / 3, 0);
    ctx.lineTo((2 * canvas.width) / 3, canvas.height);
    ctx.stroke();
  }, [image, zoom, offset]);

  useEffect(() => { draw(); }, [draw]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragStart && image && canvasRef.current) {
      let newOffsetX = e.clientX - dragStart.x;
      let newOffsetY = e.clientY - dragStart.y;
      const clamped = clampOffset(image, zoom, { x: newOffsetX, y: newOffsetY }, canvasRef.current);
      setOffset(clamped);
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  const handleZoomChange = (val: number) => {
    if (!image || !canvasRef.current) return;
    const clampedZoom = Math.max(val, internalInitialZoom);
    setZoom(clampedZoom);
    setOffset((prev) => clampOffset(image, clampedZoom, prev, canvasRef.current!));
  };

  const handleReset = () => {
    setZoom(internalInitialZoom);
    setOffset({ x: 0, y: 0 });
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const outputWidth = 800;
    const outputHeight = outputWidth / CROP_BOX_ASPECT_RATIO;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = outputWidth;
    tempCanvas.height = outputHeight;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;
    const imageCenterX = image.width / 2;
    const imageCenterY = image.height / 2;
    const cropLeft = imageCenterX - ((canvas.width / 2) + offset.x) / zoom;
    const cropTop  = imageCenterY - ((canvas.height / 2) + offset.y) / zoom;
    const cropWidth = canvas.width / zoom;
    const cropHeight = canvas.height / zoom;
    ctx.drawImage(
      image,
      cropLeft,
      cropTop,
      cropWidth,
      cropHeight,
      0,
      0,
      outputWidth,
      outputHeight
    );
    tempCanvas.toBlob((blob) => {
      if (blob) {
        onSave(new File([blob], imageFile.name, { type: 'image/jpeg' }), zoom, offset);
      }
    }, 'image/jpeg', 0.95);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={720}
          height={540}
          className="cursor-grab active:cursor-grabbing rounded-md w-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        <div className="w-full mt-6">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700">Zoom</span>
            <input
              type="range"
              min={internalInitialZoom}
              max={4}
              step={0.01}
              value={zoom}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-6 w-full">
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
          >
            Reset View
          </button>
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-semibold"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 