import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Target,
  Timer,
  ChevronDown,
  Heart,
  AlertCircle,
  Shield,
  Bell,
  AlertTriangle,
  DollarSign,
  EyeOff,
  Clock,
  ShieldOff,
} from "lucide-react";
import gsap from "gsap";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

// Themes object (unchanged)
const themes = {
  dark: {
    background: "bg-gradient-to-b from-black to-[#2A0000]",
    text: "text-white",
    secondaryText: "text-gray-300",
    cardBg: "bg-black/50",
    border: "border-gray-700",
    hoverBorder: "hover:border-neonRed",
    neonRed: "text-neonRed",
    neonPurple: "text-neonPurple",
    neonOrange: "text-neonOrange",
    neonPink: "text-neonPink",
    neonTeal: "text-neonTeal",
    shadowRed: "rgba(255, 64, 64, 0.5)",
    shadowPurple: "rgba(169, 64, 255, 0.5)",
    shadowOrange: "rgba(255, 64, 169, 0.5)",
    shadowTeal: "rgba(64, 255, 217, 0.5)",
    gradientOverlay: "bg-gradient-to-b from-black/80 via-black/60 to-black/80",
    timelineLine: "bg-gradient-to-b from-[#FF073A] to-[#a940ff]",
  },
  light: {
    background: "bg-gradient-to-b from-gray-50 to-gray-200",
    text: "text-gray-900",
    secondaryText: "text-gray-700",
    cardBg: "bg-white/90",
    border: "border-gray-300",
    hoverBorder: "hover:border-blue-500",
    neonRed: "text-blue-700",
    neonPurple: "text-purple-700",
    neonOrange: "text-orange-600",
    neonPink: "text-pink-600",
    neonTeal: "text-teal-600",
    shadowRed: "rgba(59, 130, 246, 0.4)",
    shadowPurple: "rgba(147, 51, 234, 0.4)",
    shadowOrange: "rgba(249, 115, 22, 0.4)",
    shadowTeal: "rgba(20, 184, 166, 0.4)",
    gradientOverlay: "bg-gradient-to-b from-white/30 via-white/20 to-white/30",
    timelineLine: "linear-gradient(to bottom, #2563eb, #9333ea)",
  },
};

