import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(TextPlugin);
gsap.defaults({ ease: 'none' });

const Hero = () => {
  const { t } = useTranslation();
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Resetiranje animacije svaki put kad se promijeni jezik
    tl.clear();

    tl.to(textRef.current, {
      duration: 0.5,
      text: t('hero.intro'),
    })
      .to(nameRef.current, {
        duration: 0.5,
        text: ` ${t('hero.name')}`,
      })
      .to(paragraphRef.current, {
        opacity: 1,
        y: -10,
        duration: 2,
        delay: 1,
        ease: 'power2.out',
      }, '-=0.1');
  }, [t]); // GSAP će se ažurirati kada se jezik promijeni

  return (
    <section className="flex justify-center items-center h-[90vh] px-4 md:px-24 lg:px-48 xl:px-62 bg-white dark:bg-gray-900">
      <div className="text-left max-w-7xl w-full pt-50" key={t('hero.intro')}>
        <h1 className="text-3xl md:text-[40px] lg:text-[40px] xl:text-5xl mb-8 leading-tight">
          <span ref={textRef}></span>
          <span ref={nameRef} className="text-[#FF26B7]"></span>
        </h1>
        <p ref={paragraphRef} className="text-base md:text-[25px] lg:text-[25px] leading-relaxed opacity-0">
          {t('hero.description')}
        </p>
      </div>
    </section>
  );
};

export default Hero;
