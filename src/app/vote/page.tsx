'use client';

import Link from 'next/link';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Header from "@/components/Header";
import { InteractionPanel } from "@/components/VoteInteractionPanel";

// Mock data for apartments
const mockApartments = [
  {
    name: "Smith Hall 204",
    school: "University of Michigan",
    eloRating: 1250,
    photos: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop"
    ],
    special: "This dorm has amazing natural lighting and a great view of the campus. The room feels spacious and modern with updated furniture.",
    perfectNight: "A perfect night here involves studying by the large window, then relaxing with roommates in the common area. The atmosphere is cozy and welcoming.",
    features: ["Natural Light", "Modern Furniture", "Private Bath"],
    rating: 4.8,
    location: "North Campus"
  },
  {
    name: "East Quad 312",
    school: "University of Michigan",
    eloRating: 1320,
    photos: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop"
    ],
    special: "Located in the heart of campus, this room offers convenience and community. The building has great amenities and a vibrant social scene.",
    perfectNight: "Perfect nights include game nights with neighbors, late-night study sessions in the lounge, and enjoying the central location for campus events.",
    features: ["City View", "Spacious", "Modern Kitchen"],
    rating: 4.9,
    location: "Central Campus"
  }
];

function ApartmentCard({ apt, side }: { apt: typeof mockApartments[0]; side: 'left' | 'right' }) {
  return (
    <div className="text-center w-full max-w-[600px]">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{apt.name}</h2>
      <p className="text-gray-500 text-base">ELO: {apt.eloRating}</p>
    </div>
  );
}

function ImageCarousel({ leftPhotos, rightPhotos }: { leftPhotos: string[]; rightPhotos: string[] }) {
  const [leftCurrentIndex, setLeftCurrentIndex] = useState(0);
  const [rightCurrentIndex, setRightCurrentIndex] = useState(0);

  const nextLeft = () => {
    setLeftCurrentIndex((prevIndex) => (prevIndex + 1) % leftPhotos.length);
  };

  const prevLeft = () => {
    setLeftCurrentIndex((prevIndex) => (prevIndex - 1 + leftPhotos.length) % leftPhotos.length);
  };

  const nextRight = () => {
    setRightCurrentIndex((prevIndex) => (prevIndex + 1) % rightPhotos.length);
  };

  const prevRight = () => {
    setRightCurrentIndex((prevIndex) => (prevIndex - 1 + rightPhotos.length) % rightPhotos.length);
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:gap-16 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 mb-12">
      {/* Left Apartment Carousel */}
      <div className="flex flex-col items-start md:items-center justify-center" style={{ transform: 'translateX(-0.5vw)' }}>
        <div className="relative w-full max-w-[600px] aspect-[4/3]">
          <img 
            src={leftPhotos[leftCurrentIndex]} 
            alt="Apartment" 
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          {/* Left Arrow */}
          {leftCurrentIndex > 0 && (
            <button 
              onClick={prevLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ width: 'clamp(24px, 2.5vw, 32px)', height: 'clamp(24px, 2.5vw, 32px)' }}
            >
              <ChevronLeft className="text-white drop-shadow-lg" style={{ width: 'clamp(16px, 1.8vw, 24px)', height: 'clamp(16px, 1.8vw, 24px)' }} />
            </button>
          )}
          {/* Right Arrow */}
          {leftCurrentIndex < leftPhotos.length - 1 && (
            <button 
              onClick={nextLeft}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ width: 'clamp(24px, 2.5vw, 32px)', height: 'clamp(24px, 2.5vw, 32px)' }}
            >
              <ChevronRight className="text-white drop-shadow-lg" style={{ width: 'clamp(16px, 1.8vw, 24px)', height: 'clamp(16px, 1.8vw, 24px)' }} />
            </button>
          )}
          {/* Image Counter */}
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {leftCurrentIndex + 1} / {leftPhotos.length}
          </div>
        </div>
      </div>

      {/* Right Apartment Carousel */}
      <div className="flex flex-col items-start md:items-center justify-center" style={{ transform: 'translateX(0.5vw)' }}>
        <div className="relative w-full max-w-[600px] aspect-[4/3]">
          <img 
            src={rightPhotos[rightCurrentIndex]} 
            alt="Apartment" 
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          {/* Left Arrow */}
          {rightCurrentIndex > 0 && (
            <button 
              onClick={prevRight}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ width: 'clamp(24px, 2.5vw, 32px)', height: 'clamp(24px, 2.5vw, 32px)' }}
            >
              <ChevronLeft className="text-white drop-shadow-lg" style={{ width: 'clamp(16px, 1.8vw, 24px)', height: 'clamp(16px, 1.8vw, 24px)' }} />
            </button>
          )}
          {/* Right Arrow */}
          {rightCurrentIndex < rightPhotos.length - 1 && (
            <button 
              onClick={nextRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ width: 'clamp(24px, 2.5vw, 32px)', height: 'clamp(24px, 2.5vw, 32px)' }}
            >
              <ChevronRight className="text-white drop-shadow-lg" style={{ width: 'clamp(16px, 1.8vw, 24px)', height: 'clamp(16px, 1.8vw, 24px)' }} />
            </button>
          )}
          {/* Image Counter */}
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {rightCurrentIndex + 1} / {rightPhotos.length}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoomDetailsRow({ leftApt, rightApt }: { leftApt: typeof mockApartments[0]; rightApt: typeof mockApartments[0] }) {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:gap-16 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 mb-12">
      <div className="flex flex-col items-start md:items-center justify-center" style={{ transform: 'translateX(-0.5vw)' }}>
        <div className="text-center md:text-left w-full max-w-[600px]">
          <p className="text-gray-600 text-sm mb-1">{leftApt.special}</p>
          <p className="text-gray-500 text-xs">{leftApt.school}</p>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-center justify-center" style={{ transform: 'translateX(0.5vw)' }}>
        <div className="text-center md:text-left w-full max-w-[600px]">
          <p className="text-gray-600 text-sm mb-1">{rightApt.special}</p>
          <p className="text-gray-500 text-xs">{rightApt.school}</p>
        </div>
      </div>
    </div>
  );
}

