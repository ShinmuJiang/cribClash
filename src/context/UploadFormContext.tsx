'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

type FormData = {
  // Initial Details
  apartmentName: string;
  apartmentAddress: string;
  leaseTerm: string;
  schoolUniversity: string;
  contactInformation: string;
  
  // Property Details
  squareFootage: string;
  numBedrooms: string;
  numBathrooms: string;
  numRoommates: string;
  noiseLevel: string;
  cleanlinessLevel: string;
  housePets: string;
  distanceFromCampus: string;
  alcoholPolicy: string;
  threeWords: string;
};

type UploadFormContextType = {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  resetForm: () => void;
};

const defaultFormData: FormData = {
  // Initial Details
  apartmentName: '',
  apartmentAddress: '',
  leaseTerm: '',
  schoolUniversity: '',
  contactInformation: '',
  
  // Property Details
  squareFootage: '',
  numBedrooms: '',
  numBathrooms: '',
  numRoommates: '',
  noiseLevel: '',
  cleanlinessLevel: '',
  housePets: '',
  distanceFromCampus: '',
  alcoholPolicy: '',
  threeWords: '',
};

const UploadFormContext = createContext<UploadFormContextType | undefined>(undefined);

export function UploadFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
  };

  return (
    <UploadFormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </UploadFormContext.Provider>
  );
}

export function useUploadForm() {
  const context = useContext(UploadFormContext);
  if (context === undefined) {
    throw new Error('useUploadForm must be used within an UploadFormProvider');
  }
  return context;
}
