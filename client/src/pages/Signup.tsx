import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useLocation } from "wouter";
import heroImage from "@assets/generated_images/CareerSim_hero_landing_image_e89256c1.png";

export default function Signup() {
  const [, setLocation] = useLocation();

  const handleSocialSignup = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    setLocation("/home");
  };

  const handleEmailSignup = () => {
    console.log("Continue with email");
    setLocation("/home");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-sm">CS</span>
          </div>
          <span className="font-semibold text-lg text-foreground">CareerSim</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => setLocation("/signup")}
            data-testid="button-goto-signup"
          >
            Sign Up to Chat
          </Button>
          <Button
            variant="outline"
            onClick={() => setLocation("/login")}
            data-testid="button-goto-login"
          >
            Login
          </Button>
        </div>
      </nav>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative flex items-center justify-end w-full max-w-[1440px] px-4 lg:px-12">
          <div className="absolute w-[75%] h-[580px] rounded-2xl overflow-hidden top-1/2 -translate-y-1/2 left-[23%] hidden lg:block">
            <img
              src={heroImage}
              alt="CareerSim"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 w-full max-w-sm bg-[#2C2C2C] border border-gray-700 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2" data-testid="heading-signup">
                Get access to 500+ Scenarios
              </h1>
              <p className="text-sm text-gray-400">
                Sign up in just ten seconds
              </p>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full justify-center gap-3 h-12 bg-white text-black hover:bg-gray-100 active:bg-gray-200 font-medium border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => handleSocialSignup("Google")}
                data-testid="button-google-signup"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </Button>

              <Button
                className="w-full justify-center gap-3 h-12 bg-white text-black hover:bg-gray-100 active:bg-gray-200 font-medium border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => handleSocialSignup("Apple")}
                data-testid="button-apple-signup"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span>Continue with Apple</span>
              </Button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#2C2C2C] px-2 text-gray-500">OR</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full justify-center gap-3 h-12 bg-transparent border-gray-600 text-white hover:bg-gray-800 active:bg-gray-700 font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={handleEmailSignup}
                data-testid="button-email-signup"
              >
                <Mail className="w-5 h-5" />
                <span>Continue with email</span>
              </Button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-6">
              By continuing, you agree to our{" "}
              <a href="#" className="text-gray-400 hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-gray-400 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
