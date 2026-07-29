import { personalInfo } from '../data/portfolioData';

const About = () => {
  return (
    <section id="about" className="pt-28 pb-20 relative w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-[85rem] mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#e6f1ff] font-outfit tracking-tight">
            About Me
          </h2>
        </div>

        {/* Content Layout: Bio Text (No card/border) */}
        <div className="w-full flex flex-col justify-center space-y-8 text-[#8892b0] text-base md:text-lg lg:text-xl leading-relaxed font-sans text-left">
          <p className="text-[#e6f1ff] font-medium text-lg md:text-xl lg:text-2xl">
            Hello, I am Hanz Christian Angelo G. Magbal.
          </p>
          <p>
            I am currently a 4th-year student at the University of Southern Philippines Foundation, pursuing my Bachelor of Science in Information Technology. My academic journey has evolved into a deep, unwavering passion for technology—specifically the intersection of modern software engineering, Artificial Intelligence, and the Internet of Things (IoT).
          </p>
          <p>
            My drive to solve real-world problems has led me to build a diverse portfolio of production-ready systems. From architecting scalable, multi-tenant SaaS platforms like KlinikaHub and Medora, to engineering robust PWA enterprise resource systems like Realynk, I love creating software that makes an impact. 
          </p>
          <p>
            I also have a strong fascination with hardware and intelligent systems. I've integrated custom IoT sensors with real-time tracking for the G-TRASH smart waste platform, and I actively develop AI-driven applications—like Langor AI for real-time voice tutoring and the PAL JourneyPad for automated project planning using advanced LLMs.
          </p>
          <p>
            Beyond writing code and designing scalable cloud-native architectures, I believe in nurturing creativity in all its forms. When I am away from my keyboard, you can usually find me drawing or playing the guitar—creative outlets that keep me inspired and balanced. 
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
