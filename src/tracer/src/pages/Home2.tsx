// Home2.tsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Target, Timer, BarChart as ChartBar, ChevronDown, AlertCircle, Shield, Bell, AlertTriangle, Heart } from 'lucide-react';
import gsap from 'gsap';
import CountUp from 'react-countup';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

// Theme configuration
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
        gradientOverlay: 'bg-gradient-to-b from-black/70 via-black/50 to-black/70',
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
        gradientOverlay: 'bg-gradient-to-b from-white/70 via-white/50 to-white/70',
        timelineLine: 'bg-gradient-to-b from-blue-600 to-purple-600',
    },
};

// Timeline Node Component
const TimelineNode = ({ title, description, icon, image, isLeft, theme, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }} // Trigger earlier to avoid abrupt appearance
            transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeInOut' }} // Smoother easing
            className={`relative flex items-center mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'} w-full will-change-transform`} // Optimize rendering
        >
            {/* Node Content */}
            <div className={`w-1/2 ${isLeft ? 'pr-8' : 'pl-8'} flex flex-col items-${isLeft ? 'end' : 'start'} text-${isLeft ? 'right' : 'left'}`}>
                <div className="flex items-center gap-4 mb-4">
                    <div className={`${theme.neonRed}`}>
                        {React.cloneElement(icon, { className: 'w-8 h-8' })}
                    </div>
                    <h4 className={`text-xl md:text-2xl font-semibold ${theme.text}`}>{title}</h4>
                </div>
                <p className={`text-lg ${theme.secondaryText} leading-relaxed`}>{description}</p>
            </div>
            {/* Image */}
            <div className={`w-1/2 ${isLeft ? 'pl-8' : 'pr-8'}`}>
                <motion.div
                    className="relative timeline-image"
                    whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${theme.shadowRed}` }} // Smoother hover with shadow
                    transition={{ duration: 0.4, ease: 'easeInOut' }} // Smoother transition
                >
                    <img
                        src={image}
                        alt={title}
                        className={`w-full h-64 object-cover rounded-lg border ${theme.border}`}
                        style={{ boxShadow: `0 0 20px ${theme.shadowRed}` }}
                        loading="lazy" // Optimize image loading
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-black/30 to-transparent' : 'from-white/30 to-transparent'} rounded-lg`} />
                </motion.div>
            </div>
            {/* Timeline Node Marker */}
            <div className={`absolute top-1/2 transform -translate-y-1/2 ${isLeft ? 'right-0' : 'left-0'} w-6 h-6 rounded-full ${theme.neonRed} z-10`} />
        </motion.div>
    );
};

// Statistic Component with Infographic Style
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

