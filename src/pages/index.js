import Hero from "@/section/hero/Hero";
import gsap from "gsap";
import Head from "next/head";
import { useEffect, useRef } from "react";

export default function Home() {
  const cursorRef = useRef(null);

  useEffect(() => {
    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      zIndex: 0,
      opacity: 0,
    });

    gsap.to(cursorRef.current, {
      zIndex: 1000,
      delay: 2,
      opacity: 1,
      duration: 1.5,
      delay: 2,
      ease: "power3.out"
    });


    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate mouse position relative to center
      const x = (clientX - innerWidth / 2) * 0.04;
      const y = (clientY - innerHeight / 2) * 0.04;

      // Move cursor mask
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 1,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursorRef.current, {
        width: 300,
        height: 300,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, {
        width: 100,
        height: 100,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    document.querySelectorAll("h1").forEach(element => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.querySelectorAll("h1").forEach(element => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title> ASTO</title>
      </Head>
      <div className="relative h-full w-full">
        <div
          ref={cursorRef}
          className="cursor-mask"
        />
        <Hero />
        <div className="h-[1000vh]">
          <div className="h-[100vh]" />
          <h1 className="text-white text-6xl font-RobotInvaders">Aswin</h1>
        </div>
      </div>
    </>
  );
}
