"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Calendar,
  ExternalLink,
  Code,
  Database,
  Server,
  Globe,
  Award,
  GraduationCap,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Zap,
  Rocket,
  Star,
} from "lucide-react";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [skillProgress, setSkillProgress] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "experience",
        "projects",
        "skills",
        "education",
        "achievements",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Animate skill progress bars when skills section is in view
    const skillsSection = document.getElementById("skills");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skills = {
              JavaScript: 90,
              React: 85,
              "Node.js": 80,
              SharePoint: 95,
              MongoDB: 75,
              ".NET": 70,
              "Power Automate": 90,
              AWS: 65,
            };

            Object.entries(skills).forEach(([skill, target], index) => {
              setTimeout(() => {
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                  current += increment;
                  if (current >= target) {
                    current = target;
                    clearInterval(timer);
                  }
                  setSkillProgress((prev) => ({ ...prev, [skill]: current }));
                }, 20);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  function getExperienceString(startYear = 2023, startMonth = 11) {
    // startMonth is 0-indexed (0 = January, so 11 = December)
    const startDate = new Date(startYear, startMonth, 1);
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    // Show as "X.Y years" (e.g., 1.7 years)
    const decimal = Math.round((months / 12) * 10) / 10;
    return `${years + decimal} years`;
  }

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 via-pink-800/20 to-orange-800/20 animate-pulse" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
          }}
        />
        <FloatingParticles />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Harsh Raj
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-purple-400 hover:scale-110 ${
                    activeSection === item.id
                      ? "text-purple-400 scale-110"
                      : "text-white/80"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <button
              className="md:hidden text-white hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 bg-black/40 backdrop-blur-xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:text-purple-400 ${
                    activeSection === item.id
                      ? "text-purple-400"
                      : "text-white/80"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-16 min-h-screen flex items-center justify-center relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Animated greeting */}
            <div className="mb-8 animate-bounce">
              <Sparkles className="h-12 w-12 mx-auto text-yellow-400 animate-spin" />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-6 animate-pulse">
              Harsh Raj
            </h1>

            <div className="relative mb-8">
              <h2 className="text-2xl md:text-4xl text-white font-semibold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  SharePoint Developer
                </span>
                <span className="text-white/80"> & </span>
                <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Full Stack Engineer
                </span>
              </h2>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 animate-pulse"></div>
            </div>

            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              🚀 {getExperienceString()} years of experience crafting innovative
              solutions with
              <span className="text-purple-400 font-semibold">
                {" "}
                MERN stack
              </span>{" "}
              and
              <span className="text-cyan-400 font-semibold">
                {" "}
                SharePoint technologies
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <Mail className="mr-2 h-5 w-5" />
                <Zap className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("projects")}
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm"
              >
                <Rocket className="mr-2 h-5 w-5" />
                View Projects
              </Button>
            </div>
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown className="h-8 w-8 mx-auto text-purple-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold text-white mb-6">
                Professional Summary
              </h3>
              <div className="space-y-4 text-white/80">
                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <p>
                    🎯{" "}
                    <span className="text-purple-400 font-semibold">
                      1.5 years
                    </span>{" "}
                    of experience in SharePoint development, specializing in
                    customizing SharePoint environments to enhance collaboration
                    and business processes, with proficiency in{" "}
                    <span className="text-cyan-400">SPFx</span> and{" "}
                    <span className="text-pink-400">Power Automate</span>.
                  </p>
                </div>
                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <p>
                    🌐 Developed and deployed a fully functional website for{" "}
                    <span className="text-orange-400 font-semibold">
                      softwizzards.com
                    </span>
                    , leveraging the{" "}
                    <span className="text-green-400">MERN stack</span> with
                    custom admin panel for seamless content management.
                  </p>
                </div>
                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <p>
                    ☁️ Skilled in backend deployment on{" "}
                    <span className="text-yellow-400">Amazon EC2</span> with{" "}
                    <span className="text-blue-400">CI/CD pipelines</span> via
                    GitHub Actions for automated deployment and continuous
                    delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Code,
                  title: "Full Stack Development",
                  desc: "MERN Stack, .NET, SPFx",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: Server,
                  title: "SharePoint Development",
                  desc: "On-premise & Online, Power Automate",
                  color: "from-cyan-500 to-blue-500",
                },
                {
                  icon: Database,
                  title: "Database Management",
                  desc: "MongoDB, MySQL",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Globe,
                  title: "Cloud Deployment",
                  desc: "AWS EC2, CI/CD",
                  color: "from-orange-500 to-red-500",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:rotate-1 group"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`h-12 w-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:animate-spin`}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-orange-400 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {/* Current Role */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-[1.02] group">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white group-hover:text-purple-400 transition-colors">
                      Associate Software Engineer
                    </CardTitle>
                    <CardDescription className="text-cyan-400 font-medium text-lg">
                      Velocis Systems Pvt. Ltd. • Noida, U.P, India
                    </CardDescription>
                  </div>
                  <Badge className="mt-2 md:mt-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                    <Calendar className="mr-1 h-3 w-3" />
                    Dec 2023 – Present
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <Star className="mr-2 h-5 w-5 text-yellow-400" />
                    GOAL Sheet Issue Tracker
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-white/80 text-sm">
                    <li>
                      🎯 Developed a portal for CEO-level stakeholders to manage
                      and track GOAL Sheet issues
                    </li>
                    <li>
                      🤝 Enabled seamless collaboration between end users and
                      developers for timely resolution
                    </li>
                    <li>
                      📧 Implemented automated email notification system for
                      real-time updates
                    </li>
                    <li>
                      👁️ Integrated real-time issue tracking with transparency
                      and accountability features
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Previous Role */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-[1.02] group">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white group-hover:text-pink-400 transition-colors">
                      Trainee Developer
                    </CardTitle>
                    <CardDescription className="text-cyan-400 font-medium text-lg">
                      Velocis Systems Pvt. Ltd. • Noida, U.P, India
                    </CardDescription>
                  </div>
                  <Badge className="mt-2 md:mt-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                    <Calendar className="mr-1 h-3 w-3" />
                    Dec 2023 – Dec 2024
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                  🚀 Leveraged SharePoint On-premise, Power Automate &
                  SharePoint Designer to build user-centric applications leading
                  to significant business growth
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Sports Arena Portal",
                      icon: "🏟️",
                      points: [
                        "Led development of event request application across multiple locations",
                        "Integrated state machine and hierarchical approval system",
                        "Implemented concurrency control preventing double booking",
                        "Engineered advanced filtering system for data retrieval",
                      ],
                    },
                    {
                      title: "HR Tracker Portal",
                      icon: "👥",
                      points: [
                        "Orchestrated automated email notifications for ticket closure",
                        "Engineered email triggers for ticket reassignment",
                        "Designed advanced filtering in admin control panel",
                        "Optimized administrative workflows",
                      ],
                    },
                    {
                      title: "BCM Airport ATR Portal",
                      icon: "✈️",
                      points: [
                        "Designed high-level application for GCM/CEO stakeholders",
                        "Developed bulk ATR creation via Excel upload",
                        "Integrated comprehensive reporting capabilities",
                        "Maintained complete ATR history tracking",
                      ],
                    },
                    {
                      title: "Dial Space Allocation Portal",
                      icon: "🏢",
                      points: [
                        "Managed lease and rental agreements for airport spaces",
                        "Streamlined approval workflow with SAC endorsements",
                        "Enabled renewal feature for space/land requests",
                        "Automated communication and confirmation systems",
                      ],
                    },
                  ].map((project, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <h4 className="font-semibold text-white mb-3 flex items-center">
                        <span className="mr-2 text-2xl">{project.icon}</span>
                        {project.title}
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-white/70 text-sm">
                        {project.points.map((point, i) => (
                          <li key={i}>• {point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-blue-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* SoftWizzards Project */}
            <Card
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:rotate-1 group overflow-hidden relative cursor-pointer"
              onClick={() => window.open("https://softwizzards.com", "_blank")}
              role="button"
              tabIndex={0}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors">
                    🌐 SoftWizzards - Service Provider Website
                  </CardTitle>
                  <ExternalLink className="h-5 w-5 text-white/60 group-hover:text-purple-400 transition-colors group-hover:animate-pulse" />
                </div>
                <CardDescription className="text-white/80">
                  Full-stack MERN application with admin panel and CI/CD
                  deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "MongoDB",
                      "Express",
                      "React",
                      "Node.js",
                      "AWS EC2",
                      "GitHub Actions",
                    ].map((tech, i) => (
                      <Badge
                        key={i}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:scale-110 transition-transform"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed">
                    🚀 Developed a fully functional and live website for
                    SoftWizzards. Features include secure admin panel, real-time
                    data management, automated CI/CD pipeline, and responsive
                    design optimized for all devices.
                  </p>

                  <div className="space-y-3">
                    <h5 className="font-medium text-white flex items-center">
                      <Sparkles className="mr-2 h-4 w-4 text-yellow-400" />
                      Key Features:
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        "🏗️ MERN Stack with scalable architecture",
                        "⚡ Custom Admin Panel for content management",
                        "🔄 CI/CD Pipeline with GitHub Actions",
                        "☁️ AWS EC2 deployment with Elastic IP",
                        "📱 Real-time notifications and updates",
                      ].map((feature, i) => (
                        <div
                          key={i}
                          className="text-white/70 text-sm p-2 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Library Management System */}
            <Card
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 group overflow-hidden relative cursor-pointer"
              onClick={() =>
                window.open(
                  "https://github.com/harsh7068/Library-Management-System",
                  "_blank"
                )
              }
              role="button"
              tabIndex={0}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                    📚 Library Management System
                  </CardTitle>
                  <Github className="h-5 w-5 text-white/60 group-hover:text-cyan-400 transition-colors group-hover:animate-pulse" />
                </div>
                <CardDescription className="text-white/80">
                  Complete library management solution with role-based access
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      ".NET Framework",
                      "MVC",
                      "C#",
                      "JavaScript",
                      "Bootstrap",
                    ].map((tech, i) => (
                      <Badge
                        key={i}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 hover:scale-110 transition-transform"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed">
                    📖 A comprehensive library management system with dual role
                    authentication, automated fine calculation, and complete
                    book lifecycle management.
                  </p>

                  <div className="space-y-3">
                    <h5 className="font-medium text-white flex items-center">
                      <Star className="mr-2 h-4 w-4 text-yellow-400" />
                      Key Features:
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        "🔐 Role-based authentication system",
                        "📚 Complete book, author, publisher management",
                        "💰 Automated fine calculation for overdue returns",
                        "📱 Responsive design with Bootstrap",
                        "👥 Member management and tracking",
                      ].map((feature, i) => (
                        <div
                          key={i}
                          className="text-white/70 text-sm p-2 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-emerald-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto"></div>
          </div>

          {/* Animated Skill Bars */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">
              Proficiency Levels
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries({
                JavaScript: 90,
                React: 85,
                "Node.js": 80,
                SharePoint: 95,
                MongoDB: 75,
                ".NET": 70,
                "Power Automate": 90,
                AWS: 65,
              }).map(([skill, level]) => (
                <div key={skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{skill}</span>
                    <span className="text-purple-400 font-bold">
                      {Math.round(skillProgress[skill] || 0)}%
                    </span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skillProgress[skill] || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Languages",
                skills: [
                  "JavaScript",
                  "TypeScript",
                  "HTML",
                  "CSS",
                  "SQL",
                  "C#",
                ],
                color: "from-red-500 to-orange-500",
              },
              {
                title: "Frameworks",
                skills: ["ReactJS", "NodeJS", ".NET", "Express.js", "SPFx"],
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Databases",
                skills: ["MySQL", "MongoDB"],
                color: "from-green-500 to-emerald-500",
              },
              {
                title: "Other Technologies",
                skills: [
                  "SharePoint",
                  "Power Automate",
                  "GitHub Actions",
                  "Amazon EC2",
                ],
                color: "from-purple-500 to-pink-500",
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 group"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-center text-white group-hover:text-purple-400 transition-colors">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        className={`bg-gradient-to-r ${category.color} text-white border-0 hover:scale-110 transition-transform cursor-pointer`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 group">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4 group-hover:animate-spin">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white group-hover:text-purple-400 transition-colors">
                      Bachelor of Technology
                    </CardTitle>
                    <CardDescription className="text-cyan-400 font-medium text-lg">
                      Computer Science & Engineering
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <p className="text-white font-medium text-lg">
                      🏛️ Babu Banarasi Das University (BBDU)
                    </p>
                    <p className="text-white/80">📍 Lucknow, India</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-white font-medium text-lg">
                      🎯 CGPA:{" "}
                      <span className="text-green-400 font-bold">8.7</span>
                    </p>
                    <p className="text-white/80">📅 2019 - 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 to-orange-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Achievements & Awards
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 group">
              <CardContent className="p-8">
                <div className="flex items-center">
                  <div className="h-16 w-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-6 group-hover:animate-bounce">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      🏆 Academic Merit Scholarship
                    </h3>
                    <p className="text-white/80 text-lg">
                      Awarded a scholarship of{" "}
                      <span className="text-green-400 font-bold">₹22,000</span>{" "}
                      based on academic merit by BBD University, Lucknow.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 to-purple-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto"></div>
            <p className="text-white/80 mt-6 max-w-2xl mx-auto text-lg">
              🚀 I'm always interested in new opportunities and exciting
              projects. Let's connect and discuss how we can work together!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {[
              {
                icon: Mail,
                title: "Email",
                info: "works.harshraj@gmail.com",
                color: "from-red-500 to-pink-500",
              },
              {
                icon: Phone,
                title: "Phone",
                info: "+91-7068151548",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Linkedin,
                title: "LinkedIn",
                info: "harshraj70",
                color: "from-blue-500 to-cyan-500",
              },
            ].map((contact, index) => (
              <Card
                key={index}
                className="text-center group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-110 hover:rotate-3"
                onClick={() => {
                  if (contact.title === "Email") {
                    window.open(`mailto:${contact.info}`, "_blank");
                  } else if (contact.title === "LinkedIn") {
                    window.open(
                      `https://www.linkedin.com/in/${contact.info}`,
                      "_blank"
                    );
                  }
                }}
              >
                <CardContent className="p-8">
                  <div
                    className={`h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center group-hover:animate-pulse`}
                  >
                    <contact.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-xl group-hover:text-purple-400 transition-colors">
                    {contact.title}
                  </h3>
                  <p className="text-white/80">{contact.info}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() =>
                window.open("mailto:works.harshraj@gmail.com", "_blank")
              }
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 text-lg px-8 py-4"
            >
              <Mail className="mr-2 h-6 w-6" />
              <Sparkles className="mr-2 h-5 w-5" />
              Send Message
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm text-white py-12 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Harsh Raj
              </h3>
            </div>
            <p className="text-white/60 mb-2">
              © {new Date().getFullYear()} Harsh Raj. All rights reserved.
            </p>
            <p className="text-white/60">
              ⚡ Built with <span className="text-red-400">❤️</span> using
              React, Next.js, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
