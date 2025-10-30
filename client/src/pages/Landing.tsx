import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SceneCard from "@/components/SceneCard";
import { Check, ArrowRight, PlayCircle, Target, TrendingUp } from "lucide-react";
import heroImage from "@assets/generated_images/CareerSim_hero_landing_image_e89256c1.png";
import crisisImage from "@assets/generated_images/Crisis_Manager_scene_thumbnail_43e30343.png";
import startupImage from "@assets/generated_images/Startup_Chaos_scene_thumbnail_97e7d32a.png";
import interviewImage from "@assets/generated_images/Interview_Practice_scene_thumbnail_ce7d07aa.png";
import politicsImage from "@assets/generated_images/Corporate_Politics_scene_thumbnail_587f87ca.png";
import stakeholderImage from "@assets/generated_images/Stakeholder_Management_scene_thumbnail_94691d95.png";

export default function Landing() {
  const featuredScenes = [
    {
      id: "1",
      title: "Crisis Manager: Vendor Breach",
      slug: "crisis-manager",
      thumbnail: crisisImage,
      creator: { handle: "careersim" },
      difficulty: "hard" as const,
      duration: 20,
      mode: "solo" as const,
      skills: ["Crisis Management", "Communication"],
      rating: 4.8,
      plays: 12453,
    },
    {
      id: "2",
      title: "Startup Chaos Mode",
      slug: "startup-chaos",
      thumbnail: startupImage,
      creator: { handle: "hrpro" },
      difficulty: "medium" as const,
      duration: 15,
      mode: "solo" as const,
      skills: ["Adaptability", "Problem Solving"],
      rating: 4.6,
      plays: 8921,
    },
    {
      id: "3",
      title: "Interview Practice Pro",
      slug: "interview-practice",
      thumbnail: interviewImage,
      creator: { handle: "careers101" },
      difficulty: "easy" as const,
      duration: 10,
      mode: "solo" as const,
      skills: ["Communication", "Confidence"],
      rating: 4.9,
      plays: 25678,
    },
    {
      id: "4",
      title: "Corporate Politics 101",
      slug: "corporate-politics",
      thumbnail: politicsImage,
      creator: { handle: "leadership" },
      difficulty: "medium" as const,
      duration: 25,
      mode: "solo" as const,
      skills: ["Stakeholder Mgmt", "Negotiation"],
      rating: 4.7,
      plays: 6543,
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "5 simulations per day",
        "Basic feedback",
        "Public scenarios",
        "Community support",
      ],
    },
    {
      name: "Pro",
      price: "$20",
      period: "/month",
      popular: true,
      features: [
        "Unlimited simulations",
        "Advanced analytics",
        "Custom scenarios",
        "Priority support",
        "PDF exports",
        "Custom themes",
      ],
    },
    {
      name: "Teams",
      price: "$99",
      period: "/month",
      features: [
        "Everything in Pro",
        "Team workspace",
        "Assignment tracking",
        "Admin dashboard",
        "Bulk management",
        "SSO integration",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CS</span>
            </div>
            <span className="font-semibold text-xl text-foreground">CareerSim</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => console.log("Login")} data-testid="button-login">
              Log in
            </Button>
            <Button onClick={() => console.log("Sign up")} data-testid="button-signup">
              Sign up
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30" data-testid="badge-hero-label">
              AI-Powered Career Training
            </Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight" data-testid="heading-hero">
              Master Workplace Scenarios Through Immersive Practice
            </h1>
            <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-description">
              Role-play critical career moments with AI characters. Get real-time feedback on communication, decision-making, and professional skills.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => console.log("Try demo")} data-testid="button-try-demo">
                <PlayCircle className="w-5 h-5 mr-2" />
                Try a Live Demo
              </Button>
              <Button size="lg" variant="outline" onClick={() => console.log("Learn more")} data-testid="button-learn-more">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
            {["Harvard", "Stanford", "Google", "Microsoft"].map((company) => (
              <div key={company} className="text-lg font-semibold text-muted-foreground" data-testid={`logo-${company.toLowerCase()}`}>
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-featured">
              Featured Scenarios
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-featured-description">
              Practice real workplace challenges in a safe environment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredScenes.map((scene) => (
              <SceneCard key={scene.id} {...scene} onStart={() => console.log(`Start ${scene.title}`)} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-how-it-works">
              How It Works
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover-elevate" data-testid="card-step-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Choose a Scenario</h3>
              <p className="text-muted-foreground">
                Select from interview prep, crisis management, leadership challenges, and more
              </p>
            </Card>
            
            <Card className="p-6 text-center hover-elevate" data-testid="card-step-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <PlayCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Practice in Real-Time</h3>
              <p className="text-muted-foreground">
                Interact with AI characters that adapt to your responses and decisions
              </p>
            </Card>
            
            <Card className="p-6 text-center hover-elevate" data-testid="card-step-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Feedback & Improve</h3>
              <p className="text-muted-foreground">
                Receive detailed rubric scores and actionable insights on your performance
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-pricing">
              Choose Your Plan
            </h2>
            <p className="text-lg text-muted-foreground">
              Start free, upgrade anytime
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`p-8 ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
                data-testid={`card-plan-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <Badge className="mb-4 bg-primary text-primary-foreground">Most Popular</Badge>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => console.log(`Select ${plan.name}`)}
                  data-testid={`button-select-${plan.name.toLowerCase()}`}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Scenarios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Community</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 CareerSim. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
