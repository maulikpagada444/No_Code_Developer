import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../ThemeProvider.jsx';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cookies from "js-cookie";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Icons
import {
  FiSun, FiMoon, FiMenu, FiX, FiArrowRight, FiCheck, FiZap,
  FiLayout, FiCode, FiGlobe, FiShield, FiCpu, FiPlay, FiStar,
  FiChevronDown, FiInstagram, FiTwitter, FiGithub, FiLinkedin
} from 'react-icons/fi';
import { HiSparkles } from "react-icons/hi2";
import { BsLightningChargeFill } from "react-icons/bs";

// Images
import logo from "../../../Public/inai-black.png";
import whitelogo from "../../../Public/inai-white-logo.png";

// ============================================
// NAVBAR COMPONENT
// ============================================
const Navbar = () => {
  const { theme, setThemeMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const username = Cookies.get("username");
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'py-3 glass'
        : 'py-5 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <BsLightningChargeFill className="text-white text-lg" />
          </div>
          <span className="text-xl font-bold text-white hidden sm:block">INAI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
          <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How it Works</a>
          <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setThemeMode(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {username ? (
            <>
              <span className="text-gray-400 text-sm">Hey, {username}</span>
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-all"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-all hover:shadow-lg hover:shadow-purple-500/25"
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
        >
          {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-6 glass-card mx-4 mt-2 rounded-2xl animate-scale-in">
          <div className="flex flex-col gap-4">
            <a href="#features" className="text-gray-300 py-2">Features</a>
            <a href="#how-it-works" className="text-gray-300 py-2">How it Works</a>
            <Link to="/signin" className="text-gray-300 py-2">Sign In</Link>
            <Link
              to="/signup"
              className="py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center font-semibold"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(".hero-badge",
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    )
      .fromTo(".hero-title",
        { opacity: 0, y: 50, rotateX: -20 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".hero-cta",
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(".hero-visual",
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.3"
      );

    // Infinite floating animation for orbs with organic motion
    gsap.to(".orb-purple", {
      y: "+=50",
      x: "+=30",
      rotation: 360,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".orb-blue", {
      y: "-=40",
      x: "-=30",
      rotation: -360,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".orb-pink", {
      y: "+=60",
      x: "-=20",
      rotation: 180,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Parallax effect on floating cards
    gsap.to(".floating-card", {
      y: -40,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2
      }
    });

    // Enhanced magnetic effect on CTA buttons with particles
    const buttons = document.querySelectorAll(".cta-button");
    buttons.forEach(button => {
      // Create particle container
      const particleContainer = document.createElement('div');
      particleContainer.style.position = 'absolute';
      particleContainer.style.inset = '0';
      particleContainer.style.pointerEvents = 'none';
      particleContainer.style.overflow = 'hidden';
      particleContainer.style.borderRadius = 'inherit';
      button.style.position = 'relative';
      button.appendChild(particleContainer);

      button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });

        // Generate particles
        if (Math.random() > 0.7) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = (e.clientX - rect.left) + 'px';
          particle.style.bottom = '0px';
          particleContainer.appendChild(particle);

          setTimeout(() => particle.remove(), 3000);
        }
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)"
        });
      });

      // Pulsing glow effect
      gsap.to(button, {
        boxShadow: "0 10px 60px rgba(168, 85, 247, 0.6)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Custom cursor trail effect (optional)
    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) {
          const sparkle = document.createElement('div');
          sparkle.style.position = 'absolute';
          sparkle.style.left = e.clientX + 'px';
          sparkle.style.top = e.clientY + 'px';
          sparkle.style.width = '3px';
          sparkle.style.height = '3px';
          sparkle.style.background = 'rgba(168, 85, 247, 0.8)';
          sparkle.style.borderRadius = '50%';
          sparkle.style.pointerEvents = 'none';
          sparkle.style.zIndex = '9999';
          hero.appendChild(sparkle);

          gsap.to(sparkle, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => sparkle.remove()
          });
        }
      });
    }
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-24 pb-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="orb orb-purple w-[600px] h-[600px] -top-40 -left-40" />
      <div className="orb orb-blue w-[500px] h-[500px] top-1/4 -right-40" />
      <div className="orb orb-pink w-[400px] h-[400px] bottom-0 left-1/3" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <HiSparkles className="text-purple-400" />
          <span className="text-sm text-gray-300">Powered by Advanced AI</span>
          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-semibold">NEW</span>
        </div>

        {/* Title */}
        <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">Build Websites</span>
          <br />
          <span className="text-gradient holographic text-shimmer">10x Faster with AI</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Just describe your vision. Our AI transforms your ideas into stunning,
          production-ready websites in minutes, not months.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="cta-button group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 text-white font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-purple-500/30 transition-all hover:-translate-y-1"
          >
            <span>Start Building Free</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <button className="cta-button group px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-lg flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
            <FiPlay className="text-purple-400" />
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="hero-cta flex items-center justify-center gap-8 mt-12 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FiCheck className="text-green-500" />
            <span>No credit card</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheck className="text-green-500" />
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheck className="text-green-500" />
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="hero-visual mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-b from-white/5 to-transparent p-1">
            <div className="rounded-xl bg-[#12121a] p-4 md:p-8">
              {/* Fake Browser UI */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="flex-1 ml-4 h-8 rounded-lg bg-white/5 flex items-center px-4">
                  <span className="text-gray-500 text-sm">yourwebsite.com</span>
                </div>
              </div>
              {/* Preview Content */}
              <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 flex items-center justify-center border border-white/5">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                    <FiCode className="text-white text-3xl" />
                  </div>
                  <p className="text-gray-400">AI-Generated Website Preview</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="floating-card absolute -left-4 md:-left-16 top-1/3 p-4 rounded-2xl glass-card hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <FiZap className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Lightning Fast</p>
                <p className="text-gray-400 text-xs">Built in 30 seconds</p>
              </div>
            </div>
          </div>

          <div className="floating-card absolute -right-4 md:-right-16 top-1/4 p-4 rounded-2xl glass-card hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <FiStar className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Premium Quality</p>
                <p className="text-gray-400 text-xs">Production ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FEATURES SECTION
// ============================================
const FeaturesSection = () => {
  const features = [
    {
      icon: FiCpu,
      title: "AI-Powered Generation",
      description: "Describe your website in plain language. Our AI understands and creates it instantly.",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: FiLayout,
      title: "Visual Editor",
      description: "Fine-tune every element with our intuitive drag-and-drop editor. No coding needed.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: FiGlobe,
      title: "One-Click Deploy",
      description: "Publish your website instantly on our global CDN. Custom domains supported.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: FiCode,
      title: "Export Clean Code",
      description: "Download production-ready HTML, CSS & JS. Your code, your rules, no lock-in.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: FiShield,
      title: "Enterprise Security",
      description: "SSL certificates, DDoS protection, and GDPR compliance included by default.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: FiZap,
      title: "Blazing Performance",
      description: "Optimized code and global CDN ensure your sites load in under 1 second.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Animate section header
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1
        }
      }
    );

    // Animate feature cards with scroll trigger
    gsap.fromTo(".feature-card",
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: "start"
        },
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".feature-card",
          start: "top 85%",
          end: "top 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Continuous rotation for icons
    gsap.to(".feature-icon", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    // Parallax effect on feature cards
    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: -30,
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      });
    });
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <HiSparkles className="text-purple-400" />
            <span className="text-sm text-gray-300">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powerful tools wrapped in a beautiful interface. Build, customize, and launch with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="feature-card group p-8 rounded-2xl glass-card card-hover cursor-default"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="feature-icon text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// HOW IT WORKS SECTION
