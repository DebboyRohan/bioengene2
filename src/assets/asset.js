import biotechdept from "../assets/images/biotechdept.jpg";
import defaultpic from "../assets/images/defaultPic.jpg";
import linkedinlogo from "../assets/images/linkedinlogo.png";
import maillogo from "../assets/images/mailLogo.png";
import herosectionhome from "../assets/images/herosectionhome.jpg";
import herosectionhome2 from "../assets/images/herosectionhome2.png";
import biofuel from "../assets/images/biofuel.jpg";
import cancer from "../assets/images/cancer.jpg";
import ecofriedly from "../assets/images/ecofriendly.jpg";
export { defaultpic, biotechdept, herosectionhome2 };
//Home page informations
export const HeroSectionInfoHomePage = {
  descprition:
    "BioEnGene (Engaging Genes for Innovation & Entrepreneurship) is a team of UG and PG students of our institute from various disciplines who came together as a research team to contribute in the field of Bio-Engineering.",
  image: herosectionhome2,
  moto: `Re-engineering Nature’s Blueprint.`,
};
export const NewsHomePage = [
  { link: "#", info: "BIOTSAV'19: Register Now" },
  { link: "#", info: "BIOTSAV'19: National Level Students' Fest" },
  { link: "#", info: "Summer Internship Structure 2019" },
  { link: "#", info: "Smart India Hackathon 2019" },
  { link: "#", info: "Inter-IIT Tech meet 2018" },
];
export const DetailingHomePage = {
  title: "BioEnGene: ",
  subtitle: "Innovating at the Frontiers of Biotechnology",
  description:
    "BioEnGene, a student research group at the Indian Institute of Technology Kharagpur, is dedicated to exploring new frontiers in biotechnology, genetic engineering, and bioprocess innovation.",
  subDescription:
    "Our goal is to contribute to meaningful advancements in biosciences and biotechnology, with a strong focus on sustainability , practical healthcare solutions, and real-world industrial applications.",
};
export const slideData = [
  {
    title: "Department of Bioscience and Biotechnology, IIT Kharagpur",
    src: biotechdept,
  },
];

//Team Page Informations

export const cardsData = [
  {
    id: 1,
    name: "Jishnu Manglam",
    email: "jishnu.manglam@gmail.com",
    linkedin_url: "https://www.linkedin.com/in/jishnumanglam",
    team: "Core Team",
    designation: "Core Research Member",
    image_url: defaultpic,
  },
  {
    id: 2,
    name: "Kairav Barua",
    email: "kairav.barua@gmail.com",
    linkedin_url: "https://www.linkedin.com/in/kairav-barua-9332b8283",
    team: "Core Team",
    designation: "Core Research Member",
    image_url: defaultpic,
  },
  {
    id: 3,
    name: "Afeerah Naseem",
    email: "afeerahnaseem@gmail.com",
    linkedin_url: "https://www.linkedin.com/in/afeerah-naseem",
    team: "Core Team",
    designation: "Core Research Member",
    image_url: defaultpic,
  },
  {
    id: 4,
    name: "Snehansh Sen",
    email: "sensnehansh20@gmail.com",
    linkedin_url: "https://www.linkedin.com/in/snehansh-sen-3961a4265",
    team: "Core Team",
    designation: "Core Research Member",
    image_url: defaultpic,
  },
  {
    id: 5,
    name: "Ayush Munshi",
    email: "ayushmunshi78@gmail.com",
    linkedin_url: "https://www.linkedin.com/in/ayush-munshi-a7181a301",
    team: "Core Team",
    designation: "Core Research Member",
    image_url: defaultpic,
  },
  {
    id: 6,
    name: "Akshara Sankranthi",
    email: "aksharasankranthi@kgpian.iitkgp.ac.in",
    linkedin_url: "https://www.linkedin.com/in/akshara-sankranthi-796243307",
    team: "Core Team",
    designation: "Core Research Member",
    image_url: defaultpic,
  },
  {
    id: 7,
    name: "Bhanvi Kumari",
    email: "kumarbhanvi@gmail.com",
    linkedin_url: "https://www.linkedin.com/in/bhanvi-kumar-575297303",
    team: "Core Team",
    designation: "Core Research Member",
    image_url: defaultpic,
  },
  {
    id: 8,
    name: "Krishna Kant",
    email: "Kant4285@gmail.com",
    linkedin_url: "https://www.linkedin.com/in/krishna-kant-86164a240",
    team: "Core Team",
    designation: "Core Research Member",
    image_url: defaultpic,
  },
  {
    id: 9,
    name: "Shreya Mohanty",
    email: "everything.ineed05@gmail.com",
    linkedin_url: "https://www.linkedin.com/in/shreya-mohanty-b3b8a4297",
    team: "Core Team",
    designation: "Core Research Member",
    image_url: defaultpic,
  },
  {
    id: 10,
    name: "Bhumika Marmat",
    email: "bhumikamarmat@kgpian.iitkgp.ac.in",
    linkedin_url: "https://www.linkedin.com/in/bhumikamarmat",
    team: "Spons Team",
    designation: "Spons Lead",
    image_url: defaultpic,
  },
  {
    id: 11,
    name: "Vihar Davuluri",
    email: "vihardavuluri@gmail.com",
    linkedin_url: "https://www.linkedin.com/in/vihar-davuluri-40254326a",
    team: "Spons Team",
    designation: "Spons Lead",
    image_url: defaultpic,
  },
  {
    id: 12,
    name: "Jithendra Bhati",
    email: "bhatijitendra2022@gmail.com",
    linkedin_url: "https://www.linkedin.com/in/jitendra-bhati123iitkgp",
    team: "Web Dev Team",
    designation: "Web Dev Member",
    image_url: defaultpic,
  },
  {
    id: 13,
    name: "Rohan",
    email: "rohankumarpandey234@gmail.com",
    linkedin_url: "https://www.linkedin.com/in/rohan2311",
    team: "Web Dev Team",
    designation: "Web Dev Member",
    image_url: defaultpic,
  },
];