const Home2 = () => {
    const heroRef = useRef(null);
    const heroImageRef = useRef(null); // Ref for hero image
    const contentRefs = useRef([]);
    const navigate = useNavigate();
    const { theme } = useTheme();

    useEffect(() => {
        // Smooth Section Animations
        const sections = contentRefs.current.filter(Boolean);
        sections.forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out', // Smoother easing
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 90%', // Start earlier for smoother transition
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse',
                        scrub: 0.2, // Slight scrub for natural feel
                    },
                }
            );
        });

        // Hero Image Shadow-Like Fade
        const heroImage = heroImageRef.current;
        if (heroImage) {
            gsap.to(heroImage, {
                opacity: 0.3, // Fade to a shadow-like opacity
                boxShadow: '0 0 50px rgba(0, 0, 0, 0.8)', // Add shadow effect
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true, // Smoothly fade with scroll
                },
            });
        } else {
            console.warn('Hero image element not found for GSAP animation.');
        }

        // Parallax Effect for Hero Image
        if (heroImage) {
            gsap.to(heroImage, {
                yPercent: 30, // Reduced for smoother effect
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1, // Smoother parallax
                },
            });
        }

        // Parallax Effect for Timeline Images
        const timelineImages = document.querySelectorAll('.timeline-image');
        timelineImages.forEach((image) => {
            gsap.to(image, {
                yPercent: 15, // Reduced for smoother effect
                ease: 'none',
                scrollTrigger: {
                    trigger: image,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1, // Smoother parallax
                },
            });
        });
    }, []);

    const currentTheme = themes[theme];

    const storySegments = [
        {
            title: 'A Shattering Diagnosis',
            description: (
                <>
                    Imagine hearing the word <span className={`text-2xl font-bold ${currentTheme.neonRed}`}>Cancer</span>. For millions, it’s a moment that changes everything—a verdict that brings fear, uncertainty, and a fight for survival.
                </>
            ),
            icon: <AlertCircle />,
            image: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/02/04/12/cancer_REX.jpg',
        },
        {
            title: 'The Battle Begins',
            description: (
                <>
                    Days turn into a blur of treatments, hospital visits, and emotional exhaustion. Yet, through resilience and hope, patients push forward. They endure. They <span className={`text-2xl font-bold ${currentTheme.neonPurple}`}>Survive</span>.
                </>
            ),
            icon: <Shield />,
            image: 'https://i0.wp.com/www.capitalradiomalawi.com/wp-content/uploads/2024/02/cancer.jpg?fit=1000%2C657&ssl=1',
        },
        {
            title: 'A Glimmer of Hope',
            description: (
                <>
                    Then comes the moment of <span className={`text-2xl font-bold ${currentTheme.neonOrange}`}>Remission</span>. The bell rings, signaling the end of treatment. A fragile normalcy returns, and with it, the daring hope for a life beyond cancer.
                </>
            ),
            icon: <Bell />,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf5_2KPGvrxhNyFCGP8XxXg00EHAuocULYbA&s',
        },
        {
            title: 'The Silent Return',
            description: (
                <>
                    But for many, the story doesn’t end there. <span className={`text-2xl font-bold ${currentTheme.neonRed}`}>Cancer</span> returns—silent, swift, and relentless—shattering the hope that had just begun to take root.
                </>
            ),
            icon: <AlertTriangle />,
            image: 'https://www.carti.com/app/uploads/2024/03/CAR-2401-006-Blogs-ARStyle-Makhoul-1024x597.jpg',
        },
        {
            title: 'The Reality of Relapse',
            description: (
                <>
                    <span className={`text-2xl font-bold ${currentTheme.neonRed}`}>Cancer Relapse</span> strikes when least expected. Hidden cells, undetected for months or years, begin to grow again, often more aggressive and harder to treat.
                </>
            ),
            icon: <Heart />,
            image: 'https://www.denvaxindia.com/blog/wp-content/uploads/2024/04/Cancer-Relapse.jpg',
        },
        {
            title: 'A Daunting Fight',
            description: (
                <>
                    Relapse pulls patients back into uncertainty. Treatments that once worked may fail. Options dwindle. Time becomes the most precious commodity. The battle is now <span className={`text-2xl font-bold ${currentTheme.neonPurple}`}>Harder</span> than ever.
                </>
            ),
            icon: <AlertCircle />,
            image: 'https://res.cloudinary.com/dmajhtvmd/image/upload/c_scale/f_auto/dpr_auto/remote/uploads/movement_banner/image/58ebc1118bdfee3844000f9f/58ebc1118bdfee3844000f9f_c487ba770e2cc49abee8.jpg',
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
            {/* Hero Section */}
            <div
                ref={heroRef}
                className={`hero-section relative min-h-screen flex items-center justify-center overflow-hidden ${theme === 'dark' ? currentTheme.background : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}
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
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                        <h1
                            className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${theme === 'dark' ? currentTheme.text : 'text-white'}`}
                        >
                            <span className={theme === 'dark' ? 'bg-clip-text text-transparent bg-gradient-to-r from-neonRed to-neonPurple' : 'text-blue-500'}>TRACER</span>: What does <span className={theme === 'dark' ? 'text-neonRed' : 'text-blue-500'}>Hope</span> mean to you?
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
                    </motion.div>
                </div>
                <motion.div
                    className="absolute bottom-10 z-10"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                    <ChevronDown className={`w-8 h-8 ${currentTheme.text}`} />
                </motion.div>
            </div>

            {/* Story Timeline Section */}
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
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${currentTheme.timelineLine}`} />
                        {/* Timeline Nodes */}
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
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Relapse Statistics Section */}
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
                                src="https://via.placeholder.com/600x400?text=Relapse+Cycle"
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

            {/* TRACER Solution Section */}
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
                        At the intersection of despair and determination, <span className={`text-2xl font-bold ${currentTheme.neonRed}`}>TRACER</span> emerges as a beacon of hope—a cell-based theragnostic platform that detects and responds to cancer relapse in real time.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
                        className={`text-lg md:text-xl ${currentTheme.secondaryText} text-center max-w-3xl mx-auto mb-12 leading-relaxed`}
                    >
                        Imagine a system that tirelessly patrols the body, catching the earliest whispers of recurrence and acting swiftly to slow its spread. That’s the promise of <span className={`text-2xl font-bold ${currentTheme.neonRed}`}>TRACER</span>.
                    </motion.p>

                    {/* TRACER Process Timeline */}
                    <div className="relative">
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${currentTheme.timelineLine}`} />
                        {tracerSteps.map((step, index) => (
                            <TimelineNode
                                key={index}
                                title={step.title}
                                description={step.description}
                                icon={step.icon}
                                image={step.image}
                                isLeft={index % 2 === 0}
                                theme={currentTheme}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div ref={(el) => (contentRefs.current[3] = el)} className="py-20">
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
                        Discover how <span className={`text-2xl font-bold ${currentTheme.neonRed}`}>TRACER</span> is redefining cancer care with early detection and targeted response.
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

export default Home2;