// ============================================
const HowItWorksSection = () => {
  const steps = [
    { num: "01", title: "Describe Your Vision", desc: "Tell us what kind of website you want in plain language." },
    { num: "02", title: "AI Generates Design", desc: "Our AI creates a complete website based on your requirements." },
    { num: "03", title: "Customize & Refine", desc: "Use our visual editor to tweak every detail to perfection." },
    { num: "04", title: "Publish Instantly", desc: "Go live with one click on our global CDN." },
  ];

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <FiZap className="text-cyan-400" />
            <span className="text-sm text-gray-300">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            From Idea to Website in <span className="text-gradient-cyan">Minutes</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative p-8 rounded-2xl glass-card group hover:border-purple-500/30 transition-all">
              <span className="text-6xl font-bold text-white/5 absolute top-4 right-6">{step.num}</span>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold mb-6">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto relative">
        {/* Background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600" />
        <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />

        <div className="relative z-10 text-center py-20 px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Join 50,000+ creators who are building stunning websites with AI. Start free, scale when ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 rounded-2xl bg-white text-purple-600 font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              <span>Get Started Free</span>
              <FiArrowRight />
            </Link>
            <Link
              to="/signin"
              className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER
// ============================================
const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <BsLightningChargeFill className="text-white" />
            </div>
            <span className="text-gray-400">© 2026 INAI. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            {[FiTwitter, FiGithub, FiLinkedin, FiInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// MAIN HOME COMPONENT
// ============================================
function Home() {
  const { theme } = useContext(ThemeContext);
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen theme-bg relative overflow-hidden"
    >
      {/* Global Background */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />

      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default Home;