// TimelineNode component (updated as above)
const TimelineNode = ({
  title,
  description,
  icon,
  image,
  isLeft,
  theme,
  index,
  imageHeight,
  nodeRef,
}) => {
  return (
    <div
      ref={nodeRef}
      className={`relative flex items-center mb-16 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } w-full will-change-transform`}
    >
      <div
        className={`w-1/2 ${isLeft ? "pr-8" : "pl-8"} flex flex-col items-${
          isLeft ? "end" : "start"
        } text-${isLeft ? "right" : "left"}`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`${theme.neonRed}`}>
            {React.cloneElement(icon, { className: "w-8 h-8" })}
          </div>
          <h4 className={`text-xl md:text-2xl font-semibold ${theme.text}`}>
            {title}
          </h4>
        </div>
        <p className={`text-lg ${theme.text} leading-relaxed`}>{description}</p>
      </div>
      <div className={`w-1/2 ${isLeft ? "pl-8" : "pr-8"}`}>
        <div className="relative timeline-image">
          <img
            src={image}
            alt={title}
            className={`w-full ${
              imageHeight || "h-64"
            } object-contain rounded-lg`}
            loading="lazy"
          />
        </div>
      </div>
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 ${
          isLeft ? "right-0" : "left-0"
        } w-6 h-6 rounded-full ${theme.neonRed} z-10 timeline-node-circle`}
      />
    </div>
  );
};

// BentoCard and RelapsePoint components (unchanged)
const BentoCard = ({
  title,
  description,
  image,
  icon,
  theme,
  index,
  align = "center",
  showIcon = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeInOut" }}
      className={`flex flex-col p-6 sm:p-8 rounded-xl ${theme.cardBg} border ${theme.border} 
        transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] 
        w-full max-w-[90%] sm:max-w-[450px] mx-auto will-change-transform h-full`}
    >
      {showIcon ? (
        <motion.div
          className="mb-6 flex justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="p-4 rounded-full"
            style={{ boxShadow: `0 0 15px ${theme.shadowRed}` }}
          >
            {React.cloneElement(icon, {
              className: `w-12 h-12 ${theme.neonRed}`,
            })}
          </div>
        </motion.div>
      ) : (
        image && (
          <motion.div
            className="mb-6 relative overflow-hidden rounded-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 30px ${theme.shadowRed}`,
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeInOut" },
              y: { duration: 0.8, ease: "easeInOut" },
              scale: { duration: 0.5, ease: "easeInOut" },
              boxShadow: { duration: 0.5, ease: "easeInOut" },
            }}
            style={{ willChange: "transform, box-shadow" }}
          >
            <img
              src={image}
              alt={title}
              className={`w-full h-56 sm:h-64 object-cover rounded-lg border ${theme.border}`}
              style={{ boxShadow: `0 0 20px ${theme.shadowRed}` }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </motion.div>
        )
      )}
      <div className="flex flex-col flex-grow text-center">
        <h3 className={`text-xl sm:text-xl font-semibold ${theme.text} mb-3`}>
          {title}
        </h3>
        <p
          className={`text-base sm:text-lg ${theme.secondaryText} leading-relaxed flex-grow`}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const RelapsePoint = ({ title, description, icon, theme, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeInOut" }}
      className={`relative flex flex-col items-center justify-center w-64 h-72 mx-auto will-change-transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}
      style={{
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        background: theme.cardBg,
        border: `1px solid ${theme.border.replace("border-", "")}`,
      }}
    >
      <motion.div
        className="mb-4 flex justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="p-3 rounded-full"
          style={{ boxShadow: `0 0 15px ${theme.shadowRed}` }}
        >
          {React.cloneElement(icon, { className: `w-8 h-8 ${theme.neonRed}` })}
        </div>
      </motion.div>
      <h3
        className={`text-base font-semibold ${theme.text} mb-2 text-center px-4`}
      >
        {title}
      </h3>
      <p
        className={`text-sm ${theme.secondaryText} leading-relaxed text-center px-6`}
      >
        {description}
      </p>
    </motion.div>
  );
};

// Updated Home1 component
const Home1 = () => {
  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroContentRef = useRef(null);
  const contentRefs = useRef([]);
  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null); // Ref for the timeline line
  const timelineNodesRef = useRef([]); // Array of refs for timeline nodes
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Existing useEffect for hero, sections, and video
  useEffect(() => {
    const heroContent = heroContentRef.current;
    const hero = heroRef.current;

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
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }

    if (hero) {
      gsap.to(hero, {
        opacity: 0,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });
    }

    const sections = contentRefs.current.filter(Boolean);
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            scrub: true,
          },
        }
      );
    });

    const video = videoRef.current;
    if (video) {
      video.currentTime = video.duration || 0;
      video.pause();

      ScrollTrigger.create({
        trigger: video,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          video.currentTime = 0;
          video.play();
        },
        onLeave: () => {
          video.currentTime = video.duration;
          video.pause();
        },
        onEnterBack: () => {
          video.currentTime = 0;
          video.play();
        },
        onLeaveBack: () => {
          video.currentTime = video.duration;
          video.pause();
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [theme]);

  // New useEffect for timeline scroll effect
  useEffect(() => {
    const timeline = timelineRef.current;
    const timelineLine = timelineLineRef.current;
    const nodes = timelineNodesRef.current.filter(Boolean);

    if (timeline && timelineLine && nodes.length > 0) {
      // Ensure the timeline container has a defined height
      const updateHeight = () => {
        const timelineHeight = timeline.scrollHeight;
        timeline.style.height = `${timelineHeight}px`;
      };
      updateHeight();
      window.addEventListener("resize", updateHeight);

      // Animate the timeline line (grow from 0% to 100% height)
      gsap.fromTo(
        timelineLine,
        { height: "0%" },
        {
          height: "100%",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timeline,
            start: "top 80%", // Start when the top of the timeline hits 80% of the viewport
            end: "bottom 20%", // End when the bottom of the timeline hits 20% of the viewport
            scrub: 1, // Smoothly animate with scroll
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate each timeline node
      nodes.forEach((node, index) => {
        const isLeft = index % 2 === 0; // Determine if the node is on the left

        // Animate the node (fade in and slide)
        gsap.fromTo(
          node,
          {
            opacity: 0,
            x: isLeft ? -50 : 50, // Slide from left or right
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 80%", // Start when the node enters the viewport
              toggleActions: "play none none reverse",
            },
          }
        );

        // Animate the circle (optional: scale up for emphasis)
        const circle = node.querySelector(".timeline-node-circle");
        if (circle) {
          gsap.fromTo(
            circle,
            {
              scale: 0,
            },
            {
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: node,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Cleanup
      return () => {
        window.removeEventListener("resize", updateHeight);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [theme]);

  const currentTheme = themes[theme];

  const storySegments = [
    {
      title: "Initial Diagnosis",
      description: (
        <>
          “You have{" "}
          <span className={`text-xl font-bold ${currentTheme.neonRed}`}>
            Cancer
          </span>
          ” - hearing these words can shatter anyone’s world, such is the fear
          that cancer breeds in one’s mind.
        </>
      ),
      icon: <AlertCircle />,
      image: "/assets/images/Diagnosis.png",
    },
    {
      title: "Navigating Cancer Treatment",
      description: (
        <>
          In hopes of living a normal and healthy life, the patient undergoes{" "}
          <span className={`text-xl font-bold ${currentTheme.neonPurple}`}>
            treatment
          </span>
          , although it adds more to the physical and mental exhaustion.
        </>
      ),
      icon: <Shield />,
      image: "/assets/images/Treatment.png",
    },
    {
      title: "Cancer Remission",
      description: (
        <>
          After a relentless battle, treatment offers a{" "}
          <span className={`text-xl font-bold ${currentTheme.neonOrange}`}>
            second chance
          </span>
          , restoring the long-awaited sense of normalcy.
        </>
      ),
      icon: <Bell />,
      image: "/assets/images/Remission.png",
      imageHeight: "h-80",
    },
    {
      title: "The Reality of Relapse",
      description: (
        <>
          However, this relief is short-lived, as residual cancer cells multiply
          rapidly, often bypassing morphogenetic stages. Mutations render most
          treatments less effective, leading to an{" "}
          <span className={`text-xl font-bold ${currentTheme.neonRed}`}>
            aggressive
          </span>{" "}
          and relentless relapse.
        </>
      ),
      icon: <AlertTriangle />,
      image: "/assets/images/Reality.png",
      imageHeight: "h-80",
    },
    {
      title: "The Fight Restarts",
      description: (
        <>
          <span className={`text-xl font-bold ${currentTheme.neonRed}`}>
            Relapse
          </span>{" "}
          strikes unexpectedly, bringing uncertainty, fewer options, and a
          tougher battle. The fight that once ended begins anew.
        </>
      ),
      icon: <Heart />,
      image: "/assets/images/Fight.png",
    },
  ];

  const tracerSteps = [
    {
      title: "Detecting the Unseen",
      description:
        "Engineered monocytes circulate throughout the body, utilizing a CD147-specific receptor to detect cancer cells at an early stage, triggering the production of ApoA1 and anti-CD147 scFv antibodies.",
      icon: <Brain />,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu6TPf1pE0_CgjhSfVWwEDN_a4s2wylc4fzXYE9lR7Uxz5vxufrMINTrRImVOSGPQ33e4&usqp=CAU",
    },
    {
      title: "Tagging for Action",
      description:
        "Anti-CD147 scFv antibodies bind to CD147 receptors on cancer cells, suppressing tumor progression and limiting metastatic potential.",
      icon: <Target />,
      image:
        "https://pub.mdpi-res.com/pharmaceuticals/pharmaceuticals-15-00747/article_deploy/html/images/pharmaceuticals-15-00747-ag.png?1655704960",
    },
    {
      title: "Early Warning System",
      description:
        "As ApoA1 is excreted through the kidneys, a dipstick-based detection system enables rapid, non-invasive monitoring of cancer relapse.",
      icon: <Timer />,
      image:
        "https://www.mdpi.com/sensors/sensors-24-00037/article_deploy/html/images/sensors-24-00037-g001.png",
    },
  ];

  const relapsePoints = [
    {
      title: "Costly PET Scans",
      description:
        "PET scans are expensive and can’t be performed frequently as they involve radiation exposure.",
      icon: <DollarSign />,
    },
    {
      title: "Low Sensitivity",
      description:
        "The sensitivity of conventional blood biomarkers is insufficient for early relapse detection.",
      icon: <EyeOff />,
    },
    {
      title: "Delayed Detection",
      description:
        "Cancer relapse often goes undetected in its early stages with conventional methods, enabling uncontrolled progression.",
      icon: <Clock />,
    },
    {
      title: "Increased Resistance",
      description:
        "As cancer evolves, it becomes more resilient and less responsive to treatment.",
      icon: <ShieldOff />,
    },
  ];

  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen ${currentTheme.background} ${currentTheme.text} font-inter transition-all duration-500`}
    >
      <div
        ref={heroRef}
        className={`hero-section relative min-h-screen flex items-center justify-center overflow-hidden z-0 ${
          theme === "dark"
            ? "bg-gradient-to-b from-black to-[#1A3C34]"
            : "bg-gradient-to-b from-blue-400 to-teal-500"
        }`}
      >
        <div className="hero-image absolute inset-0 z-0" ref={heroImageRef}>
          <img
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80"
            alt="Cancer Research Lab"
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              theme === "dark" ? "opacity-80" : "opacity-100"
            }`}
            loading="lazy"
          />
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${currentTheme.gradientOverlay}`}
          />
        </div>
        <div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          ref={heroContentRef}
        >
          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 leading-tight text-white ${
              theme === "light" ? "drop-shadow-md" : ""
            }`}
            style={{
              textShadow:
                theme === "light" ? "2px 2px 4px rgba(0, 0, 0, 0.3)" : "none",
            }}
          >
            What does{" "}
            <span
              className={theme === "dark" ? "text-neonRed" : "text-blue-700"}
            >
              Hope
            </span>{" "}
            mean to you?
          </h1>
          <p
            className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white ${
              theme === "light" ? "drop-shadow-md" : ""
            }`}
            style={{
              textShadow:
                theme === "light" ? "1px 1px 3px rgba(0, 0, 0, 0.2)" : "none",
            }}
          >
            In the fight against cancer relapse,{" "}
            <span
              className={`font-bold ${
                theme === "dark" ? "text-neonRed" : "text-blue-700"
              }`}
            >
              TRACER
            </span>{" "}
            delivers precision-driven hope—when every moment counts.
          </p>
          <motion.div
            className="mt-10 flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown
              className={`w-8 h-8 text-white ${
                theme === "light" ? "drop-shadow-md" : ""
              }`}
            />
          </motion.div>
        </div>
      </div>

      <div
        ref={(el) => (contentRefs.current[0] = el)}
        className="py-20 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            A Journey Through{" "}
            <span className={`text-4xl ${currentTheme.neonRed}`}>
              Cancer Relapse
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className={`text-lg md:text-xl ${currentTheme.text} text-center max-w-3xl mx-auto mb-12 leading-relaxed`}
          >
            For cancer patients, the journey is a battle of resilience, hope,
            and heartbreak. Walk with us through the stages of this fight—and
            discover how innovation can change the story.
          </motion.p>
          <div className="relative" ref={timelineRef}>
            <div
              ref={timelineLineRef}
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${currentTheme.timelineLine}`}
              style={{ zIndex: 0 }}
            />
            {storySegments.map((segment, index) => (
              <TimelineNode
                key={index}
                title={segment.title}
                description={segment.description}
                icon={segment.icon}
                image={segment.image}
                isLeft={index % 2 === 0}
                theme={currentTheme}
                index={index}
                imageHeight={segment.imageHeight}
                nodeRef={(el) => (timelineNodesRef.current[index] = el)} // Pass ref to each node
              />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={(el) => (contentRefs.current[1] = el)}
        className="py-20 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            The Stark Reality of{" "}
            <span className={`text-4xl ${currentTheme.neonRed}`}>Relapse</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className={`text-lg md:text-xl ${currentTheme.secondaryText} text-center max-w-3xl mx-auto mb-12 leading-relaxed`}
          >
            Relapse reveals a critical gap in cancer care. Current methods often
            miss early signs of recurrence, leaving patients with less time to
            act—and fewer options to fight.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{
              scale: 1,
              boxShadow: `0 0 30px ${currentTheme.shadowRed}`,
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeInOut" },
              scale: { duration: 0.8, ease: "easeInOut" },
              boxShadow: { duration: 0.5, ease: "easeInOut" },
            }}
            className="relative max-w-4xl mx-auto"
            style={{ willChange: "transform, box-shadow" }}
          >
            <img
              src="/assets/images/Relapse.png"
              alt="The Stark Reality of Relapse"
              className={`w-full h-auto object-contain rounded-lg border ${currentTheme.border}`}
              style={{ boxShadow: `0 0 20px ${currentTheme.shadowRed}` }}
              loading="lazy"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${
                theme === "dark"
                  ? "from-black/30 to-transparent"
                  : "from-white/30 to-transparent"
              } rounded-lg pointer-events-none`}
            />
          </motion.div>
        </div>
      </div>

      <div
        ref={(el) => (contentRefs.current[2] = el)}
        className="py-20 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            A New Dawn with{" "}
            <span className={`text-4xl ${currentTheme.neonRed}`}>TRACER</span>
          </motion.h2>
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`text-xl md:text-xl font-bold text-center mb-8 mt-4 ${currentTheme.neonRed}`}
          >
            Targeted Relapse Assessment via Cellular Effector Response
          </motion.h4>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className={`text-lg md:text-xl ${currentTheme.secondaryText} text-center max-w-3xl mx-auto mb-12 leading-relaxed`}
          >
            At the intersection of despair and determination,{" "}
            <span className={`font-bold ${currentTheme.neonRed}`}>TRACER</span>{" "}
            emerges as a beacon of hope—a cell-based theranostic platform that
            detects and responds to cancer relapse in real time.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            className={`text-lg md:text-xl ${currentTheme.secondaryText} text-center max-w-3xl mx-auto mb-12 leading-relaxed`}
          >
            Imagine a system that tirelessly patrols the body, catching the
            earliest whispers of recurrence and acting swiftly to slow its
            spread. That’s the promise of{" "}
            <span className={`font-bold ${currentTheme.neonRed}`}>TRACER</span>.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl"
            style={{ boxShadow: `0 0 30px ${currentTheme.shadowRed}` }}
            onMouseEnter={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
              }
            }}
            onMouseLeave={() => {
              if (videoRef.current) {
                videoRef.current.pause();
              }
            }}
          >
            <video
              ref={videoRef}
              src={
                theme === "dark"
                  ? "/assets/videos/TRACER_dark_animation.mp4"
                  : "/assets/videos/TRACER_animation.mp4"
              }
              className="w-full h-auto"
              muted
              playsInline
              onEnded={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = videoRef.current.duration;
                  videoRef.current.pause();
                }
              }}
            />
            <div
              className={`absolute inset-0 pointer-events-none ${
                theme === "dark" ? "bg-black/20" : "bg-white/10"
              }`}
            />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 mt-16 items-stretch">
            {tracerSteps.map((step, index) => (
              <BentoCard
                key={index}
                title={step.title}
                description={step.description}
                image={step.image}
                icon={step.icon}
                theme={currentTheme}
                index={index}
                align="center"
                showIcon={true}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={(el) => (contentRefs.current[3] = el)}
        className="py-20 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className={`text-3xl ${currentTheme.secondaryText} max-w-3xl mx-auto mb-12`}
          >
            From detection to action – Reshaping cancer surveillance with
            TRACER.
          </motion.p>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                opacity: { duration: 0.8, ease: "easeInOut" },
                scale: { duration: 0.8, ease: "easeInOut" },
              }}
              style={{ willChange: "transform" }}
            >
              <img
                src={
                  theme === "dark"
                    ? "/assets/images/SolutionDark.png"
                    : "/assets/images/solution.png"
                }
                width="100%"
                alt="Solution"
                className="rounded-xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div
        ref={(el) => (contentRefs.current[4] = el)}
        className="py-20 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Join the Fight Against{" "}
            <span className={`text-4xl ${currentTheme.neonRed}`}>
              Cancer Relapse
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className={`text-lg md:text-xl ${currentTheme.secondaryText} max-w-3xl mx-auto mb-12 leading-relaxed`}
          >
            Discover how{" "}
            <span className={`font-bold ${currentTheme.neonRed}`}>TRACER</span>{" "}
            is redefining cancer care with early detection and targeted
            response.
          </motion.p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigateToTop("/tracer/research")}
              className={`px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 group transition-colors ${
                theme === "dark"
                  ? `border ${currentTheme.border} text-white hover:bg-white hover:text-black`
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Learn More
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </button>
            <button
              onClick={() => navigateToTop("/tracer/sponsors")}
              className={`px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 group transition-colors ${
                theme === "dark"
                  ? `border ${currentTheme.border} text-white hover:bg-neonRed hover:text-white`
                  : "bg-teal-600 text-white hover:bg-teal-700"
              }`}
            >
              Support Us
              <Heart className="group-hover:scale-110 transition-transform duration-300 ease-in-out w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home1;