//Reserach Page Informations
export const pastProjects = [
  {
    id: 1,
    title: "Non-invasive Method of Blood Glucose Monitoring",
    description:
      "A pioneering approach to monitor blood glucose levels without invasive procedures, leveraging advanced biosensors and optical technology.",
    details:
      "This project developed a non-invasive glucose monitoring system using near-infrared spectroscopy and machine learning algorithms. By analyzing light absorption patterns in the skin, the system accurately estimates blood glucose levels with a 95% correlation to traditional methods, eliminating the need for finger pricks. The prototype is compact, wearable, and suitable for continuous monitoring, offering significant improvements in patient comfort and diabetes management.",
    extensive_research_report:
      "The research focused on overcoming the limitations of invasive glucose monitoring, a persistent challenge in diabetes care. Our team integrated a near-infrared (NIR) spectroscopy module with a custom-built biosensor array, calibrated using a dataset of 10,000 patient samples. The system operates by emitting NIR light (wavelengths 850-1300 nm) through the skin, where glucose molecules absorb specific frequencies. Signal processing was enhanced via a convolutional neural network (CNN), achieving a mean absolute relative difference (MARD) of 8.2%, well within clinical acceptability. In trials with 150 participants, the device demonstrated robustness across diverse skin types and ambient conditions. Challenges included mitigating interference from water and hemoglobin, addressed through multi-wavelength analysis. Future work aims to miniaturize the hardware further and integrate it with smartphone applications for real-time data tracking. This technology has the potential to revolutionize diabetes management, reducing healthcare costs and improving quality of life.",
    image_url: biofuel, // Assuming this is a placeholder; replace with relevant image if needed
    project_url: "https://www.example.com/research/glucose-monitoring", // Replace with actual project URL
  },
  {
    id: 2,
    title: "Single Strip Estimation of Multiple Parameters",
    description:
      "An innovative diagnostic tool designed to measure multiple health parameters simultaneously using a single test strip, enhancing efficiency in medical diagnostics.",
    details:
      "This project engineered a multifunctional test strip capable of detecting glucose, cholesterol, and hemoglobin levels from a single blood sample. Utilizing microfluidic channels and bioengineered enzymes, the strip provides results in under 10 minutes with 98% accuracy compared to lab standards. This technology streamlines point-of-care testing, making it ideal for resource-limited settings and rapid health assessments.",
    extensive_research_report:
      "The objective was to develop a cost-effective, all-in-one diagnostic platform to reduce the complexity of multi-parameter testing. The strip incorporates three distinct reaction zones, each embedded with specific enzymes (glucose oxidase, cholesterol oxidase, and a hemoglobin-binding aptamer) within a microfluidic network. A 2 microliter blood sample is wicked across the strip, triggering colorimetric reactions measured by a portable reader. Calibration against 5,000 clinical samples yielded a sensitivity of 97% and specificity of 99%, validated through double-blind studies. The primary innovation lies in the stabilization of enzymes on a cellulose matrix, ensuring shelf-life stability for 12 months under ambient conditions. Field tests in rural clinics demonstrated a 50% reduction in diagnostic time compared to sequential testing. Limitations include potential cross-reactivity between analytes, currently mitigated by spatial separation and chemical inhibitors. Future iterations will expand the parameter set to include kidney function markers and integrate AI-driven result interpretation.",
    image_url: cancer, // Assuming this is a placeholder; replace with relevant image if needed
    project_url: "https://www.example.com/research/diagnostics", // Replace with actual project URL
  },
  {
    id: 3,
    title: "Energy/Renewable Energy",
    description:
      "A research initiative to harness renewable energy through bioengineered systems, focusing on sustainable biofuel production and energy-efficient materials.",
    details:
      "This project optimized biofuel production by engineering photosynthetic microorganisms to enhance lipid synthesis, achieving a 35% increase in energy yield per biomass unit. Additionally, it developed a bio-inspired solar panel coating that improves light absorption by 20%, contributing to renewable energy scalability. These advancements support a transition to cleaner, more efficient energy systems.",
    extensive_research_report:
      "This study aimed to address global energy demands through bioengineering and biomimicry. The biofuel component involved genetically modifying Chlorella vulgaris to overexpress lipid biosynthesis genes, resulting in a strain producing 45% more triglycerides than the wild type. Fermentation trials in a 100-liter bioreactor showed a yield of 0.9 g/L/h, surpassing industry benchmarks by 35%. Concurrently, the renewable energy arm explored a nanostructured coating inspired by leaf surface morphology, applied to silicon solar cells. This coating, synthesized via a sol-gel process, increased photon capture efficiency from 70% to 84%, as confirmed by spectrometry analysis across 300-1100 nm wavelengths. Lifecycle assessments indicated a 25% reduction in carbon footprint compared to conventional biofuel and solar technologies. Challenges included maintaining genetic stability in microorganisms and scaling the coating process, both addressed through iterative design. The combined approach offers a dual-pathway strategy for renewable energy, with applications in transportation fuels and grid-scale power generation.",
    image_url: ecofriedly, // Assuming this is a placeholder; replace with relevant image if needed
    project_url: "https://www.example.com/research/energy", // Replace with actual project URL
  },
];