function ContentRow({ leftContent, rightContent, title }: { leftContent: string; rightContent: string; title: string }) {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:gap-16 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 mb-12">
      <div className="flex flex-col items-start md:items-center justify-center" style={{ transform: 'translateX(-0.5vw)' }}>
        <div className="w-full max-w-[600px]">
          <h3 className="font-semibold text-gray-800 mb-2 text-center md:text-left">{title}</h3>
          <p className="text-gray-600 text-center md:text-left leading-relaxed">{leftContent}</p>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-center justify-center" style={{ transform: 'translateX(0.5vw)' }}>
        <div className="w-full max-w-[600px]">
          <h3 className="font-semibold text-gray-800 mb-2 text-center md:text-left">{title}</h3>
          <p className="text-gray-600 text-center md:text-left leading-relaxed">{rightContent}</p>
        </div>
      </div>
    </div>
  );
}

function FeaturesRow({ leftApt, rightApt }: { leftApt: typeof mockApartments[0]; rightApt: typeof mockApartments[0] }) {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:gap-16 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 mb-12">
      <div className="flex flex-col items-start md:items-center justify-center" style={{ transform: 'translateX(-0.5vw)' }}>
        <div className="w-full max-w-[600px]">
          <h3 className="font-semibold text-gray-800 mb-3 text-center md:text-left">Features</h3>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {leftApt.features.map((feature, index) => (
              <span key={`left-${feature}-${index}`} className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border border-gray-200">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-center justify-center" style={{ transform: 'translateX(0.5vw)' }}>
        <div className="w-full max-w-[600px]">
          <h3 className="font-semibold text-gray-800 mb-3 text-center md:text-left">Features</h3>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {rightApt.features.map((feature, index) => (
              <span key={`right-${feature}-${index}`} className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border border-gray-200">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VoteRow({ leftApt, rightApt }: { leftApt: typeof mockApartments[0]; rightApt: typeof mockApartments[0] }) {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:gap-16 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 mb-12">
      <div className="flex flex-col items-start md:items-center justify-center gap-2" style={{ transform: 'translateX(-0.5vw)' }}>
        <button className="px-8 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-base shadow hover:bg-blue-700 active:bg-blue-800 transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
          <Heart className="w-4 h-4" /> Vote
        </button>
      </div>
      <div className="flex flex-col items-start md:items-center justify-center gap-2" style={{ transform: 'translateX(0.5vw)' }}>
        <button className="px-8 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-base shadow hover:bg-blue-700 active:bg-blue-800 transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
          <Heart className="w-4 h-4" /> Vote
        </button>
      </div>
    </div>
  );
}

export default function VotePage() {
  const leftApt = mockApartments[0];
  const rightApt = mockApartments[1];

  return (
    <main className="min-h-screen bg-gray-50 pb-12 flex flex-col">
      <Header />
      {/* Left Apartment Interaction Panel */}
      <div className="fixed top-1/2 -translate-y-1/2 left-[2vw] z-50">
        <InteractionPanel apartmentId="smith-hall-204" side="left" />
      </div>

      {/* Right Apartment Interaction Panel */}
      <div className="fixed top-1/2 -translate-y-1/2 right-[2vw] z-50">
        <InteractionPanel apartmentId="east-quad-312" side="right" />
      </div>

      <div className="flex-1 flex flex-col justify-between max-w-[1800px] mx-auto w-full pt-8 px-4 sm:px-6 lg:px-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 mt-2 text-black">Choose a Crib</h2>
          <p className="text-center text-gray-500 mb-8">Check out the photos and prompts below</p>
          
          <div className="relative">
            {/* Apartment Names and Info */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:gap-16 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 mb-12">
              <div className="flex flex-col items-start md:items-center justify-center" style={{ transform: 'translateX(-0.5vw)' }}>
                <ApartmentCard apt={leftApt} side="left" />
              </div>
              <div className="flex flex-col items-start md:items-center justify-center" style={{ transform: 'translateX(0.5vw)' }}>
                <ApartmentCard apt={rightApt} side="right" />
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 rounded-full" />

            {/* Skip Button - Circular on vertical divider in the middle */}
            <button className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-gray-700 font-semibold shadow-lg hover:bg-gray-50 active:bg-gray-100 transition flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300 z-50 border border-gray-200" style={{ width: '4.287vw', height: '4.287vw', minWidth: '86px', minHeight: '86px' }}>
              <div className="text-center leading-relaxed flex flex-col items-center justify-center" style={{ fontSize: 'min(1.155vw, 14px)', transform: 'translateY(0.75px)' }}>
                <div>Next</div>
                <div>Pair</div>
              </div>
            </button>

            {/* Image Carousel */}
            <ImageCarousel leftPhotos={leftApt.photos} rightPhotos={rightApt.photos} />

            {/* Room Details */}
            <RoomDetailsRow leftApt={leftApt} rightApt={rightApt} />

            {/* First Prompt */}
            <ContentRow 
              leftContent={leftApt.special} 
              rightContent={rightApt.special} 
              title="What makes this dorm special?"
            />

            {/* Second Prompt */}
            <ContentRow 
              leftContent={leftApt.perfectNight} 
              rightContent={rightApt.perfectNight} 
              title="Perfect night in this room looks like:"
            />

            {/* Features */}
            <FeaturesRow leftApt={leftApt} rightApt={rightApt} />

            {/* Vote Buttons */}
            <VoteRow leftApt={leftApt} rightApt={rightApt} />
          </div>
        </div>

        {/* Remove the bottom skip button since it's now in the middle */}
      </div>
    </main>
  );
} 