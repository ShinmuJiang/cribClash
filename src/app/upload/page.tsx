'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUploadForm } from '@/context/UploadFormContext';

// Simplified component definitions to avoid dependency issues
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = "default", 
  className = "", 
  disabled = false 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: "default" | "outline"; 
  className?: string; 
  disabled?: boolean;
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2";
  
  const variantClasses = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Input = ({ 
  id, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  className = ""
}: { 
  id?: string; 
  type?: string; 
  placeholder?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  className?: string;
}) => (
  <input 
    id={id}
    type={type} 
    placeholder={placeholder} 
    value={value} 
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-500 text-black ${className}`}
  />
);

const Select = ({ 
  id, 
  value, 
  onChange, 
  className = ""
}: { 
  id?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
  className?: string;
}) => (
  <select 
    id={id}
    value={value} 
    onChange={onChange}
    className={`
      flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50
      ${value === "" ? "text-gray-500" : "text-gray-900"}
      ${className}
    `}
  >
    <option value="" className="text-gray-500">Select lease term</option>
    <option value="9-months" className="text-gray-900">9 months</option>
    <option value="12-months" className="text-gray-900">12 months</option>
    <option value="18-months" className="text-gray-900">18 months</option>
    <option value="24-months" className="text-gray-900">24 months</option>
    <option value="18-months" className="text-gray-900">Other</option>
  </select>
);

const Label = ({ 
  htmlFor, 
  children, 
  className = ""
}: { 
  htmlFor?: string; 
  children: React.ReactNode; 
  className?: string;
}) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 mb-1 block ${className}`}>
    {children}
  </label>
);

const UploadPage = () => {
  const router = useRouter();
  const { formData, updateFormData } = useUploadForm();

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleContinue = () => {
    router.push("/upload/details");
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  const isFormValid = 
    formData.apartmentName && 
    formData.apartmentAddress && 
    formData.leaseTerm && 
    formData.schoolUniversity && 
    formData.contactInformation;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-lato relative">
      <div className="w-full max-w-[92vw] mx-auto px-2 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-5">
        {/* Left: Form Box */}
        <div className="w-full max-w-[600px] lg:w-[46%] h-[62vh] lg:absolute lg:left-[17.5%] lg:top-1/2 lg:transform lg:-translate-y-1/2">
          <Card className="w-full h-full flex flex-col justify-between px-6 py-4">
            <CardContent className="h-full flex flex-col justify-between">
              <div className="text-center mt-7">
                <h1 className="text-2xl font-bold text-gray-900">Initial Details</h1>
                <p className="text-sm text-gray-600 mt-0.5">Let's start with the basic information about your apartment</p>
              </div>
              
              <div className="space-y-3 text-sm sm:text-base -mt-5">
                <Label htmlFor="apartmentName" className="text-xs sm:text-sm">Name</Label>
                <Input
                  id="apartmentName"
                  placeholder="give ur place a name (e.g., Blake Babes)"
                  value={formData.apartmentName}
                  onChange={(e) => handleInputChange("apartmentName", e.target.value)}
                  className="h-10"
                />

                <Label htmlFor="apartmentAddress" className="text-xs sm:text-sm">Address</Label>
                <Input
                  id="apartmentAddress"
                  placeholder="e.g., 678 Main St, Apt 21, Berkeley, CA 94704"
                  value={formData.apartmentAddress}
                  onChange={(e) => handleInputChange("apartmentAddress", e.target.value)}
                  className="h-10"
                />

                <Label htmlFor="leaseTerm" className="text-xs sm:text-sm">Lease Term</Label>
                <Select
                  id="leaseTerm"
                  value={formData.leaseTerm}
                  onChange={(e) => handleInputChange("leaseTerm", e.target.value)}
                />

                <Label htmlFor="schoolUniversity" className="text-xs sm:text-sm">School/University</Label>
                <Input
                  id="schoolUniversity"
                  placeholder="e.g., UC Berkeley"
                  value={formData.schoolUniversity}
                  onChange={(e) => handleInputChange("schoolUniversity", e.target.value)}
                  className="h-10"
                />

                <Label htmlFor="contactInformation" className="text-xs sm:text-sm">Submitted By</Label>
                <Input
                  id="contactInformation"
                  placeholder="ur name (won't be displayed)"
                  value={formData.contactInformation}
                  onChange={(e) => handleInputChange("contactInformation", e.target.value)}
                  className="h-10"
                />
              </div>

              <div className="flex justify-between items-center px-2 mt-6">
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="px-4 py-1.5 text-xs sm:text-sm w-24 text-center"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleContinue}
                  disabled={!isFormValid}
                  className="px-4 py-1.5 text-xs sm:text-sm w-24 text-center"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right: Video Box */}
        <div className="w-full lg:w-[38%] h-[59vh] flex items-center justify-center lg:absolute lg:right-[10%] lg:top-1/2 lg:transform lg:-translate-y-1/2">
          <video
            src="/pictures/clash1.mov"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            className="h-[95%] w-auto object-contain rounded-lg pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadPage;