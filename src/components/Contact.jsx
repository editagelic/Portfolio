import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation(); // Hook za prijevod

  const emojisRef = useRef([]);
  const circleRef = useRef(null);

  useEffect(() => {
    gsap.set(emojisRef.current, { y: "100vh", opacity: 0, scale: 0.5 });

    gsap.to(circleRef.current, {
      y: "20px",
      x: "-50px",
      scale: 1.7,
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  const handleHover = () => {
    gsap.to(emojisRef.current, {
      y: "-120vh",
      opacity: 1,
      scale: 1,
      duration: 3,
      stagger: 0.2,
      ease: "power2.out",
    });
  };

  const handleHoverOut = () => {
    gsap.to(emojisRef.current, {
      y: "100vh",
      opacity: 0,
      scale: 0.5,
      duration: 1,
      stagger: 0.2,
      ease: "power2.in",
    });
  };

  const handleClick = () => {
    window.location.href = "mailto:editagelic7@email.com?subject=Hello!";
  };

  return (
    <footer className="w-full min-h-screen bg-[#230018] flex flex-col justify-between px-4 md:px-24 lg:px-48 xl:px-62 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none">
        {Array.from({ length: 20 }).map((_, index) => (
          <span
            key={index}
            ref={(el) => (emojisRef.current[index] = el)}
            className="absolute text-5xl"
            style={{
              left: `${Math.random() * 100}vw`,
            }}
          >
            👋
          </span>
        ))}
      </div>

      <div className="absolute right-0 top-0 mt-30 h-full z-0 flex items-center">
        <div
          ref={circleRef}
          className="w-[300px] h-[70vh] bg-[#FF26B7] rounded-l-[50%] blur-[150px] transform -translate-x-2"
        ></div>
      </div>

      <div className="max-w-7xl w-full flex flex-col justify-center items-start flex-grow">
        <h2 className="text-white text-xl font-medium mb-4">{t("contact.title")}</h2>
        <button
          className="border border-[#FF26B7] text-[#FF26B7] hover:bg-[#FF26B7] hover:text-[#2b001e] px-6 py-2 rounded-full text-xl flex items-center gap-2 transition"
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOut}
          onClick={handleClick}
        >
          {t("contact.button")}
        </button>
      </div>
    </footer>
  );
};

export default Contact;
