'use client';

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

// Simplified component definitions to avoid dependency issues
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg ${className}`}>
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
  size = "default", 
  className = "", 
  disabled = false 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: string; 
  size?: string; 
  className?: string; 
  disabled?: boolean;
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  
  const sizeClasses = {
    default: "h-10 py-2 px-4",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]} ${sizeClasses[size as keyof typeof sizeClasses]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const VerifyEmail = () => {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digits
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      // Navigate to main app or success page
      router.push("/");
    }
  };

  const handleResendCode = () => {
    console.log("Resending verification code...");
  };

  const isCodeComplete = code.every(digit => digit !== "");

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-4">
      {/* Background apartment image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000')",
        }}
      />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0">
        <CardContent className="p-8">
          {/* Back button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 text-black hover:text-gray-700"
            onClick={() => router.push("/signin")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Logo and title */}
          <div className="text-center mb-8 mt-4">
            <div className="text-4xl mb-3">⚡</div>
            <h1 className="text-2xl font-bold text-black mb-1">Crib Clash</h1>
            <h2 className="text-xl font-semibold text-black mb-2">Verify your Email</h2>
            <p className="text-sm text-gray-600">
              We've sent a verification code to your email address. Enter the 6-digit code below.
            </p>
          </div>

          {/* Verification code inputs */}
          <div className="flex justify-center space-x-3 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              />
            ))}
          </div>

          {/* Verify button */}
          <Button
            onClick={handleVerify}
            disabled={!isCodeComplete}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mb-4"
          >
            Verify Email
          </Button>

          {/* Resend code */}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                onClick={handleResendCode}
                className="text-blue-600 hover:underline font-medium"
              >
                Resend code
              </button>
            </span>
          </div>

          {/* Timer (optional) */}
          <div className="text-center mt-4">
            <span className="text-xs text-gray-500">
              Code expires in 5:00
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail; 