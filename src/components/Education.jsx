import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const { t, i18n } = useTranslation();

  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const fillRef = useRef(null);
  const slidesRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    const fill = fillRef.current;
    const slides = slidesRef.current?.children;

    if (!section || !list || !fill || !slides) return;

    const listItems = list.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${listItems.length * 50}%`,
        pin: true,
        scrub: true,
        markers: false
      }
    });

    gsap.set(fill, { scaleY: 0 });

    Array.from(listItems).forEach((item, j) => {
      if (j > 0) {
        tl.set(item, { color: "#FF26B7" }, 0.5 * j)
          .to(slides[j], { autoAlpha: 1, display: "block", duration: 0.2 }, "<")
          .set(listItems[j - 1], { color: "#8E8E8E" }, "<")
          .to(slides[j - 1], { autoAlpha: 0, display: "none", duration: 0.2 }, "<");
      } else {
        tl.set(item, { color: "#FF26B7" }, 0.01)
          .to(slides[j], { autoAlpha: 1, display: "block", duration: 0.2 }, "<");
      }
    });

    tl.to(fill, {
      scaleY: 1,
      transformOrigin: "top left",
      ease: "none",
      duration: tl.duration() 
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [i18n.language]);

  return (
    <section
      ref={sectionRef}
      className="flex justify-center items-center h-[90vh] px-4 md:px-24 lg:px-48 xl:px-62 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl w-full flex items-center">
        <div className="relative flex items-center">
          <div ref={fillRef} className="absolute left-0 top-0 w-[4px] h-full bg-[#FF26B7]" />
          
          <ul ref={listRef} className="ml-6 text-[16px] sm:text-[18px] md:text-[20px] list-none space-y-6">
            {["education_title", "experience_title", "skills_title", "knowledge_title", "language_title"].map((key, i) => (
              <li key={i}>{t(`education.${key}`)}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex-grow item pl-20 pb-40 pr-70" ref={slidesRef}>
          {["degree", "experience", "skills", "webdev", "languages"].map((key, i) => (
            <div key={i} className="slide absolute opacity-0 hidden text-[18px] sm:text-[20px] md:text-[22px]">
              <div className="space-y-1">
                <h2 className="text-gray-700 ">{t(`education.${key}.title`)}</h2>
                <p className="text-gray-500 mb-5">{t(`education.${key}.description`)}</p>
                {key === "degree" && (
                  <>
                    <h2 className="text-gray-700 ">{t(`education.${key}.title1`)}</h2>
                    <p className="text-gray-500  mb-5">{t(`education.${key}.description1`)}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
