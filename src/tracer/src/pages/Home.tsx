import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Target, Timer, BarChart as ChartBar, ChevronDown, Heart } from 'lucide-react';
import gsap from 'gsap';
import CountUp from 'react-countup';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

// Theme configuration (unchanged)
const themes = {
  dark: {
    background: 'bg-gradient-to-b from-black to-[#2A0000]',
    text: 'text-white',
    secondaryText: 'text-gray-300',
    cardBg: 'bg-black/50',
    border: 'border-gray-700',
    hoverBorder: 'hover:border-neonRed',
    neonRed: 'text-neonRed',
    neonPurple: 'text-neonPurple',
    neonOrange: 'text-neonOrange',
    neonPink: 'text-neonPink',
    neonTeal: 'text-neonTeal',
    shadowRed: 'rgba(255, 64, 64, 0.5)',
    shadowPurple: 'rgba(169, 64, 255, 0.5)',
    shadowOrange: 'rgba(255, 64, 169, 0.5)',
    shadowTeal: 'rgba(64, 255, 217, 0.5)',
    gradientOverlay: 'bg-gradient-to-b from-black/80 via-black/60 to-black/80',
    timelineLine: 'bg-gradient-to-b from-neonRed to-neonPurple',
  },
  light: {
    background: 'bg-gradient-to-b from-white to-gray-100',
    text: 'text-black',
    secondaryText: 'text-gray-600',
    cardBg: 'bg-white/80',
    border: 'border-gray-300',
    hoverBorder: 'hover:border-blue-500',
    neonRed: 'text-blue-600',
    neonPurple: 'text-purple-600',
    neonOrange: 'text-orange-600',
    neonPink: 'text-pink-600',
    neonTeal: 'text-teal-600',
    shadowRed: 'rgba(37, 99, 235, 0.5)',
    shadowPurple: 'rgba(147, 51, 234, 0.5)',
    shadowOrange: 'rgba(249, 115, 22, 0.5)',
    shadowTeal: 'rgba(20, 184, 166, 0.5)',
    gradientOverlay: 'bg-gradient-to-b from-white/80 via-white/60 to-white/80',
    timelineLine: 'bg-gradient-to-b from-blue-600 to-purple-600',
  },
};

// Statistic Component (unchanged)
const Statistic = ({ value, label, icon, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="flex flex-col items-center text-center p-6 will-change-transform"
    >
      <div className="p-4 rounded-full mb-4" style={{ boxShadow: `0 0 15px ${theme.shadowRed}` }}>
        {React.cloneElement(icon, { className: `w-8 h-8 ${theme.neonRed}` })}
      </div>
      <div className={`text-4xl font-bold ${theme.neonRed}`}>
        <CountUp end={parseFloat(value)} duration={3} suffix={value.includes('%') ? '%' : ''} />
      </div>
      <div className={`text-lg ${theme.secondaryText} mt-2`}>{label}</div>
    </motion.div>
  );
};

