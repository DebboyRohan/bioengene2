import { Linkedin, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Footer1 = () => {
  const { theme } = useTheme() as { theme: "dark" | "light" };
  const themeStyles = {
    dark: {
      footerBg: "bg-gradient-to-b from-[#2A0000] to-black",
      textPrimary: "text-white",
      textSecondary: "text-gray-400",
      border: "border-gray-800",
      iconColor: "text-gray-400",
      iconHoverColor: "hover:text-neonRed",
    },
    light: {
      footerBg: "bg-gray-100",
      textPrimary: "text-gray-900",
      textSecondary: "text-gray-600",
      border: "border-gray-300",
      iconColor: "text-gray-600",
      iconHoverColor: "hover:text-blue-600",
    },
  };
  const currentTheme = themeStyles[theme];

  return (
    <footer
      className={`${currentTheme.footerBg} py-8 font-inter transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3
                className={`text-xl font-semibold ${currentTheme.textPrimary}`}
              >
                TRACER
              </h3>
            </div>
            <p className={currentTheme.textSecondary}>
              Revolutionizing cancer relapse detection and therapy through
              synthetic biology.
            </p>
          </div>
          <div>
            <h3
              className={`text-xl font-semibold mb-4 ${currentTheme.textPrimary}`}
            >
              Contact Us
            </h3>
            <p className={currentTheme.textSecondary}>
              BioEnGene, Department of Bioscience & Biotechnology
              <br />
              Indian Institute of Technology Kharagpur
              <br />
              Kharagpur, India - 721302
              <br />
              Email: bioengene@iitkgp.ac.in
            </p>
          </div>
          <div>
            <h3
              className={`text-xl font-semibold mb-4 ${currentTheme.textPrimary}`}
            >
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/bioengene/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${currentTheme.iconColor} ${currentTheme.iconHoverColor} transition-colors`}
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:bioengene@iitkgp.ac.in"
                className={`${currentTheme.iconColor} ${currentTheme.iconHoverColor} transition-colors`}
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/tracer/home">
                <img
                  src="/assets/images/Tracer.png"
                  alt="Tracer-logo"
                  className="w-24 h-24 object-contain"
                />
              </a>
              <a
                href="https://www.iitkgp.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/kgplogo.jpg"
                  alt="iit-kgp-logo"
                  className="w-20 h-20 object-contain"
                />
              </a>
              <a
                href="https://bioengene.iitkgp.ac.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/Bioengene.png"
                  alt="Bioengene-logo"
                  className="w-30 h-30 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
        <div
          className={`mt-8 pt-8 border-t ${currentTheme.border} text-center ${currentTheme.textSecondary}`}
        >
          <p>
            © {new Date().getFullYear()} TRACER - iGEM IIT Kharagpur. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
