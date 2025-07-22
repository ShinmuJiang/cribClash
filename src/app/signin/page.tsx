'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

// Simplified component definitions to avoid dependency issues
const Card = ({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`} style={style}>{children}</div>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = "default", 
  size = "default", 
  className = "", 
  disabled = false,
  type = "button",
  style
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: string; 
  size?: string; 
  className?: string; 
  disabled?: boolean;
  type?: "button" | "submit";
  style?: React.CSSProperties;
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground"
  };
  const sizeClasses = {
    default: "h-10 py-2 px-4",
    icon: "h-10 w-10"
  };
  
  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default} ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default} ${className}`}
      style={style}
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
  className = "",
  style 
}: { 
  id?: string; 
  type?: string; 
  placeholder?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  className?: string; 
  style?: React.CSSProperties;
}) => (
  <input 
    id={id}
    type={type} 
    placeholder={placeholder} 
    value={value} 
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    style={{ ...style, color: 'black' }}
  />
);

const Label = ({ 
  htmlFor, 
  children, 
  className = "", 
  style 
}: { 
  htmlFor?: string; 
  children: React.ReactNode; 
  className?: string; 
  style?: React.CSSProperties; 
}) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} style={style}>
    {children}
  </label>
);

const Checkbox = ({ 
  id, 
  checked, 
  onCheckedChange,
  style 
}: { 
  id?: string; 
  checked: boolean; 
  onCheckedChange: (checked: boolean) => void; 
  style?: React.CSSProperties;
}) => (
  <input 
    id={id}
    type="checkbox" 
    checked={checked} 
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="h-4 w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-primary"
    style={style}
  />
);

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    // Navigate to verification page
    router.push("/verify-email");
  };

  const handleSignIn = () => {
    // Navigate to sign in (this would be a separate page in a real app)
    console.log("Sign in clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4 flex items-center justify-center">
      {/* Background apartment image overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000')",
        }}
      />
      
      {/* Main container - 20% smaller total (10% + 10%) */}
      <div className="relative z-10 w-full max-w-[28rem] mx-4">
        <div className="w-full flex justify-center">
          {/* Form container - 20% smaller total (10% + 10%) */}
          <div className="w-full max-w-md">
            <Card className="w-full shadow-2xl border-0">
              <CardContent className="p-6">
                {/* Back button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 left-4 text-black hover:text-gray-700"
                  onClick={() => router.push("/")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                {/* Logo and title - adjusted spacing */}
                <div className="text-center mb-6">
                  <div className="text-3xl mb-2">⚡</div>
                  <h1 className="text-xl font-bold text-black mb-1">Crib Clash</h1>
                  <h2 className="text-base font-semibold text-black">Create your Account</h2>
                </div>
                {/* Form - adjusted spacing */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-black">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address..."
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1 bg-gray-100 text-gray-300 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-black">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password..."
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="bg-gray-100 pr-10 text-gray-300 placeholder:text-gray-400"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-300" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-300" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-black">
                      Confirm Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password..."
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="bg-gray-100 pr-10 text-gray-300 placeholder:text-gray-400"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-300" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-300" />
                        )}
                      </Button>
                    </div>
                  </div>
                  {/* Terms checkbox - more space */}
                  <div className="flex items-center space-x-2 mt-6">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptTerms", checked)}
                      style={{ transform: 'translateY(-1.5px) translateX(3px)' }}
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-black cursor-pointer"
                      style={{ transform: 'translateY(-2.5px) translateX(3px)' }}
                    >
                      By signing up, I accept the {" "}
                      <button className="text-blue-600 hover:underline">terms of use</button>
                    </Label>
                  </div>
                  {/* Container for sign-up button, divider, and Google button */}
                  <div className="mt-6 space-y-6">
                    {/* Sign up button */}
                    <Button
                      onClick={() => router.push("/signin/verify")}
                      disabled={!formData.email || !formData.password || !formData.confirmPassword || !formData.acceptTerms}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg text-base"
                    >
                      Sign Up
                    </Button>
                    
                    {/* Divider with centered text */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-3 bg-white text-sm text-gray-600">or continue with</span>
                      </div>
                    </div>
                    
                    {/* Google sign in */}
                    <Button
                      variant="outline"
                      className="w-full py-3 border-2 text-black bg-gray-100 border-gray-300 hover:bg-gray-200 text-sm"
                      onClick={() => console.log("Google sign in")}
                    >
                      <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google"
                        className="w-5 h-5 mr-2"
                      />
                      Continue with Google
                    </Button>
                  </div>
                  {/* Sign in link - more space */}
                  <div className="text-center mt-6">
                    <span className="text-sm text-black">
                      Already have an account?{" "}
                      <button
                        onClick={handleSignIn}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Sign in.
                      </button>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 