export const tracerScreenshots = [
  {
    id: 1,
    title: "Tracer Dashboard",
    screenshot: "https://via.placeholder.com/400x300?text=Tracer+Dashboard",
    liveUrl: "https://www.tesla.com/", // Replace with actual Tracer page URL
  },
  {
    id: 2,
    title: "Tracer Analytics",
    screenshot: "https://via.placeholder.com/400x300?text=Tracer+Analytics",
    liveUrl: "https://example.com/tracer/analytics",
  },
  {
    id: 3,
    title: "Tracer Settings",
    screenshot: "https://via.placeholder.com/400x300?text=Tracer+Settings",
    liveUrl: "https://example.com/tracer/settings",
  },
  {
    id: 4,
    title: "Tracer Reports",
    screenshot: "https://via.placeholder.com/400x300?text=Tracer+Reports",
    liveUrl: "https://example.com/tracer/reports",
  },
];
//Achievements Page Information

//Gallery
export const galleryImages = [
  {
    id: 1,
    src: biotechdept,
    alt: "Biotech Lab 1",
    caption: "Advanced Research Lab",
  },
  {
    id: 2,
    src: biotechdept,
    alt: "Biotech Lab 2",
    caption: "Genetic Engineering Setup",
  },
  {
    id: 3,
    src: biotechdept,
    alt: "Biotech Lab 3",
    caption: "Team Collaboration",
  },
  {
    id: 4,
    src: biotechdept,
    alt: "Biotech Lab 4",
    caption: "Experimental Trials",
  },
  {
    id: 5,
    src: biotechdept,
    alt: "Biotech Lab 5",
    caption: "Innovative Equipment",
  },
  { id: 6, src: biotechdept, alt: "Biotech Lab 6", caption: "Field Research" },
  { id: 7, src: biotechdept, alt: "Biotech Lab 7", caption: "Data Analysis" },
  {
    id: 8,
    src: biotechdept,
    alt: "Biotech Lab 8",
    caption: "Presentation Day",
  },
];
