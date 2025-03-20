import React, { useRef, useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { t, i18n } = useTranslation();
  const [langKey, setLangKey] = useState(i18n.language);
  const containerRef = useRef(null);
  const projectsRef = useRef(null);
  const exitAnimationRef = useRef(null);

  // Pratimo promjene jezika
  useEffect(() => {
    const updateLangKey = () => setLangKey(i18n.language);
    i18n.on('languageChanged', updateLangKey);
    return () => i18n.off('languageChanged', updateLangKey);
  }, [i18n]);

  // Memoiziramo projekte
  const projects = useMemo(() => [
    { id: 1, title: t("projects.weather.title"), description: t("projects.weather.description"), link: "https://github.com/editagelic/Weather-app", image: "/assets/images/Weather.png" },
    { id: 2, title: t("projects.crud.title"), description: t("projects.crud.description"), link: "https://crud-app-zavrsni-rad.netlify.app/#/", image: "/assets/images/CRUD.png" },
    { id: 3, title: t("projects.calculator.title"), description: t("projects.calculator.description"), link: "https://github.com/editagelic/Calculator", image: "/assets/images/Calculator.png" },
    { id: 4, title: t("projects.portfolio.title"), description: t("projects.portfolio.description"), link: "https://github.com/editagelic/Project", image: "/assets/images/Portfolio.png" },
    { id: 5, title: t("projects.airapp.title"), description: t("projects.airapp.description"), link: "https://github.com/editagelic/AirApp", image: "/assets/images/Airport.png" },
    { id: 6, title: t("projects.cocktail.title"), description: t("projects.cocktail.description"), link: "https://github.com/editagelic/Cocktail", image: "/assets/images/Coctail.png" },
  ], [t]);

  // Glavna animacija
  useEffect(() => {
    const section = containerRef.current;
    const projectsWrapper = projectsRef.current;

    if (!section || !projectsWrapper) return;

    const containerWidth = section.offsetWidth;
    const projectsWidth = projectsWrapper.scrollWidth;
    const paddingRight = containerWidth * 0.4;

    const scrollTween = gsap.to(projectsWrapper, {
      x: () => -(projectsWrapper.scrollWidth - containerWidth + paddingRight),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true, // Ključna postavka za horizontalni scroll
        scrub: 1,
        start: "top top",
        end: () => `+=${projectsWrapper.scrollWidth + paddingRight}`,
        invalidateOnRefresh: true
      }
    });

    const exitTween = gsap.to(exitAnimationRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      scrollTrigger: {
        trigger: exitAnimationRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: true
      }
    });

    return () => {
      scrollTween?.kill();
      exitTween?.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [langKey]);

  // Dodatno osvježavanje GSAP-a
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      gsap.globalTimeline.invalidate();
      gsap.to(window, { duration: 0 });
    }, 200);
    
    return () => clearTimeout(timer);
  }, [langKey]);

  return (
    <section 
      className="w-full h-[100vh] bg-[#4A0031] overflow-hidden py-16 px-4 md:px-24 lg:px-48 xl:px-62" 
      ref={containerRef}
    >
      <div className="projects-container mx-auto max-w-7xl w-full ">
        <h2 className="text-white text-[20px] text-start py-20">{t("projects.title")}</h2>

        <div 
  ref={projectsRef} 
  className="flex flex-nowrap space-x-12 md:space-x-16 pb-16 pr-[5%]"  // Smanjenje paddinga na velikim ekranima
  key={langKey}
>
  {projects.map((project) => (
    <div 
      key={project.id} 
      className="project flex-shrink-0 flex-grow-0 flex items-center max-w-4xl min-w-[500px] bg-[#2b001e] rounded-lg p-6 md:p-8 shadow-lg gap-6 md:gap-8 border-2 border-transparent transition-all duration-300 hover:bg-[#230018] hover:border-[#FF26B7]"
    >
      <div className="w-1/2 flex flex-col text-white h-full pt-[64px] pl-[64px] pb-[64px]">
        <h3 className="text-[32px]">{project.title}</h3>
        <p className="text-white opacity-50 text-lg mt-2 mb-40">{project.description}</p>
        <a 
          href={project.link} 
          className="mt-4 w-fit px-5 py-2 text-xl border border-[#FF26B7] text-[#FF26B7] rounded-full hover:bg-[#FF26B7] hover:text-[#2b001e] transition"
        >
          {t("projects.button")}
        </a>
      </div>
      <div className="w-1/2 flex justify-center pt-[64px] pr-[64px] pb-[64px]">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full max-w-xs sm:max-w-sm h-auto rounded-lg shadow-lg" 
          loading="lazy"
        />
      </div>
    </div>
  ))}


        </div>
      </div>
    </section>
  );
};

export default Projects;
