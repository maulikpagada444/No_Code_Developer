import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../ThemeProvider.jsx'
import gsap from "gsap";
import { useEffect, useRef } from "react";

// Icons Imports
import { FiSun, FiMoon, FiMonitor, FiMenu, FiX, FiInstagram, FiFacebook, FiTwitter, FiLinkedin, FiYoutube } from 'react-icons/fi';
import { GoArrowUpRight, GoArrowDownRight, GoArrowDownLeft } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

// Image Imports (Keeping Code 1 Paths as requested)
import logo from "../../../Public/inai-black.png"
import whitelogo from "../../../Public/inai-white-logo.png";
// Banner Image
import bannerImg from "../../../Public/banner1.png";
// Editor Images
import editorImg from "../../../Public/editor.png";
import editDesignImg from "../../../Public/edit-design.png";
// Template Images
import t1 from '../../../Public/t1.png';
import t2 from '../../../Public/t2.png';
import t3 from '../../../Public/t3.png';
import t4 from '../../../Public/t4.png';
import t5 from '../../../Public/t5.png';
import t6 from '../../../Public/t6.png';
import t7 from '../../../Public/t7.png';
import bgLight from "../../../Public/bg.png";
import Cookies from "js-cookie";
// ==============================
// 2. COMPONENTS
// ==============================

const useGsapReveal = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        ...options
      }
    );
  }, []);
};


