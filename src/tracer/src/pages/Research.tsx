import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Microscope, FlaskRound as Flask, Brain, Users, Code, Dna, TestTube, Microscope as MicroscopeIcon, FlaskConical } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Adjust the path based on your project structure

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

const ResearchSection: React.FC<{
    title: string;
    steps?: Step[];
    icon: React.ReactNode;
    images?: ImageWithHover[];
    flowchart?: { steps: string[] };
}> = ({ title, steps, icon, images, flowchart }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const { theme } = useTheme();

    // Define theme-specific styles to match Home1.tsx for dark theme, replacing blue with neonRed
    const themeStyles = {
        dark: {
            sectionBg: 'bg-gradient-to-b from-black to-[#2A0000]', // Match Home1 dark background
            cardBg: 'bg-black/50', // Match Home1 card background
            textPrimary: 'text-white', // Match Home1 primary text
            textSecondary: 'text-gray-300', // Lighter secondary text for better readability
            buttonBg: 'bg-neonRed', // Changed from bg-blue-600 to bg-neonRed
            buttonHoverBg: 'hover:bg-neonRed/80', // Changed from hover:bg-blue-700 to a slightly darker neonRed
            buttonText: 'text-white',
            descriptionCardBg: 'bg-gradient-to-br from-gray-800 to-black', // Dark gradient for description cards
            descriptionCardBorder: 'border-gray-700', // Match Home1 border
            descriptionCardTitle: 'text-neonRed', // Already neonRed to match Home1 accents
            descriptionCardText: 'text-gray-300', // Lighter text for readability
            tabInactiveBg: 'hover:bg-gray-700', // Match Home1 hover effects
            tabInactiveText: 'text-gray-400', // Match Home1 secondary text
            stepBlockBg: 'bg-gradient-to-br from-gray-900/30 to-black/30', // Gradient for step blocks
            stepBlockHoverOverlay: 'bg-black/50 backdrop-blur-md', // More transparent with blur
            stepBlockBorder: 'border-gray-700',
            stepBlockHoverBorder: 'border-neonRed',
            iconColor: 'text-neonRed',
            overlayBg: 'bg-black/50 backdrop-blur-md', // More transparent with blur
            overlayText: 'text-neonRed',
            flowchartBlockBg: 'bg-gradient-to-r from-gray-900/50 to-black/50',
            flowchartBlockBorder: 'border-l-4 border-neonRed', // Changed from border-blue-600 to border-neonRed
            flowchartBlockHover: 'hover:bg-gray-800/50',
            flowchartTooltipBg: 'bg-gray-900/70 backdrop-blur-md', // More transparent with blur
            flowchartTooltipText: 'text-white',
            flowchartConnector: 'bg-gray-600',
            imageBorder: 'border-gray-700',
            imageShadow: 'shadow-lg',
        },
        light: {
            sectionBg: 'bg-gray-50',
            cardBg: 'bg-white',
            textPrimary: 'text-gray-900',
            textSecondary: 'text-gray-600',
            buttonBg: 'bg-blue-600', // Light theme remains unchanged
            buttonHoverBg: 'hover:bg-blue-700',
            buttonText: 'text-white',
            descriptionCardBg: 'bg-gradient-to-br from-blue-50 to-white',
            descriptionCardBorder: 'border-blue-100',
            descriptionCardTitle: 'text-blue-700',
            descriptionCardText: 'text-gray-600',
            tabInactiveBg: 'hover:bg-gray-100',
            tabInactiveText: 'text-gray-600',
            stepBlockBg: 'bg-gradient-to-br from-white/50 to-gray-100/50',
            stepBlockHoverOverlay: 'bg-white/50 backdrop-blur-md',
            stepBlockBorder: 'border-gray-300',
            stepBlockHoverBorder: 'border-blue-500',
            iconColor: 'text-blue-600',
            overlayBg: 'bg-white/50 backdrop-blur-md',
            overlayText: 'text-blue-600',
            flowchartBlockBg: 'bg-gradient-to-r from-gray-100/50 to-white/50',
            flowchartBlockBorder: 'border-l-4 border-blue-600',
            flowchartBlockHover: 'hover:bg-gray-200/50',
            flowchartTooltipBg: 'bg-white/70 backdrop-blur-md',
            flowchartTooltipText: 'text-gray-900',
            flowchartConnector: 'bg-gray-300',
            imageBorder: 'border-gray-300',
            imageShadow: 'shadow-lg',
        },
    };

    const currentTheme = themeStyles[theme as keyof typeof themeStyles];

    // State to track which step block is hovered
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);
    // State to track which image is being hovered
    const [hoveredImage, setHoveredImage] = useState<number | null>(null);
    // State to track which flowchart step is hovered
    const [hoveredFlowchartStep, setHoveredFlowchartStep] = useState<number | null>(null);

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
                        {React.cloneElement(icon, { className: `w-8 h-8 ${currentTheme.buttonText}` })}
                    </div>
                    <h3 className={`text-3xl font-bold ${currentTheme.textPrimary}`}>{title}</h3>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Staggered Grid Layout for Steps */}
                    {steps && steps.length > 0 && (
                        <div className="lg:w-1/2">
                            <div className="grid grid-cols-1 gap-8">
                                {steps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.2, ease: 'easeOut' }}
                                        className={`relative p-6 rounded-lg ${currentTheme.stepBlockBg} border ${currentTheme.stepBlockBorder} transition-all duration-300`}
                                        onMouseEnter={() => setHoveredStep(index)}
                                        onMouseLeave={() => setHoveredStep(null)}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div className={`${currentTheme.iconColor} mb-4`}>
                                                {React.cloneElement(step.icon as React.ReactElement, { className: 'w-12 h-12' })}
                                            </div>
                                            <h4 className={`text-xl font-semibold ${currentTheme.textPrimary} mb-2`}>{step.title}</h4>
                                        </div>
                                        {/* Hover Overlay with Description */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredStep === index ? 1 : 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className={`absolute inset-0 ${currentTheme.stepBlockHoverOverlay} rounded-lg flex items-center justify-center p-6 border ${currentTheme.stepBlockHoverBorder}`}
                                        >
                                            <p className={`${currentTheme.textSecondary} text-lg leading-relaxed font-light`}>{step.description}</p>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Image and Description Blocks with Hover Effect */}
                    {images && images.length > 0 && (
                        <div className="lg:w-1/2 grid grid-cols-1 gap-8">
                            {images.map((item, index) => (
                                <div key={index} className="flex flex-col lg:flex-row items-center gap-6">
                                    {/* Image with Hover Overlay */}
                                    <div
                                        className="relative w-full lg:w-1/2"
                                        onMouseEnter={() => setHoveredImage(index)}
                                        onMouseLeave={() => setHoveredImage(null)}
                                    >
                                        <img
                                            src={item.src}
                                            alt={`Diagram ${index + 1}`}
                                            className={`w-full h-64 object-cover rounded-lg border ${currentTheme.imageBorder} ${currentTheme.imageShadow} transition-transform duration-300 hover:scale-105`}
                                            loading="lazy"
                                        />
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-black/30 to-transparent' : 'from-white/30 to-transparent'
                                                } rounded-md`}
                                        />
                                        {/* Hover Overlay with Key Points */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredImage === index ? 1 : 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className={`absolute inset-0 ${currentTheme.overlayBg} rounded-lg flex items-center justify-center p-6`}
                                        >
                                            <ul className={`text-lg ${currentTheme.overlayText} font-light`}>
                                                {item.keyPoints.map((point, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="font-bold">→</span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </div>
                                    {/* Description Card */}
                                    <div
                                        className={`w-full lg:w-1/2 ${currentTheme.descriptionCardBg} p-6 rounded-lg shadow-lg border ${currentTheme.descriptionCardBorder}`}
                                    >
                                        <h4 className={`text-xl font-semibold ${currentTheme.descriptionCardTitle} mb-3`}>
                                            Fig {index + 1}:
                                        </h4>
                                        <p className={`${currentTheme.descriptionCardText} text-lg leading-relaxed font-light`}>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Vertical Step Ladder Infographic for Wet Lab Flowchart */}
                    {flowchart && (
                        <div className="lg:w-1/2">
                            <div className="space-y-6">
                                {flowchart.steps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.2, ease: 'easeOut' }}
                                        className={`relative pl-10 ${currentTheme.flowchartBlockBg} ${currentTheme.flowchartBlockBorder} ${currentTheme.flowchartBlockHover} rounded-r-lg transition-all duration-300`}
                                        onMouseEnter={() => setHoveredFlowchartStep(index)}
                                        onMouseLeave={() => setHoveredFlowchartStep(null)}
                                    >
                                        {/* Connector Line */}
                                        {index < flowchart.steps.length - 1 && (
                                            <div className={`absolute left-3 top-14 h-12 w-1 ${currentTheme.flowchartConnector}`}></div>
                                        )}
                                        <div className="flex items-center gap-4 py-4">
                                            <div className={`${currentTheme.iconColor}`}>
                                                <Flask className="w-8 h-8" />
                                            </div>
                                            <h4 className={`text-xl font-semibold ${currentTheme.textPrimary}`}>{`Step ${index + 1}: ${step}`}</h4>
                                        </div>
                                        {/* Tooltip Overlay with Details */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: hoveredFlowchartStep === index ? 1 : 0, x: hoveredFlowchartStep === index ? 0 : -10 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className={`absolute top-0 left-64 ${currentTheme.flowchartTooltipBg} rounded-lg p-6 shadow-lg w-72 z-10`}
                                        >
                                            <p className={`${currentTheme.flowchartTooltipText} text-lg leading-relaxed font-light`}>{step}</p>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Research1: React.FC = () => {
    const [activeTab, setActiveTab] = useState('idea');
    const { theme } = useTheme();

    // Define theme-specific styles to match Home1.tsx for dark theme, replacing blue with neonRed
    const themeStyles = {
        dark: {
            sectionBg: 'bg-gradient-to-b from-black to-[#2A0000]', // Match Home1 dark background
            textPrimary: 'text-white', // Match Home1 primary text
            textSecondary: 'text-gray-400', // Match Home1 secondary text
            tabContainerBg: 'bg-black/50', // Match Home1 card background
            tabInactiveBg: 'hover:bg-gray-700', // Match Home1 hover effects
            tabInactiveText: 'text-gray-400', // Match Home1 secondary text
        },
        light: {
            sectionBg: 'bg-gray-50',
            textPrimary: 'text-gray-900',
            textSecondary: 'text-gray-600',
            tabContainerBg: 'bg-white',
            tabInactiveBg: 'hover:bg-gray-100',
            tabInactiveText: 'text-gray-600',
        },
    };

    const currentTheme = themeStyles[theme as keyof typeof themeStyles];

    const tabs = [
        {
            id: 'idea',
            label: 'Research Idea',
            icon: <Brain className="w-5 h-5" />,
        },
        {
            id: 'drylab',
            label: 'Dry Lab',
            icon: <Microscope className="w-5 h-5" />,
        },
        {
            id: 'wetlab',
            label: 'Wet Lab',
            icon: <Flask className="w-5 h-5" />,
        },
        {
            id: 'practices',
            label: 'Human Practices',
            icon: <Users className="w-5 h-5" />,
        },
    ];

    const sections = {
        idea: {
            title: 'TRACER',
            steps: [
                {
                    title: 'Continuous Monitoring',
                    description: 'Engineered cells patrol the bloodstream, providing ongoing surveillance to detect even subtle signs of cancer resurgence, ensuring timely response.',
                    icon: <Brain />,
                    keyPoints: ['Ongoing surveillance', 'Timely response'],
                },
                {
                    title: 'Targeted Detection',
                    description: 'Utilizes a CD147-specific receptor to identify cancer cells with high precision, enabling early detection of cancer relapse.',
                    icon: <MicroscopeIcon />,
                    keyPoints: ['CD147-specific receptor', 'High precision'],
                },
                {
                    title: 'SynNotch Circuit Integration',
                    description: 'Employs a synNotch circuit to trigger ApoA1 production upon detection, serving as a measurable biomarker for cancer presence.',
                    icon: <Dna />,
                    keyPoints: ['SynNotch circuit', 'ApoA1 biomarker'],
                },
                {
                    title: 'Therapeutic Delivery',
                    description: 'Produces anti-CD147 scFv antibodies upon activation, which tag cancer cells for neutralization.',
                    icon: <FlaskConical />,
                    keyPoints: ['Anti-CD147 scFv', 'Cancer cell neutralization'],
                },
                {
                    title: 'Spatially Resolved Detection',
                    description: 'By identifying molecular signals, the cells pinpoint tumor locations, allowing for precise and targeted medical interventions to improve treatment effectiveness.',
                    icon: <TestTube />,
                    keyPoints: ['Pinpoint tumor locations', 'Targeted interventions'],
                },
            ],
            icon: <Brain className="w-6 h-6" />,
            images: [
                {
                    src: '/assets/images/Detection.png',
                    description: 'Illustrates cancer detection via a CD147-specific receptor, showing ApoA1 and anti-CD147 scFv antibody production and release upon activation.',
                    keyPoints: ['CD147 receptor', 'ApoA1 production', 'scFv release'],
                },
                {
                    src: '/assets/images/Tagging.png',
                    description: 'Depicts cancer cell tagging and neutralization by scFv antibodies, highlighting the immune system’s role in targeting and eliminating cancer cells.',
                    keyPoints: ['scFv tagging', 'Immune system targeting'],
                },
            ],
        },
        drylab: {
            title: 'Dry Lab: Computational Research',
            steps: [
                {
                    title: 'Design Syn-Notch Receptor Circuit',
                    description: 'Design the Syn-Notch receptor construct in silico using SnapGene. Optimize the gene circuit for expression in a lentiviral backbone, ensuring compatibility with iGEM standards (RFC[10] or RFC[1000]).',
                    icon: <Code />,
                    keyPoints: ['In silico design', 'SnapGene', 'iGEM standards'],
                },
                {
                    title: 'In-Silico Validation of Syn-Notch Functionality',
                    description: 'Model the 3D structure of Syn-Notch using AlphaFold. Simulate docking of the CD147 ligand using HADDOCK. Perform molecular dynamics simulations to validate conformational changes and cleavage site exposure.',
                    icon: <MicroscopeIcon />,
                    keyPoints: ['AlphaFold modeling', 'HADDOCK docking', 'Molecular dynamics'],
                },
            ],
            icon: <Microscope className="w-6 h-6" />,
            images: [
                {
                    src: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&q=80',
                    description: 'Depicts computational modeling tools used for Syn-Notch receptor design and validation.',
                    keyPoints: ['Computational modeling', 'Syn-Notch validation'],
                },
            ],
        },
        wetlab: {
            title: 'Wet Lab: Experimental Research',
            steps: [
                {
                    title: 'Lentivirus Production',
                    description: 'Package the Syn-Notch construct into lentiviral particles using HEK293T cells. Concentrate and quantify the virus to determine optimal titer for transduction.',
                    icon: <Dna />,
                    keyPoints: ['Lentiviral packaging', 'HEK293T cells', 'Optimal titer'],
                },
                {
                    title: 'Generation of Stable Syn-Notch HEK293 Cell Lines',
                    description: 'Transduce HEK293 cells with the Syn-Notch lentivirus. Select stable cell populations using antibiotic resistance (e.g., puromycin). Validate Syn-Notch expression by qPCR and Western blot.',
                    icon: <Dna />,
                    keyPoints: ['Transduction', 'Antibiotic selection', 'qPCR validation'],
                },
                {
                    title: 'Activation of Syn-Notch Receptor',
                    description: 'Expose Syn-Notch stable cells to CD147-expressing target cells or plate-bound CD147 ligand. Measure reporter activation (GFP or luciferase) to confirm receptor function.',
                    icon: <TestTube />,
                    keyPoints: ['CD147 exposure', 'Reporter activation', 'GFP/luciferase'],
                },
                {
                    title: 'Production and Release of scFv',
                    description: 'Upon Syn-Notch activation, induce expression and secretion of scFv antibodies by the engineered cells. Collect supernatants and quantify scFv production using ELISA and confirm via Western blot.',
                    icon: <FlaskConical />,
                    keyPoints: ['scFv expression', 'ELISA quantification', 'Western blot'],
                },
                {
                    title: 'Validation of scFv Binding to Target Antigen',
                    description: 'Incubate scFv-containing supernatants with CD147-expressing cells. Confirm binding specificity and affinity using flow cytometry and ELISA. Optionally perform surface plasmon resonance (SPR) for detailed affinity measurements.',
                    icon: <MicroscopeIcon />,
                    keyPoints: ['Binding specificity', 'Flow cytometry', 'SPR analysis'],
                },
            ],
            icon: <Flask className="w-6 h-6" />,
            flowchart: {
                steps: [
                    'Produce Lentivirus Carrying Syn-Notch Circuit',
                    'Generate Stable Syn-Notch HEK293 Cell Lines',
                    'Activate Syn-Notch Cells with CD147 Ligand',
                    'Induce and Quantify scFv Antibody Secretion',
                    'Validate scFv Binding to Target Antigen',
                ],
            },
        },
        practices: {
            title: 'Human Practices',
            steps: [
                {
                    title: 'Stakeholder Engagement',
                    description: 'Engage with stakeholders to gather insights and ensure the project aligns with community needs and expectations.',
                    icon: <Users />,
                    keyPoints: ['Stakeholder insights', 'Community alignment'],
                },
                {
                    title: 'Ethical Considerations',
                    description: 'Address ethical concerns related to genetic engineering and ensure responsible development of TRACER technology.',
                    icon: <Brain />,
                    keyPoints: ['Ethical concerns', 'Responsible development'],
                },
                {
                    title: 'Community Outreach',
                    description: 'Conduct outreach programs to educate the public about synthetic biology and the potential impact of TRACER on cancer treatment.',
                    icon: <Users />,
                    keyPoints: ['Public education', 'Synthetic biology impact'],
                },
            ],
            icon: <Users className="w-6 h-6" />,
            images: [
                {
                    src: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80',
                    description: 'Represents community engagement and ethical discussions in the development of TRACER technology.',
                    keyPoints: ['Community engagement', 'Ethical discussions'],
                },
            ],
        },
    };

    return (
        <div className={`min-h-screen ${currentTheme.sectionBg} pt-24 pb-16 font-inter transition-colors duration-500`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className={`text-4xl md:text-5xl font-bold ${currentTheme.textPrimary} mb-4`}>
                        Our Research
                    </h1>
                    <p className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
                        Exploring innovative solutions for cancer relapse detection and therapy
                        through cutting-edge research and development.
                    </p>
                </motion.div>

                <div className={`${currentTheme.tabContainerBg} rounded-xl shadow-md p-2 mb-12 border border-gray-700`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id
                                    ? 'bg-neonRed text-white' // Changed from bg-blue-600 to bg-neonRed
                                    : `${currentTheme.tabInactiveBg} ${currentTheme.tabInactiveText}`
                                    }`}
                            >
                                {React.cloneElement(tab.icon, {
                                    className: `w-5 h-5 ${activeTab === tab.id ? 'text-white' : currentTheme.tabInactiveText}`,
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