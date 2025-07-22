'use client';
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
    <option value="6-months" className="text-gray-900">6 months</option>
    <option value="9-months" className="text-gray-900">9 months</option>
    <option value="12-months" className="text-gray-900">12 months</option>
    <option value="15-months" className="text-gray-900">15 months</option>
    <option value="18-months" className="text-gray-900">18 months</option>
    <option value="24-months" className="text-gray-900">24 months</option>
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
    router.push("/upload/pictures_prompts");
  };

  const handleBack = () => {
    router.back();
  };

  const isFormValid = 
    formData.numBedrooms && 
    formData.numBathrooms && 
    formData.numRoommates && 
    formData.noiseLevel && 
    formData.cleanlinessLevel;

  // Helper function to generate number options
  const numberOptions = (start: number, end: number, step: number = 1) => {
    const options = [];
    for (let i = start; i <= end; i += step) {
      options.push({ value: i.toString(), label: i.toString() });
    }
    return options;
  };

  const ratingOptions = [1, 2, 3, 4, 5].map(num => ({
    value: num.toString(),
    label: num.toString()
  }));

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-lato relative">
      <div className="w-full max-w-[92vw] mx-auto px-2 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-5">
        {/* Left: Form Box */}
        <div className="w-full max-w-[600px] lg:w-[46%] h-[62vh] lg:absolute lg:left-[17.5%] lg:top-1/2 lg:transform lg:-translate-y-1/2">
          <Card className="w-full h-full flex flex-col justify-between px-6 py-4">
            <CardContent className="h-full flex flex-col justify-between">
              <div className="text-center mt-7">
                <h1 className="text-2xl font-bold text-gray-900">Tell us about your space</h1>
                <p className="text-sm text-gray-600 mt-0.5">Help others get a feel for your place with these details</p>
              </div>
              
              <div className="space-y-3 text-sm sm:text-base -mt-5">
                {/* First row - Bedrooms and Bathrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numBedrooms" className="text-xs sm:text-sm"># of Bedrooms</Label>
                    <select
                      id="numBedrooms"
                      value={formData.numBedrooms || ''}
                      onChange={(e) => handleInputChange("numBedrooms", e.target.value)}
                      className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${formData.numBedrooms ? 'text-gray-900' : 'text-gray-500'}`}
                    >
                      <option value="">Select</option>
                      {numberOptions(0, 10).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="numBathrooms" className="text-xs sm:text-sm"># of Bathrooms</Label>
                    <select
                      id="numBathrooms"
                      value={formData.numBathrooms || ''}
                      onChange={(e) => handleInputChange("numBathrooms", e.target.value)}
                      className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${formData.numBathrooms ? 'text-gray-900' : 'text-gray-500'}`}
                    >
                      <option value="">Select</option>
                      {numberOptions(0, 5, 0.5).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Second row - Roommates and Alcohol Policy */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numRoommates" className="text-xs sm:text-sm"># of Roommates</Label>
                    <Input
                      id="numRoommates"
                      type="number"
                      placeholder="e.g., 3"
                      value={formData.numRoommates || ''}
                      onChange={(e) => handleInputChange("numRoommates", e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alcoholPolicy" className="text-xs sm:text-sm">Alcohol policy</Label>
                    <Input id="alcoholPolicy" type="text" placeholder="e.g., No hard alcohol, 420-friendly" value={formData.alcoholPolicy || ''} onChange={(e) => handleInputChange("alcoholPolicy", e.target.value)} className="h-10" />
                  </div>
                </div>

                {/* Third row - Noise Level and Cleanliness Level */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="noiseLevel" className="text-xs sm:text-sm">Noise Level</Label>
                    <select
                      id="noiseLevel"
                      value={formData.noiseLevel || ''}
                      onChange={(e) => handleInputChange("noiseLevel", e.target.value)}
                      className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${formData.noiseLevel ? 'text-gray-900' : 'text-gray-500'}`}
                    >
                      <option value="">Select</option>
                      {ratingOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label} {option.label === '1' ? '(Quiet)' : option.label === '5' ? '(Loud)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="cleanlinessLevel" className="text-xs sm:text-sm">Cleanliness Level</Label>
                    <select
                      id="cleanlinessLevel"
                      value={formData.cleanlinessLevel || ''}
                      onChange={(e) => handleInputChange("cleanlinessLevel", e.target.value)}
                      className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${formData.cleanlinessLevel ? 'text-gray-900' : 'text-gray-500'}`}
                    >
                      <option value="">Select</option>
                      {ratingOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label} {option.label === '1' ? '(Messy)' : option.label === '5' ? '(Spotless)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Fourth row - Distance from campus and 3 words */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="distanceFromCampus" className="text-xs sm:text-sm">Distance from campus</Label>
                    <Input
                      id="distanceFromCampus"
                      type="text"
                      placeholder="e.g., 0.5 miles, 10 min walk"
                      value={formData.distanceFromCampus || ''}
                      onChange={(e) => handleInputChange("distanceFromCampus", e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="threeWords" className="text-xs sm:text-sm">3 words to describe your place</Label>
                    <Input id="threeWords" type="text" placeholder="e.g., Cozy, vibrant, social" value={formData.threeWords || ''} onChange={(e) => handleInputChange("threeWords", e.target.value)} className="h-10" />
                  </div>
                </div>

                {/* Fifth row - House Pets (full width) */}
                <div>
                  <Label htmlFor="housePets" className="text-xs sm:text-sm">House Pets</Label>
                  <Input
                    id="housePets"
                    type="text"
                    placeholder="be creative (e.g., a succulent named Pumperdickle)"
                    value={formData.housePets || ''}
                    onChange={(e) => handleInputChange("housePets", e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center px-2 mt-6">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="px-4 py-1.5 text-xs sm:text-sm w-24 text-center"
                >
                  <span className="flex items-center relative -ml-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ top: '0.5px', position: 'relative' }}>
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back
                  </span>
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
            src="/pictures/clash2.mov"
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