const Navbar = () => {
  const { theme, setThemeMode } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const username = Cookies.get("username"); // 👈 Cookie name must match your backend cookie key
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const handleThemeChange = (newTheme) => {
    setThemeMode(newTheme);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav ref={navRef} className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img src={theme === 'dark' ? whitelogo : logo} alt="INAI WORLDS" className="h-[70px]" />
          </div>

          {/* Desktop/Tablet Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Multi-State Theme Toggle */}
            <div className="flex items-center border-2 gap-2 border-white rounded-3xl p-1 bg-black">
              <button
                onClick={() => handleThemeChange('light')}
                className={`p-2 rounded-full ${theme === 'light' ? 'bg-white text-black' : 'text-gray-400'} transition-colors`}
                title="Light Mode"
              >
                <FiSun size={20} />
              </button>

              <button
                onClick={() => handleThemeChange('dark')}
                className={`p-2 rounded-full ${theme === 'dark' ? 'bg-white text-black' : 'text-gray-400'} transition-colors`}
                title="Dark Mode"
              >
                <FiMoon size={20} />
              </button>
            </div>

            {username ? (
              <>
                <div className="flex items-center text-black dark:text-white font-semibold px-4">
                  <FaUser className="mr-2" size={16} />
                  <span>{username}</span>
                </div>

                <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-black text-black dark:text-white rounded-lg transition-colors rounded-full"
                  style={{
                    border: theme === 'dark' ? '1px solid #FFFFFF' : '1px solid #000000',
                    boxShadow: theme === 'dark' ? '2px 2px 0px 0px #FFFFFF' : '2px 2px 0px 0px #333333'
                  }}
                >
                  <span>Get Started</span>
                  <GoArrowUpRight size={16} />
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" className="flex items-center space-x-2 px-4 py-2 text-black dark:text-white">
                  <FaUser size={16} />
                  <span>Sign In</span>
                </Link>

                <Link to="/signup" className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-black text-black dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-full"
                  style={{
                    border: theme === 'dark' ? '1px solid #FFFFFF' : '1px solid #000000',
                    boxShadow: theme === 'dark' ? '2px 2px 0px 0px #FFFFFF' : '2px 2px 0px 0px #333333'
                  }}
                >
                  <span>Get Started</span>
                  <GoArrowUpRight size={16} />
                </Link>
              </>
            )}

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="p-2 text-black dark:text-white">
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center border-2 border-black dark:border-white rounded-3xl p-1 bg-white dark:bg-gray-800 mx-auto">
                <button onClick={() => handleThemeChange('system')} className={`p-2 rounded-full ${theme === 'system' ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-gray-600 dark:text-gray-400'} transition-colors`}>
                  <FiMonitor size={20} />
                </button>
                <button onClick={() => handleThemeChange('light')} className={`p-2 rounded-full ${theme === 'light' ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-gray-600 dark:text-gray-400'} transition-colors`}>
                  <FiSun size={20} />
                </button>
                <button onClick={() => handleThemeChange('dark')} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-gray-600 dark:text-gray-400'} transition-colors`}>
                  <FiMoon size={20} />
                </button>
              </div>

              <Link to="/signin" className="flex items-center justify-center space-x-2 px-4 py-2 text-black dark:text-white mx-auto">
                <FaUser size={16} />
                <span>Sign In</span>
              </Link>

              <Link to="/signup" className="flex items-center justify-center space-x-2 px-4 py-2 bg-white dark:bg-black text-black dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-full mx-auto"
                style={{
                  border: theme === 'dark' ? '1px solid #FFFFFF' : '1px solid #000000',
                  boxShadow: theme === 'dark' ? '2px 2px 0px 0px #FFFFFF' : '2px 2px 0px 0px #333333'
                }}
              >
                <span>Get Started</span>
                <GoArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Banner = () => {
  const { theme } = useContext(ThemeContext);
  const bannerRef = useRef(null);
  useGsapReveal(bannerRef);


  return (
    <section id="home" className="relative bg-transparent pt-5 h-[400px] md:h-[500px] lg:h-[720px] overflow-visible transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={bannerRef} className="text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 mt-[20px]">
            Empower  business
            <span className="block text-black dark:text-white">growth with AI technologies</span>
            <span className="block text-black dark:text-white">today</span>
          </h3>

          <p className="
  mt-12
  text-sm md:text-lg lg:text-xl
  text-gray-600 dark:text-gray-300
  mb-6 md:mb-8 lg:mb-10
  max-w-2xl md:max-w-3xl
  mx-auto
  px-4 md:px-0
">
            Transform your ideas into reality with our AI-powered website builder. Create stunning websites in minutes, not hours.
          </p>

          <div className="flex flex-row gap-3 md:gap-4 justify-center px-4 md:px-0">
            <Link
              to="/signup"
              className="
                w-[160px] md:w-[190px] h-[44px] md:h-[49px]
                px-4 md:px-5 py-[12px] md:py-[14px]
                text-black
                bg-gray-200                     /* Normal BG Gray */
                hover:bg-black hover:text-white /* Hover BG Black */
                
                dark:bg-[#1A1A1A] dark:text-white          /* Dark mode normal */
                dark:hover:bg-black dark:hover:text-white /* Dark mode hover */

                border border-black
                rounded-md
                shadow-[2px_2px_0px_0px_#000000]
                transition-all duration-300
                flex items-center justify-center space-x-2
                text-sm md:text-base
              "
              style={{
                border: theme === "dark" ? "1px solid #FFFFFF" : "1px solid #000000",
                boxShadow:
                  theme === "dark"
                    ? "2px 2px 0px 0px #FFFFFF"
                    : "2px 2px 0px 0px #333333",
              }}
            >
              <span>Get Started</span>
              <GoArrowUpRight size={16} />
            </Link>


            <button className="w-[160px] md:w-[190px] h-[44px] md:h-[49px] px-4 md:px-5 py-[12px] md:py-[14px] text-white bg-black dark:bg-white dark:text-black rounded-md shadow-[inset_0px_4px_10px_0px_#FFFFFF9E] hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 text-sm md:text-base"
              style={{
                backgroundColor: theme === 'dark' ? '#FFFFFF' : '#000000',
                boxShadow: theme === 'dark' ? '0px 4px 10px 0px #0000009E inset' : 'inset_0px_4px_10px_0px_#FFFFFF9E'
              }}
            >
              See How It Works
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 md:px-0">
        <img
          src={bannerImg}
          alt="banner"
          className="w-[400px] md:w-[650px] lg:w-[1000px] h-[150px] md:h-[350px] lg:h-[500px] 
             opacity-100 rounded-[20px] border-[4px] border-white"
        />
      </div>

      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-200" style={{ top: '450px' }}></div>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[660px] h-0.5 bg-gray-200" style={{ top: '515px' }}></div>
        <div className="absolute w-0.5 h-32 bg-gray-200" style={{ top: '517px', left: 'calc(50% - 330px)' }}></div>
        <div className="absolute w-0.5 h-32 bg-gray-200" style={{ top: '517px', left: 'calc(50% + 330px)' }}></div>
      </div>
    </section>
  );
};


const EditorSection = () => {
  const { theme } = useContext(ThemeContext);
  const [activeItem, setActiveItem] = useState(0);


  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      leftRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    );

    gsap.fromTo(
      rightRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  const contentData = [
    { title: "Start With A Prompt", description: "Begin your website creation journey by providing a simple prompt. Describe your vision and let our AI understand your requirements to kickstart the design process." },
    { title: "Website Details", description: "Provide comprehensive details about your website including purpose, target audience, features needed, and design preferences. The more information you provide, the better the AI can tailor the design to your needs." },
    { title: "Let AI Do The Work", description: "Sit back and watch as our advanced AI algorithms analyze your requirements and generate a complete website design with layouts, color schemes, and content structure tailored to your specifications." },
    { title: "Fine-Tune Your Design", description: "Refine and perfect your website with our intuitive editing tools. Adjust layouts, modify colors, change fonts, and customize every element to match your exact vision and brand identity." },
    { title: "Edit Design", description: "Make final adjustments and tweaks to your website design. Add custom elements, optimize user experience, and ensure everything looks perfect before publishing your professional website." },
    { title: "Edit Design", description: "Make final adjustments and tweaks to your website design. Add custom elements, optimize user experience, and ensure everything looks perfect before publishing your professional website." }
  ];

  const imageMapping = [editorImg, editorImg, editDesignImg, editorImg, editDesignImg, editorImg];
  const listItems = ["Start with a Prompt", "Website Details", "Let AI Do The Work", "Fine-Tune Your Design", "Edit Design", "Edit Design"];

  return (
    <section className="pb-8 md:pb-12 bg-transparent lg:pb-16 mt-[100px] md:mt-[250px] lg:mt-[400px] md:flex-col transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex:col md:text-center md:justify-between md:items-start mb-8 md:mb-12 lg:mb-16 lg:flex-row">
          <div className="mb-6 md:mb-0 text-center md:text-center w-full lg:text-start lg:w-[1300px]">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-white mb-2 justify-center md:justify-center lg:justify-start w-full">
              <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-white">How It Works</span>
            </div>
            <div className="text-[15px] md:text-2xl lg:text-[32px] font-extrabold 
  text-gray-800 dark:text-white leading-tight text-left"
            >

              {/* FIRST LINE - FORCE NO WRAP */}
              <div className="whitespace-nowrap">
                Imagine a vast collection of{" "}

                <span className="relative inline-block px-3 py-1 rounded-md
      border-[2px] border-[#4E00FF] dark:border-white
      bg-[#E0E7FF] dark:bg-[#1A1A1A]"
                >
                  <span className="text-blue-600 dark:text-white font-bold">
                    business
                  </span>

                  {/* 4 Corners */}
                  <div className={`absolute w-2 h-2 ${theme === "dark" ? "bg-white" : "bg-[#4E00FF]"} -top-[3px] -left-[3px]`} />
                  <div className={`absolute w-2 h-2 ${theme === "dark" ? "bg-white" : "bg-[#4E00FF]"} -top-[3px] -right-[3px]`} />
                  <div className={`absolute w-2 h-2 ${theme === "dark" ? "bg-white" : "bg-[#4E00FF]"} -bottom-[3px] -left-[3px]`} />
                  <div className={`absolute w-2 h-2 ${theme === "dark" ? "bg-white" : "bg-[#4E00FF]"} -bottom-[3px] -right-[3px]`} />
                </span>
              </div>

              {/* SECOND LINE */}
              <div>
                apps at your disposal.
              </div>

            </div>



          </div>
          <div className="flex flex-wrap justify-end md:justify-end gap-2 md:gap-3 mt-4 w-full md:w-full mb-8 md:mb-0">
            <button className="px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 transition-colors dark:bg-white dark:text-black">Website Builder</button>
            <button className="px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium text-gray-700 border border-white bg-gray-200 rounded-md hover:bg-gray-300 transition-colors dark:bg-[#1A1A1A] dark:text-white">New Project</button>
            <button className="px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium text-gray-700 border border-white bg-gray-200 rounded-md hover:bg-gray-300 transition-colors dark:bg-[#1A1A1A] dark:text-white">IDE</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
          <div ref={leftRef} className="hidden lg:block lg:col-span-2 order-2 lg:order-1">
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{contentData[activeItem].title}</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-white max-w-sm leading-relaxed">{contentData[activeItem].description}</p>
              <div className="hidden lg:block space-y-4 md:space-y-6">
                {listItems.map((item, i) => (
                  <div key={i} className="group" onClick={() => setActiveItem(i)}>
                    <div className={`h-[1px] w-full mb-2 ${activeItem === i ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    <div className={`text-base md:text-lg cursor-pointer ${activeItem === i ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-700 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div ref={rightRef} className="hidden lg:block lg:col-span-3 order-1 lg:order-2 mb-8 lg:mb-0">
            <img src={imageMapping[activeItem]} className="rounded-xl shadow-2xl w-full h-[500px] transition-all duration-300" alt="Editor Preview" />
          </div>
        </div>

        <div className="lg:hidden space-y-12 md:space-y-16">
          {contentData.map((content, index) => (
            <div key={index} className="space-y-6 pb-12 md:pb-16 border-b border-gray-200 dark:border-[#333333] last:border-b-0">
              <div className="text-start md:text-center">
                <h5 className="text-[20px] md:text-2xl font-bold text-gray-900 dark:text-white mb-4">{content.title}</h5>
                <p className="text-start md:text-lg text-gray-600 dark:text-white max-w-3xl mx-auto leading-relaxed">{content.description}</p>
              </div>
              <div className="flex justify-center">
                <img src={imageMapping[index]} className="rounded-xl shadow-2xl w-full max-w-2xl h-auto md:h-[400px]" alt={`Content Preview ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Templates = () => {
  const { theme } = useContext(ThemeContext);
  const templateRef = useRef(null);
  useGsapReveal(templateRef);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <p className="text-gray-500 dark:text-white text-xs md:text-sm font-medium mb-2">Template</p>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            500k+ Websites built with <span className="relative inline-block">
              <span className="text-[#2E2F5B] dark:text-white border border-[#2E2F5B] dark:border-white bg-[#E9E9FF] dark:bg-[#1A1A1A] px-2 py-[0px] md:px-2 md:py-0 lg:px-3 lg:py-0">INAI</span>
              <div className={`absolute -top-[5px] -left-[2px] md:-top-[8px] md:-left-[5px] w-2 h-2 md:w-3 md:h-3 lg:-top-[14px] ${theme === 'dark' ? 'bg-white' : 'bg-[#2E2F5B]'}`}></div>
              <div className={`absolute -top-[5px] -right-[2px] md:-top-[8px] md:-right-[5px] w-2 h-2 md:w-3 md:h-3 lg:-top-[14px] ${theme === 'dark' ? 'bg-white' : 'bg-[#2E2F5B]'}`}></div>
              <div className={`absolute -bottom-[5px] -left-[2px] md:-bottom-[8px] md:-left-[5px] w-2 h-2 md:w-3 md:h-3 lg:-bottom-[14px] ${theme === 'dark' ? 'bg-white' : 'bg-[#2E2F5B]'}`}></div>
              <div className={`absolute -bottom-[5px] -right-[2px] md:-bottom-[8px] md:-right-[5px] w-2 h-2 md:w-3 md:h-3 lg:-bottom-[14px] ${theme === 'dark' ? 'bg-white' : 'bg-[#2E2F5B]'}`}></div>
            </span>
          </h2>
        </div>

        <div ref={templateRef} className="w-full h-auto md:h-auto lg:h-[500px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 mb-8 md:mb-12 lg:mb-16">
          <div className="space-y-4 md:space-y-6">
            <img src={t1} alt="template1" className='h-full w-full object-cover border-2 border-black dark:border-white' />
          </div>
          <div className="space-y-1 flex flex-col">
            <img src={t2} alt="template1" className='h-[200px] md:h-[250px] w-full object-cover border-2 border-black dark:border-white' />
            <img src={t3} alt="template1" className='h-[200px] md:h-[250px] w-full object-cover border-2 border-black dark:border-white' />
          </div>
          <div className="space-y-1">
            <img src={t4} alt="template1" className='h-[280px] md:h-[350px] w-full object-cover border-2 border-black dark:border-white' />
            <img src={t5} alt="template1" className='h-[120px] md:h-[150px] w-full object-cover border-2 border-black dark:border-white' />
          </div>
          <div className="space-y-1">
            <img src={t6} alt="template1" className='h-[180px] md:h-[230px] w-full object-cover border-2 border-black dark:border-white' />
            <img src={t7} alt="template1" className='h-[220px] md:h-[270px] w-full object-cover border-2 border-black dark:border-white' />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesGrid = () => {
  const { theme } = useContext(ThemeContext);
  const featureRef = useRef(null);
  useGsapReveal(featureRef);

  const features = [
    { title: "AI-Powered Design", description: "Quickly create a website by describing your idea in plain language. From a simple prompt, the builder generates full websites." },
    { title: "Drag & Drop Editor", description: "Easily customize every element with our intuitive drag and drop interface. No coding required." },
    { title: "Responsive Templates", description: "Choose from hundreds of professionally designed templates that work perfectly on all devices." },
    { title: "SEO Optimization", description: "Built-in SEO tools help your website rank higher in search results and attract more visitors." },
    { title: "E-commerce Ready", description: "Complete online store functionality with payment processing, inventory management, and more." },
    { title: "Analytics Dashboard", description: "Track visitor behavior, conversion rates, and key metrics with our comprehensive analytics tools." },
    { title: "Custom Domains", description: "Connect your own domain name or get a free subdomain to establish your online presence." },
    { title: "24/7 Support", description: "Get help whenever you need it with our round-the-clock customer support team." },
    { title: "Fast Hosting", description: "Lightning-fast hosting with 99.9% uptime ensures your website is always available and performs great." }
  ];

  return (
    <div className="py-16 px-8 bg-transparent transition-colors duration-300">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-gray-700 dark:text-white">From Prompt to Published Website in One Platform</p>
        <h6 className="text-[40px] md:text-[40px] font-bold text-black dark:text-white">
          Everything You Need to Create a <span className="relative inline-block dark:border-white rounded px-5 dark:text-white bg-transparent dark:bg-black">
            Website
          </span> With AI, From Start to Finish
        </h6>
      </div>

      <div ref={featureRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="
              relative 
              p-6 
              border 
              border-black 
              bg-white 
              dark:bg-[#1A1A1A]
              hover:shadow-lg 
              transition-shadow 
              duration-300
            "
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-white leading-relaxed">
              {feature.description}
            </p>
          </div>

        ))}
      </div>
    </div>
  );
};

const FAQ = () => {
  const { theme } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const faqRef = useRef(null);
  useGsapReveal(faqRef, { stagger: 0.08 });


  const faqs = [
    { question: "Is my data safe with Ai-Con?", answer: "Yes, absolutely. We take data security very seriously and use industry-standard encryption to protect your information. All data is stored securely in compliance with GDPR and other privacy regulations." },
    { question: "How does the AI website builder work?", answer: "Our AI website builder uses advanced machine learning algorithms to understand your requirements and generate custom website designs. Simply describe what you want, and our AI will create a professional website tailored to your needs in minutes." },
    { question: "Can I customize the generated websites?", answer: "Yes, absolutely. While our AI creates a great starting point, you have full control to customize every aspect of your website. You can modify colors, fonts, layouts, content, and more using our intuitive drag-and-drop editor." },
    { question: "What hosting options are available?", answer: "We offer flexible hosting solutions including free hosting with subdomains, custom domain support, and enterprise-grade hosting for high-traffic websites. All hosting plans include SSL certificates, automatic backups, and 99.9% uptime guarantee." },
    { question: "Is there a free trial available?", answer: "Yes! We offer a free forever plan that includes basic features and hosting. You can build and publish your website without any cost. Premium features are available with paid plans starting at just $9/month." },
    { question: "Can I export my website?", answer: "Yes, you can export your website code at any time. We support exporting clean HTML/CSS/JS code that you can host anywhere. This ensures you're never locked into our platform." },
    { question: "Do you provide customer support?", answer: "We offer 24/7 customer support via email, chat, and phone for all paid plans. Free plan users have access to our comprehensive knowledge base and community forums." },
    { question: "Can I integrate third-party services?", answer: "Yes, our platform supports integrations with popular services like Google Analytics, Mailchimp, PayPal, Stripe, and many more. You can also add custom code for additional integrations." }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className='text-center text-gray-700 dark:text-white'>FAQ's</p>
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-4xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 ">
            Frequently asked <span className="relative inline-block">
              <span className="dark:text-white dark:border-white bg-transparent dark:bg-[#1A1A1A] px-2 py-[0px] md:px-3 md:py-1 lg:px-3 lg:py-0">questions</span>
            </span>
          </h2>
          <h2 className="text-xl md:text-4xl lg:text-4xl font-bold text-black dark:text-gray-300">
            about our AI services
          </h2>
        </div>

        <div ref={faqRef} className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-white pb-4">

              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-between"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>

                <div className="flex-shrink-0 ml-4">
                  {activeIndex === index ? (
                    <GoArrowDownLeft
                      size={20}
                      className="text-black dark:text-white border border-black dark:border-white rounded-full p-1 h-6 w-6"
                    />
                  ) : (
                    <GoArrowDownRight
                      size={20}
                      className="text-black dark:text-white border border-black dark:border-white rounded-full p-1 h-6 w-6"
                    />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? "max-h-96" : "max-h-0"
                  }`}
              >
                <div className="px-6 py-4 bg-gray-50 dark:bg-black">
                  <p className="text-gray-600 dark:text-white leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  const socialLinks = [
    { icon: FiInstagram, href: "#", label: "Instagram" },
    { icon: FiFacebook, href: "#", label: "Facebook" },
    { icon: FiTwitter, href: "#", label: "Twitter" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn" },
    { icon: FiYoutube, href: "#", label: "YouTube" }
  ];

  return (
    <footer ref={footerRef} className="bg-transparent  dark:border-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 border-t border-gray-200 dark:border-white">
          <div className="flex flex-row md:flex-row justify-between items-center w-full">
            <div className="md:mt-0 text-gray-600 dark:text-white text-sm mb-4 md:mb-0">
              <img src={theme === 'dark' ? whitelogo : logo} alt="INAI WORLD" className='w-[80px] h-[50px] md:w-[120px] md:h-[70px] pt-2' />
            </div>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} className="md:p-2 lg:p-2 text-black dark:text-white hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==============================
// 3. MAIN HOME COMPONENT
// ==============================

function Home() {

  const pageRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-full transition-colors duration-300"
      style={{
        backgroundImage: theme === "light" ? `url(${bgLight})` : "none",
        backgroundColor: theme === "dark" ? "#0b0b0b" : "transparent",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >



      <Navbar />

      <div className="relative">
        <Banner />
      </div>

      {/* <div className="relative">
        <SectionBoxes />
      </div> */}

      <div className="relative">
        <EditorSection />
      </div>

      <div className="relative">
        <Templates />
      </div>

      <div className="relative">
        <FeaturesGrid />
      </div>

      <div className="relative">
        <FAQ />
      </div>

      <Footer />
    </div>
  );
}

export default Home;