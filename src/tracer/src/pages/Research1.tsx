import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Microscope,
  FlaskRound as Flask,
  Brain,
  Users,
  Code,
  Dna,
  TestTube,
  Microscope as MicroscopeIcon,
  FlaskConical,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
  keyPoints: string[];
}

interface ImageWithHover {
  src: string;
  description: string;
  keyPoints: string[];
}

interface Video {
  src: string;
  title: string;
}

const ResearchSection: React.FC<{
  title: string;
  steps?: Step[];
  icon: React.ReactNode;
  images?: ImageWithHover[];
  flowchart?: { steps: string[] };
  videos?: Video[];
}> = ({ title, steps, icon, images, flowchart, videos }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { theme } = useTheme();

  // Define theme-specific styles to match Home1.tsx for dark theme, replacing blue with neonRed
  const themeStyles = {
    dark: {
      sectionBg: "bg-gradient-to-b from-black to-[#2A0000]",
      cardBg: "bg-black/50",
      textPrimary: "text-white",
      textSecondary: "text-gray-300",
      buttonBg: "bg-neonRed",
      buttonHoverBg: "hover:bg-neonRed/80",
      buttonText: "text-white",
      descriptionCardBg: "bg-gradient-to-br from-gray-800 to-black",
      descriptionCardBorder: "border-gray-700",
      descriptionCardTitle: "text-neonRed",
      descriptionCardText: "text-gray-300",
      tabInactiveBg: "hover:bg-gray-700",
      tabInactiveText: "text-gray-400",
      stepBlockBg: "bg-gradient-to-br from-gray-900/30 to-black/30",
      stepBlockHoverOverlay: "bg-black/50 backdrop-blur-md",
      stepBlockBorder: "border-gray-700",
      stepBlockHoverBorder: "border-neonRed",
      iconColor: "text-neonRed",
      overlayBg: "bg-black/50 backdrop-blur-md",
      overlayText: "text-neonRed",
      flowchartBlockBg: "bg-gradient-to-r from-gray-900/50 to-black/50",
      flowchartBlockBorder: "border-l-4 border-neonRed",
      flowchartBlockHover: "hover:bg-gray-800/50",
      flowchartTooltipBg: "bg-gray-900/70 backdrop-blur-md",
      flowchartTooltipText: "text-white",
      flowchartConnector: "bg-gray-600",
      imageBorder: "border-gray-700",
      imageShadow: "shadow-lg",
      videoBorder: "border-gray-700",
      videoShadow: "shadow-2xl",
      videoOverlay: "bg-black/20",
    },
    light: {
      sectionBg: "bg-gray-50",
      cardBg: "bg-white",
      textPrimary: "text-gray-900",
      textSecondary: "text-gray-600",
      buttonBg: "bg-blue-600",
      buttonHoverBg: "hover:bg-blue-700",
      buttonText: "text-white",
      descriptionCardBg: "bg-gradient-to-br from-blue-50 to-white",
      descriptionCardBorder: "border-blue-100",
      descriptionCardTitle: "text-blue-700",
      descriptionCardText: "text-gray-600",
      tabInactiveBg: "hover:bg-gray-100",
      tabInactiveText: "text-gray-600",
      stepBlockBg: "bg-gradient-to-br from-white/50 to-gray-100/50",
      stepBlockHoverOverlay: "bg-white/50 backdrop-blur-md",
      stepBlockBorder: "border-gray-300",
      stepBlockHoverBorder: "border-blue-500",
      iconColor: "text-blue-600",
      overlayBg: "bg-white/50 backdrop-blur-md",
      overlayText: "text-blue-600",
      flowchartBlockBg: "bg-gradient-to-r from-gray-100/50 to-white/50",
      flowchartBlockBorder: "border-l-4 border-blue-600",
      flowchartBlockHover: "hover:bg-gray-200/50",
      flowchartTooltipBg: "bg-white/70 backdrop-blur-md",
      flowchartTooltipText: "text-gray-900",
      flowchartConnector: "bg-gray-300",
      imageBorder: "border-gray-300",
      imageShadow: "shadow-lg",
      videoBorder: "border-gray-300",
      videoShadow: "shadow-2xl",
      videoOverlay: "bg-white/10",
    },
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles];

  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  // Check if the section has images, videos, or flowchart to determine layout
  const hasRightColumnContent =
    (images && images.length > 0) ||
    (videos && videos.length > 0) ||
    (flowchart && flowchart.steps.length > 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`${currentTheme.cardBg} rounded-2xl shadow-xl overflow-hidden border ${currentTheme.descriptionCardBorder}`}
    >
      <div className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className={`${currentTheme.buttonBg} p-3 rounded-lg`}>
            {React.cloneElement(icon, {
              className: `w-8 h-8 ${currentTheme.buttonText}`,
            })}
          </div>
          <h3 className={`text-3xl font-bold ${currentTheme.textPrimary}`}>
            {title}
          </h3>
        </div>
        {/* Add ResearchIdea.png at the top for Research Idea section */}
        {title === "TRACER" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative max-w-4xl mx-auto mb-8"
          >
            <img
              src="/assets/images/TracerResearch.png"
              alt="Research Idea Overview"
              className={`w-full h-auto object-contain rounded-lg`}
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
        )}
        <div
          className={`flex ${
            hasRightColumnContent ? "flex-col lg:flex-row" : "flex-col"
          } gap-8`}
        >
          {/* Staggered Grid Layout for Steps */}
          {steps && steps.length > 0 && (
            <div
              className={`${hasRightColumnContent ? "lg:w-1/2" : "w-full"} ${
                title === "Dry Lab: Computational Research"
                  ? "order-2 lg:order-1"
                  : ""
              }`}
            >
              <div
                className={`${
                  hasRightColumnContent
                    ? "grid grid-cols-1 gap-8"
                    : "grid grid-cols-1 md:grid-cols-2 gap-8"
                } ${
                  title === "Dry Lab: Computational Research"
                    ? "max-w-3xl mx-auto"
                    : ""
                }`}
              >
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                    className={`relative p-6 rounded-lg ${
                      currentTheme.stepBlockBg
                    } border ${
                      currentTheme.stepBlockBorder
                    } transition-all duration-300 ${
                      title === "Dry Lab: Computational Research" ? "p-8" : ""
                    }`}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`${currentTheme.iconColor} mb-4`}>
                        {React.cloneElement(step.icon as React.ReactElement, {
                          className: `w-12 h-12 ${
                            title === "Dry Lab: Computational Research"
                              ? "w-16 h-16"
                              : ""
                          }`,
                        })}
                      </div>
                      <h4
                        className={`text-xl font-semibold ${
                          currentTheme.textPrimary
                        } mb-2 ${
                          title === "Dry Lab: Computational Research"
                            ? "text-2xl"
                            : ""
                        }`}
                      >
                        {step.title}
                      </h4>
                    </div>
                    {/* Hover Overlay with Description */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredStep === index ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`absolute inset-0 ${currentTheme.stepBlockHoverOverlay} rounded-lg flex items-center justify-center p-6 border ${currentTheme.stepBlockHoverBorder}`}
                    >
                      <p
                        className={`${currentTheme.textSecondary} text-lg leading-relaxed font-light`}
                      >
                        {step.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          {/* Right Column: Images, Videos, and Flowchart */}
          {hasRightColumnContent && (
            <div
              className={`lg:w-1/2 ${
                title === "Dry Lab: Computational Research"
                  ? "order-1 lg:order-2"
                  : ""
              }`}
            >
              {/* Image and Description Blocks with Hover Effect */}
              {images && images.length > 0 && (
                <div className="grid grid-cols-1 gap-8">
                  {images.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col lg:flex-row items-center gap-6"
                    >
                      {/* Image with Hover Overlay */}
                      <div
                        className="relative w-full lg:w-1/2"
                        onMouseEnter={() => setHoveredImage(index)}
                        onMouseLeave={() => setHoveredImage(null)}
                      >
                        <img
                          src={item.src}
                          alt={`Diagram ${index + 1}`}
                          className={`w-full h-64 object-contain rounded-lg border ${currentTheme.imageBorder} ${currentTheme.imageShadow} transition-transform duration-300 hover:scale-105`}
                          loading="lazy"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${
                            theme === "dark"
                              ? "from-black/30 to-transparent"
                              : "from-white/30 to-transparent"
                          } rounded-md`}
                        />
                      </div>
                      {/* Description Card */}
                      <div
                        className={`w-full lg:w-1/2 ${currentTheme.descriptionCardBg} p-6 rounded-lg shadow-lg border ${currentTheme.descriptionCardBorder}`}
                      >
                        <h4
                          className={`text-xl font-semibold ${currentTheme.descriptionCardTitle} mb-3`}
                        >
                          Fig {index + 1}:
                        </h4>
                        <p
                          className={`${currentTheme.descriptionCardText} text-lg leading-relaxed font-light`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Flowchart and Videos for Dry Lab */}
              {title === "Dry Lab: Computational Research" &&
                flowchart &&
                videos && (
                  <div className="flex flex-col gap-8">
                    {/* Flowchart on the Right */}
                    <div className="w-full max-w-md ml-auto">
                      <div className="space-y-6">
                        {flowchart.steps.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.2,
                              ease: "easeOut",
                            }}
                            className={`relative pl-10 ${currentTheme.flowchartBlockBg} ${currentTheme.flowchartBlockBorder} rounded-r-lg transition-all duration-300`}
                          >
                            {/* Connector Line */}
                            {index < flowchart.steps.length - 1 && (
                              <div
                                className={`absolute left-3 top-14 h-12 w-1 ${currentTheme.flowchartConnector}`}
                              ></div>
                            )}
                            <div className="flex items-center gap-4 py-4">
                              <div className={`${currentTheme.iconColor}`}>
                                <Microscope className="w-8 h-8" />
                              </div>
                              <h4
                                className={`text-xl font-semibold ${currentTheme.textPrimary}`}
                              >{`Step ${index + 1}: ${step}`}</h4>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              {/* Videos for Dry Lab (Centered Below Content) */}
              {title === "Dry Lab: Computational Research" && videos && (
                <div className="mt-8 flex justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
                    {videos.map((video, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <h4
                          className={`text-xl font-semibold ${currentTheme.textPrimary} mb-4 text-center`}
                        >
                          {video.title}
                        </h4>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: false, margin: "-100px" }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                          className={`relative w-full h-[350px] rounded-xl overflow-hidden ${currentTheme.videoShadow} border ${currentTheme.videoBorder}`}
                        >
                          <video
                            src={video.src}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                          <div
                            className={`absolute inset-0 pointer-events-none ${currentTheme.videoOverlay}`}
                          />
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Flowchart for Wet Lab (without hover) */}
              {title !== "Dry Lab: Computational Research" && flowchart && (
                <div className="mt-12 flex flex-col items-center">
                  <div className="w-full max-w-3xl space-y-6">
                    {flowchart.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.2,
                          ease: "easeOut",
                        }}
                        className={`relative pl-10 ${currentTheme.flowchartBlockBg} ${currentTheme.flowchartBlockBorder} rounded-r-lg transition-all duration-300`}
                      >
                        {/* Connector Line */}
                        {index < flowchart.steps.length - 1 && (
                          <div
                            className={`absolute left-3 top-14 h-12 w-1 ${currentTheme.flowchartConnector}`}
                          ></div>
                        )}
                        <div className="flex items-center gap-4 py-4">
                          <div className={`${currentTheme.iconColor}`}>
                            <Microscope className="w-8 h-8" />
                          </div>
                          <h4
                            className={`text-xl font-semibold ${currentTheme.textPrimary}`}
                          >{`Step ${index + 1}: ${step}`}</h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Research1: React.FC = () => {
  const [activeTab, setActiveTab] = useState("idea");
  const { theme } = useTheme();

  // Define theme-specific styles to match Home1.tsx for dark theme, replacing blue with neonRed
  const themeStyles = {
    dark: {
      sectionBg: "bg-gradient-to-b from-black to-[#2A0000]",
      textPrimary: "text-white",
      textSecondary: "text-gray-400",
      tabContainerBg: "bg-black/50",
      tabInactiveBg: "hover:bg-gray-700",
      tabInactiveText: "text-gray-400",
    },
    light: {
      sectionBg: "bg-gray-50",
      textPrimary: "text-gray-900",
      textSecondary: "text-gray-600",
      tabContainerBg: "bg-white",
      tabInactiveBg: "hover:bg-gray-100",
      tabInactiveText: "text-gray-600",
    },
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles];

  const tabs = [
    {
      id: "idea",
      label: "Research Idea",
      icon: <Brain className="w-5 h-5" />,
    },
    {
      id: "drylab",
      label: "Dry Lab",
      icon: <Microscope className="w-5 h-5" />,
    },
    {
      id: "wetlab",
      label: "Wet Lab",
      icon: <Flask className="w-5 h-5" />,
    },
    {
      id: "practices",
      label: "Human Practices",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const sections = {
    idea: {
      title: "TRACER",
      steps: [
        {
          title: "Continuous Monitoring",
          description:
            "Engineered cells patrol the bloodstream, providing continuous surveillance to detect even subtle signs of cancer resurgence, ensuring timely response.",
          icon: <Brain />,
          keyPoints: ["Ongoing surveillance", "Timely response"],
        },
        {
          title: "Targeted Detection",
          description:
            "Utilizes a CD147-specific receptor to identify cancer cells with high precision, enabling early detection of cancer relapse.",
          icon: <MicroscopeIcon />,
          keyPoints: ["CD147-specific receptor", "High precision"],
        },
        {
          title: "SynNotch Circuit Integration",
          description:
            "Employs a synNotch circuit to trigger ApoA1 production upon detection, serving as a measurable biomarker for cancer presence.",
          icon: <Dna />,
          keyPoints: ["SynNotch circuit", "ApoA1 biomarker"],
        },
        {
          title: "Therapeutic Delivery",
          description:
            "Produces anti-CD147 scFv antibodies upon activation, which tag cancer cells for neutralization.",
          icon: <FlaskConical />,
          keyPoints: ["Anti-CD147 scFv", "Cancer cell neutralization"],
        },
        {
          title: "Spatially Resolved Detection",
          description:
            "By identifying molecular signals, the cells pinpoint tumor locations, allowing for precise and targeted medical interventions to improve treatment effectiveness.",
          icon: <TestTube />,
          keyPoints: ["Pinpoint tumor locations", "Targeted interventions"],
        },
      ],
      icon: <Brain className="w-6 h-6" />,
      images: [
        {
          src: "/assets/images/ResearchIdea.png",
          description:
            "Shows engineered monocytes circulating through the body and infiltrating tumor microenvironment",
          // keyPoints: ['scFv tagging', 'Immune system targeting'],
        },
        {
          src: "/assets/images/Detection.png",
          description:
            "Illustrates cancer detection via a CD147-specific receptor, showing ApoA1 and anti-CD147 scFv antibody production and release upon activation.",
          // keyPoints: ['CD147 receptor', 'ApoA1 production', 'scFv release'],
        },
        {
          src: "/assets/images/Tagging.png",
          description:
            "Depicts cancer cell tagging and neutralization by scFv antibodies, highlighting the immune system’s role in targeting and eliminating cancer cells.",
          // keyPoints: ['scFv tagging', 'Immune system targeting'],
        },
      ],
    },
    drylab: {
      title: "Dry Lab: Computational Research",
      steps: [
        {
          title: "Design Syn-Notch Receptor Circuit",
          description:
            "Design the Syn-Notch receptor construct in silico using SnapGene. Optimize the gene circuit for expression in a lentiviral backbone, ensuring compatibility with iGEM standards (RFC[10] or RFC[1000]).",
          icon: <Code />,
          keyPoints: ["In silico design", "SnapGene", "iGEM standards"],
        },
        {
          title: "In-Silico Validation of Syn-Notch Functionality",
          description:
            "Model the 3D structure of Syn-Notch using AlphaFold. Simulate docking of the CD147 ligand using HADDOCK. Perform molecular dynamics simulations to validate conformational changes and cleavage site exposure.",
          icon: <MicroscopeIcon />,
          keyPoints: [
            "AlphaFold modeling",
            "HADDOCK docking",
            "Molecular dynamics",
          ],
        },
      ],
      icon: <Microscope className="w-6 h-6" />,
      videos: [
        {
          src: "/assets/videos/synNOTCH.mp4",
          title: "anti-CD147 synNotch construct",
        },
        {
          src: "/assets/videos/synNOTCH2.mp4",
          title: "CD147–anti-CD147 receptor complex",
        },
      ],
      flowchart: {
        steps: [
          "Design Syn-Notch Receptor Circuit in Silico",
          "Validate Functionality via Molecular Simulation",
        ],
      },
    },
    wetlab: {
      title: "Wet Lab: Experimental Research",
      steps: [
        {
          title: "Lentivirus Production",
          description:
            "Package the Syn-Notch construct into lentiviral particles using HEK293T cells. Concentrate and quantify the virus to determine optimal titer for transduction.",
          icon: <Dna />,
          keyPoints: ["Lentiviral packaging", "HEK293T cells", "Optimal titer"],
        },
        {
          title: "Generation of Stable Syn-Notch HEK293 Cell Lines",
          description:
            "Transduce HEK293 cells with the Syn-Notch lentivirus. Select stable cell populations using antibiotic resistance (e.g., puromycin). Validate Syn-Notch expression by Western blot.",
          icon: <Dna />,
          keyPoints: [
            "Transduction",
            "Antibiotic selection",
            "Western blot validation",
          ],
        },
        {
          title: "Activation of Syn-Notch Receptor",
          description:
            "Expose Syn-Notch stable cells to CD147-expressing target cells or plate-bound CD147 ligand. Measure reporter activation (GFP or luciferase) to confirm receptor function.",
          icon: <TestTube />,
          keyPoints: [
            "CD147 exposure",
            "Reporter activation",
            "GFP/luciferase",
          ],
        },
        {
          title: "Production and Release of scFv",
          description:
            "Upon Syn-Notch activation, induce expression and secretion of scFv antibodies by the engineered cells. Collect supernatants and quantify scFv production using ELISA and confirm via Western blot.",
          icon: <FlaskConical />,
          keyPoints: [
            "scFv expression",
            "ELISA quantification",
            "Western blot",
          ],
        },
        {
          title: "Validation of scFv Binding to Target Antigen",
          description:
            "Incubate scFv-containing supernatants with CD147-expressing cells. Confirm binding specificity and affinity using flow cytometry and ELISA. Optionally perform surface plasmon resonance (SPR) for detailed affinity measurements.",
          icon: <MicroscopeIcon />,
          keyPoints: ["Binding specificity", "Flow cytometry", "SPR analysis"],
        },
      ],
      icon: <Flask className="w-6 h-6" />,
      flowchart: {
        steps: [
          "Produce Lentivirus Carrying Syn-Notch Circuit",
          "Generate Stable Syn-Notch HEK293 Cell Lines",
          "Activate Syn-Notch Cells with CD147 Ligand",
          "Induce and Quantify scFv Antibody Secretion",
          "Validate scFv Binding to Target Antigen",
        ],
      },
    },
    practices: {
      title: "Human Practices",
      steps: [
        {
          title: "Stakeholder Engagement",
          description:
            "Engage with stakeholders to gather insights and ensure the project aligns with community needs and expectations.",
          icon: <Users />,
          keyPoints: ["Stakeholder insights", "Community alignment"],
        },
        {
          title: "Ethical Considerations",
          description:
            "Address ethical concerns related to genetic engineering and ensure responsible development of TRACER technology.",
          icon: <Brain />,
          keyPoints: ["Ethical concerns", "Responsible development"],
        },
        {
          title: "Community Outreach",
          description:
            "Conduct outreach programs to educate the public about synthetic biology and the potential impact of TRACER on cancer treatment.",
          icon: <Users />,
          keyPoints: ["Public education", "Synthetic biology impact"],
        },
      ],
      icon: <Users className="w-6 h-6" />,
    },
  };

  return (
    <div
      className={`min-h-screen ${currentTheme.sectionBg} pt-24 pb-16 font-inter transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1
            className={`text-4xl md:text-5xl font-bold ${currentTheme.textPrimary} mb-4`}
          >
            Our Research
          </h1>
          <p
            className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto`}
          >
            Exploring innovative solutions for cancer relapse detection and
            therapy through cutting-edge research and development.
          </p>
        </motion.div>

        <div
          className={`${currentTheme.tabContainerBg} rounded-xl shadow-md p-2 mb-12 border border-gray-700`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#ff4040] text-white"
                    : `${currentTheme.tabInactiveBg} ${currentTheme.tabInactiveText}`
                }`}
              >
                {React.cloneElement(tab.icon, {
                  className: `w-5 h-5 ${
                    activeTab === tab.id
                      ? "text-white"
                      : currentTheme.tabInactiveText
                  }`,
                })}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ResearchSection {...sections[activeTab as keyof typeof sections]} />
        </motion.div>
      </div>
    </div>
  );
};

export default Research1;
