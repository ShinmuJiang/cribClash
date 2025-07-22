"use client";
import { useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useUploadForm } from '@/context/UploadFormContext';
import { supabase } from '@/lib/supabase';
import { CropModal } from './CropModal';

interface PhotoState {
  originalFile: File;
  croppedPreview: string; // data URL
  zoom?: number;
  offset?: { x: number; y: number };
}

export default function PicturesPromptsPage() {
  const router = useRouter();
  const { formData } = useUploadForm();
  const [photos, setPhotos] = useState<PhotoState[]>([]);
  const [prompts, setPrompts] = useState({ prompt1: "", prompt2: "" });
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [imageToCrop, setImageToCrop] = useState<{file: File, index: number, zoom?: number, offset?: {x: number, y: number}} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (photos.length + files.length > 4) return;
    // For each file, create a PhotoState with originalFile and empty croppedPreview
    const newPhotoStates = files.map(f => ({ originalFile: f, croppedPreview: '', zoom: undefined, offset: undefined }));
    setPhotos(prev => [...prev, ...newPhotoStates].slice(0, 4));
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handlePromptChange = (field: "prompt1" | "prompt2", value: string) => {
    setPrompts(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = photos.length >= 4 && prompts.prompt1 && prompts.prompt2;

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    setPhotos(prev => {
      const newPhotos = [...prev];
      const [removed] = newPhotos.splice(draggedIndex, 1);
      newPhotos.splice(index, 0, removed);
      return newPhotos;
    });
    setDraggedIndex(null);
  };

  const handleSaveCrop = (croppedImageFile: File, zoom?: number, offset?: {x: number, y: number}) => {
    if (imageToCrop) {
      // Always crop from the original file, and update the preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotos(currentPhotos => {
          const newPhotos = [...currentPhotos];
          newPhotos[imageToCrop.index] = {
            ...newPhotos[imageToCrop.index],
            croppedPreview: e.target?.result as string,
            zoom,
            offset
          };
          return newPhotos;
        });
      };
      reader.readAsDataURL(croppedImageFile);
    }
    setImageToCrop(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 1. Check if user is logged in
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (!user) {
        alert('You must be logged in to submit.');
        setIsSubmitting(false);
        return;
      }

      // 2. Check if apartment with same address exists
      const { data: existing, error: existsError } = await supabase
        .from('ratemydorm_apartments')
        .select('id')
        .eq('address', formData.apartmentAddress)
        .maybeSingle();
      if (existing) {
        alert('An apartment with this address has already been submitted.');
        setIsSubmitting(false);
        return;
      }

      // 3. Upload images and get URLs
      const imageUrls = [];
      for (let i = 0; i < 4; i++) {
        const photo = photos[i];
        if (!photo || !photo.originalFile) throw new Error('All 4 photos are required.');
        const fileExt = photo.originalFile.name.split('.').pop();
        const filePath = `${formData.apartmentAddress.replace(/\W+/g, '_')}_${Date.now()}_${i}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('apartment-names')
          .upload(filePath, photo.originalFile, { upsert: false });
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage
          .from('apartment-names')
          .getPublicUrl(filePath);
        imageUrls.push(publicUrl);
      }

      // 4. Insert into ratemydorm_apartments
      const { error: insertError } = await supabase
        .from('ratemydorm_apartments')
        .insert([{
          apartment_name: formData.apartmentName || '',
          address: formData.apartmentAddress || '',
          lease_term: formData.leaseTerm || '',
          school: formData.schoolUniversity || '',
          submitter: user.email,
          bedrooms: formData.numBedrooms || '',
          bathrooms: formData.numBathrooms || '',
          roommates: formData.numRoommates || '',
          noise_level: formData.noiseLevel || '',
          cleanliness_level: formData.cleanlinessLevel || '',
          distance: formData.distanceFromCampus || '',
          pets: formData.housePets || '',
          alcohol: formData.alcoholPolicy || '',
          describe_apt: formData.threeWords || '',
          pic1: imageUrls[0],
          pic2: imageUrls[1],
          pic3: imageUrls[2],
          pic4: imageUrls[3],
          prompt1: prompts.prompt1,
          prompt2: prompts.prompt2,
        }]);
      if (insertError) throw insertError;

      alert('Apartment submitted successfully!');
      router.push('/dashboard');
    } catch (err: any) {
      alert('Submission failed: ' + (err.message || err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/upload/details');
  };

  // Unified prompt options
  const promptOptions = [
    "The best thing about living here is",
    "What makes my place special",
    "The vibe of my apartment is",
    "My favorite spot in the house is",
    "People always say my place feels",
    "The energy here is",
    "My ideal roommate would be",
    "The perfect night here looks like",
    "Our house rules are",
    "What we're looking for in a roommate",
    "Living with us means",
    "Our daily routine involves"
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fa] py-8 px-4 font-lato">
      <div className="max-w-2xl mx-auto mt-[2vh]">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Submit Your Crib</h1>
          <p className="text-gray-500">
            Show off your space and help other students find their perfect home
          </p>
        </div>

        <div className="space-y-8">
          {/* Photo Upload Section */}
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-1 text-gray-900">Upload Photos</h2>
            <p className="text-gray-500 mb-6 text-sm">Add 4 photos that best represent your space</p>
            <div className="grid grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center bg-white rounded-lg overflow-hidden max-w-[600px] aspect-[4/3]"
                  style={{
                    border: '1px dashed #d1d5db',
                    cursor: photos[index] ? 'pointer' : 'default',
                  }}
                  draggable={!!photos[index]}
                  onDragStart={(e) => { e.stopPropagation(); handleDragStart(index); }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => { e.stopPropagation(); handleDrop(index); }}
                  onClick={() => photos[index] && setImageToCrop({ file: photos[index].originalFile, index, zoom: photos[index].zoom, offset: photos[index].offset })}
                >
                  {/* Order number in top left */}
                  <span className="absolute top-2 left-2 bg-white bg-opacity-80 rounded-full px-2 py-0.5 text-xs font-bold text-gray-700 z-10 border border-gray-200">
                    {index + 1}
                  </span>
                  {photos[index] ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {photos[index].croppedPreview ? (
                        <img
                          src={photos[index].croppedPreview}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(photos[index].originalFile)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                        onClick={(e) => { e.stopPropagation(); removePhoto(index); }}
                        aria-label="Remove photo"
                      >
                        <span className="text-lg leading-none">&times;</span>
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-50 transition-colors">
                      <span className="text-3xl text-gray-400 mb-2">&#8593;</span>
                      <span className="text-sm text-gray-500">Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Prompts Section */}
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-1 text-gray-900">Choose Your Prompts</h2>
            <p className="text-gray-500 mb-6 text-sm">Pick two different prompts and answer each (max 200 characters)</p>
            <div className="space-y-8">
              {/* Prompt 1 */}
              <div>
                <label htmlFor="prompt1" className="block font-semibold text-gray-900 mb-1 text-sm">Prompt 1</label>
                <select
                  id="prompt1"
                  value={prompts.prompt1.split(":")[0] || ""}
                  onChange={e => handlePromptChange("prompt1", e.target.value ? e.target.value + ": " : "")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                >
                  <option value="">Choose a prompt</option>
                  {promptOptions.map(option => (
                    <option key={option} value={option} disabled={prompts.prompt2.split(":")[0] === option}>
                      {option}...
                    </option>
                  ))}
                </select>
                <textarea
                  maxLength={200}
                  placeholder="Write your answer here..."
                  value={prompts.prompt1.split(": ")[1] || ""}
                  onChange={e => {
                    const prefix = prompts.prompt1.split(": ")[0] || "";
                    handlePromptChange("prompt1", prefix + (prefix ? ": " : "") + e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[60px]"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {(prompts.prompt1.split(": ")[1]?.length || 0)}/200
                </div>
              </div>
              {/* Prompt 2 */}
              <div>
                <label htmlFor="prompt2" className="block font-semibold text-gray-900 mb-1 text-sm">Prompt 2</label>
                <select
                  id="prompt2"
                  value={prompts.prompt2.split(":")[0] || ""}
                  onChange={e => handlePromptChange("prompt2", e.target.value ? e.target.value + ": " : "")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                >
                  <option value="">Choose a prompt</option>
                  {promptOptions.map(option => (
                    <option key={option} value={option} disabled={prompts.prompt1.split(":")[0] === option}>
                      {option}...
                    </option>
                  ))}
                </select>
                <textarea
                  maxLength={200}
                  placeholder="Write your answer here..."
                  value={prompts.prompt2.split(": ")[1] || ""}
                  onChange={e => {
                    const prefix = prompts.prompt2.split(": ")[0] || "";
                    handlePromptChange("prompt2", prefix + (prefix ? ": " : "") + e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[60px]"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {(prompts.prompt2.split(": ")[1]?.length || 0)}/200
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-base transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-md bg-blue-400 text-white font-semibold text-base transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!canProceed || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>

        {imageToCrop && (
            <CropModal 
                imageFile={imageToCrop.file}
                onSave={(file, zoom, offset) => handleSaveCrop(file, zoom, offset)}
                onCancel={() => setImageToCrop(null)}
                initialZoom={imageToCrop.zoom}
                initialOffset={imageToCrop.offset}
            />
        )}
      </div>
    </div>
  );
}