// ChatBubble Component (unchanged)
const ChatBubble = ({ message, sender, time, isPatient, theme, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: 'easeInOut' }}
      className={`flex ${isPatient ? 'justify-start' : 'justify-end'} mb-4 will-change-transform`}
    >
      <div className={`flex items-start gap-3 max-w-[70%] ${isPatient ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          {isPatient ? (
            <Heart className={`w-6 h-6 ${theme.neonRed}`} />
          ) : (
            <Brain className={`w-6 h-6 ${theme.neonPurple}`} />
          )}
        </div>
        <div className={`p-4 rounded-lg ${isPatient ? theme.cardBg : 'bg-neonRed/20'} ${theme.text}`}>
          <p className="text-sm">{message}</p>
          <p className={`text-xs ${theme.secondaryText} mt-1`}>{time}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Updated BentoCard Component to Fix Duplicate Transition Warning
const BentoCard = ({ title, description, image, theme, index, align = 'center' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeInOut' }}
      className={`flex flex-col ${align === 'center' ? 'justify-center' : align === 'bottom' ? 'justify-end' : 'justify-start'} p-6 rounded-lg ${theme.cardBg} border ${theme.border} will-change-transform`}
    >
      {image && (
        <motion.div
          className="mb-4"
          whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${theme.shadowRed}` }}
          transition={{
            opacity: { duration: 0.8, ease: 'easeInOut' }, // For the whileInView animation (inherited from parent)
            y: { duration: 0.8, ease: 'easeInOut' }, // For the whileInView animation (inherited from parent)
            scale: { duration: 0.5, ease: 'easeInOut' }, // For the whileHover animation
            boxShadow: { duration: 0.5, ease: 'easeInOut' }, // For the whileHover animation
          }}
          style={{ willChange: 'transform, box-shadow' }}
        >
          <img
            src={image}
            alt={title}
            className={`w-full h-48 object-cover rounded-lg border ${theme.border}`}
            style={{ boxShadow: `0 0 20px ${theme.shadowRed}` }}
            loading="lazy"
          />
        </motion.div>
      )}
      <div className="text-center">
        <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>{title}</h3>
        <p className={`text-sm ${theme.secondaryText}`}>{description}</p>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroContentRef = useRef(null);
  const contentRefs = useRef([]);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    // Hero Section Animations (unchanged)
    const heroContent = heroContentRef.current;

    if (heroContent) {
      const heroChildren = heroContent.children;
      gsap.fromTo(
        heroChildren,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power2.out',
          delay: 0.3,
        }
      );
    }

    // Smooth Section Animations (unchanged)
    const sections = contentRefs.current.filter(Boolean);
    sections.forEach((section) => {
      const sectionChildren = section.children;
      gsap.fromTo(
        sectionChildren,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            scrub: 0.2,
          },
        }
      );
    });
  }, []);

  const currentTheme = themes[theme];

  const storySegments = [
    {
      title: 'A Shattering Diagnosis',
      description: 'The moment a cancer diagnosis changes everything—a verdict that brings fear and uncertainty.',
      image: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/02/04/12/cancer_REX.jpg',
    },
    {
      title: 'The Battle Begins',
      description: 'A blur of treatments and emotional exhaustion, yet patients endure with resilience and hope.',
      image: 'https://i0.wp.com/www.capitalradiomalawi.com/wp-content/uploads/2024/02/cancer.jpg?fit=1000%2C657&ssl=1',
    },
    {
      title: 'A Glimmer of Hope',
      description: 'Remission brings fragile normalcy and the daring hope for a life beyond cancer.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf5_2KPGvrxhNyFCGP8XxXg00EHAuocULYbA&s',
    },
    {
      title: 'The Silent Return',
      description: 'Cancer returns—silent, swift, and relentless—shattering newfound hope.',
      image: 'https://www.carti.com/app/uploads/2024/03/CAR-2401-006-Blogs-ARStyle-Makhoul-1024x597.jpg',
    },
    {
      title: 'The Reality of Relapse',
      description: 'Hidden cells grow again, often more aggressive and harder to treat.',
      image: 'https://www.denvaxindia.com/blog/wp-content/uploads/2024/04/Cancer-Relapse.jpg',
    },
    {
      title: 'A Daunting Fight',
      description: 'Relapse brings uncertainty, dwindling options, and a harder battle than ever.',
      image: 'https://res.cloudinary.com/dmajhtvmd/image/upload/c_scale/f_auto/dpr_auto/remote/uploads/movement_banner/image/58ebc1118bdfee3844000f9f/58ebc1118bdfee3844000f9f_c487ba770e2cc49abee8.jpg',
    },
  ];

  const chatMessages = [
    {
      message: 'Doctor, I’ve been feeling off lately… could it be back?',
      sender: 'Patient',
      time: '9:36 AM | Today',
      isPatient: true,
    },
    {
      message: 'I’m sorry to hear that. Let’s run some tests to check for relapse. It’s possible, but we’ll catch it early.',
      sender: 'Doctor',
      time: '9:42 AM | Today',
      isPatient: false,
    },
    {
      message: 'The tests confirmed it… it’s back. What do we do now?',
      sender: 'Patient',
      time: '9:56 AM | Today',
      isPatient: true,
    },
    {
      message: 'We’ll explore new treatments and consider TRACER for early detection. We’re in this together.',
      sender: 'Doctor',
      time: '10:02 AM | Today',
      isPatient: false,
    },
  ];

  const tracerSteps = [
    {
      title: 'Detecting the Unseen',
      description: 'Engineered monocytes patrol the body, using a CD147-specific receptor to identify cancer cells early, triggering the production of ApoA1 and anti-CD147 scFv antibodies.',
      icon: <Brain />,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu6TPf1pE0_CgjhSfVWwEDN_a4s2wylc4fzXYE9lR7Uxz5vxufrMINTrRImVOSGPQ33e4&usqp=CAU',
    },
    {
      title: 'Tagging for Action',
      description: 'Anti-CD147 scFv antibodies mark cancer cells, signaling the immune system to neutralize them before they can spread further.',
      icon: <Target />,
      image: 'https://pub.mdpi-res.com/pharmaceuticals/pharmaceuticals-15-00747/article_deploy/html/images/pharmaceuticals-15-00747-ag.png?1655704960',
    },
    {
      title: 'Early Warning System',
      description: 'ApoA1, filtered through the kidneys, is detected via a simple dipstick test, providing a real-time proxy for cancer relapse detection.',
      icon: <Timer />,
      image: 'https://www.mdpi.com/sensors/sensors-24-00037/article_deploy/html/images/sensors-24-00037-g001.png',
    },
  ];

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} font-inter transition-all duration-500`}>
      {/* Hero Section (unchanged) */}
      <div
        ref={heroRef}
        className={`hero-section relative min-h-screen flex items-center justify-center overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-b from-black to-[#1A3C34]' : 'bg-gradient-to-b from-blue-500 to-teal-600'}`}
      >
        <div className="hero-image absolute inset-0 z-0" ref={heroImageRef}>
          <img
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80"
            alt="Cancer Research Lab"
            className={`w-full h-full object-cover transition-opacity duration-500 ${theme === 'dark' ? 'opacity-80' : 'opacity-100'}`}
            loading="lazy"
          />
          <div className={`absolute inset-0 transition-opacity duration-500 ${currentTheme.gradientOverlay}`} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={heroContentRef}>
          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${theme === 'dark' ? currentTheme.text : 'text-white'}`}
          >
            What does <span className={theme === 'dark' ? 'text-neonRed' : 'text-blue-500'}>Hope</span> mean to you?
          </h1>
          <p
            className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-200'}`}
          >
            In the fight against cancer relapse, <span className={`font-bold ${theme === 'dark' ? 'text-neonRed' : 'text-blue-500'}`}>TRACER</span> delivers precision-driven hope—when every moment counts.
          </p>
          <button
            onClick={() => navigate('/research')}
            className={`px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 mx-auto group transition-colors ${theme === 'dark'
              ? `border ${currentTheme.border} text-white hover:bg-white hover:text-black`
              : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            Discover TRACER
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
          </button>
        </div>
        <motion.div
          className="absolute bottom-10 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className={`w-8 h-8 ${currentTheme.text} py-40`} />
        </motion.div>
      </div>

      {/* Story Section with Bento Grid and Chat Widget (unchanged) */}
      <div ref={(el) => (contentRefs.current[0] = el)} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            A Journey Through <span className={`text-4xl ${currentTheme.neonRed}`}>Cancer Relapse</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
            className={`text-lg md:text-xl ${currentTheme.secondaryText} text-center max-w-3xl mx-auto mb-12 leading-relaxed`}
          >
            For cancer patients, the journey is a battle of resilience, hope, and heartbreak. Walk with us through the stages of this fight—and discover how innovation can change the story.
          </motion.p>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {storySegments.map((segment, index) => (
              <BentoCard
                key={index}
                title={segment.title}
                description={segment.description}
                image={segment.image}
                theme={currentTheme}
                index={index}
                align={index % 3 === 0 ? 'top' : index % 3 === 1 ? 'center' : 'bottom'}
              />
            ))}
          </div>

          {/* Chat Widget for Conversational Storytelling */}
          <div className="max-w-3xl mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="text-2xl font-semibold text-center mb-8"
            >
              A Patient’s Journey: A Conversation
            </motion.h3>
            <div className={`p-6 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border}`}>
              {chatMessages.map((msg, index) => (
                <ChatBubble
                  key={index}
                  message={msg.message}
                  sender={msg.sender}
                  time={msg.time}
                  isPatient={msg.isPatient}
                  theme={currentTheme}
                  delay={index * 0.3}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Relapse Statistics Section (unchanged) */}
      <div ref={(el) => (contentRefs.current[1] = el)} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            The Stark Reality of <span className={`text-4xl ${currentTheme.neonRed}`}>Relapse</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
            className={`text-lg md:text-xl ${currentTheme.secondaryText} text-center max-w-3xl mx-auto mb-12 leading-relaxed`}
          >
            Relapse reveals a critical gap in cancer care. Current methods often miss early signs of recurrence, leaving patients with less time to act—and fewer options to fight.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="relative timeline-image"
            >
              <img
                src="./Public/assets/images/SolutionDark.png"
                alt="Relapse Cycle"
                className={`w-full h-auto rounded-lg border ${currentTheme.border}`}
                style={{ boxShadow: `0 0 20px ${currentTheme.shadowRed}` }}
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              <Statistic
                value="70%"
                label="Relapse per 10 Patients"
                icon={<ChartBar />}
                theme={currentTheme}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* TRACER Solution Section (unchanged) */}
      <div ref={(el) => (contentRefs.current[2] = el)} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            A New Dawn with <span className={`text-4xl ${currentTheme.neonRed}`}>TRACER</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
            className={`text-lg md:text-xl ${currentTheme.secondaryText} text-center max-w-3xl mx-auto mb-12 leading-relaxed`}
          >
            At the intersection of despair and determination, <span className={`font-bold ${currentTheme.neonRed}`}>TRACER</span> emerges as a beacon of hope—a cell-based theragnostic platform that detects and responds to cancer relapse in real time.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
            className={`text-lg md:text-xl ${currentTheme.secondaryText} text-center max-w-3xl mx-auto mb-12 leading-relaxed`}
          >
            Imagine a system that tirelessly patrols the body, catching the earliest whispers of recurrence and acting swiftly to slow its spread. That’s the promise of <span className={`font-bold ${currentTheme.neonRed}`}>TRACER</span>.
          </motion.p>

          {/* Use BentoCard for tracerSteps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tracerSteps.map((step, index) => (
              <BentoCard
                key={index}
                title={step.title}
                description={step.description}
                image={step.image}
                theme={currentTheme}
                index={index}
                align="center"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Our Solution Section - Infographic Image (unchanged) */}
      <div ref={(el) => (contentRefs.current[3] = el)} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
            className={`text-lg ${currentTheme.secondaryText} max-w-3xl mx-auto mb-12`}
          >
            A groundbreaking theragnostic system to combat cancer relapse.
          </motion.p>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${currentTheme.shadowRed}` }}
              // transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ willChange: 'transform, box-shadow' }}
            >
              <img
                src={theme === 'dark' ? '/assets/images/SolutionDark.png' : '/assets/images/solution.png'}
                width="100%"
                alt="Solution"
                className={`rounded-xl border ${currentTheme.border}`}
                style={{ boxShadow: `0 0 20px ${currentTheme.shadowRed}` }}
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action (unchanged) */}
      <div ref={(el) => (contentRefs.current[4] = el)} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Join the Fight Against <span className={`text-4xl ${currentTheme.neonRed}`}>Cancer Relapse</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
            className={`text-lg md:text-xl ${currentTheme.secondaryText} max-w-3xl mx-auto mb-12 leading-relaxed`}
          >
            Discover how <span className={`font-bold ${currentTheme.neonRed}`}>TRACER</span> is redefining cancer care with early detection and targeted response.
          </motion.p>
          <button
            onClick={() => navigate('/research')}
            className={`px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 mx-auto group transition-colors ${theme === 'dark'
              ? `border ${currentTheme.border} text-white hover:bg-white hover:text-black`
              : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            Learn More
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;