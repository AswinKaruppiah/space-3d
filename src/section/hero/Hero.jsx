"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Spline from "@splinetool/react-spline";

export default function Hero() {
  const earth = useRef(null);
  const starBg = useRef(null);
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const earthAnimation = {
    duration: 2.5,
    ease: "power2.out",
  };

  const starAnimation = {
    duration: 1.5,
    ease: "power3.out",
  };

  useEffect(() => {
    // Animation configurations
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate mouse position relative to center
      const x = (clientX - innerWidth / 2) * 0.05;
      const y = (clientY - innerHeight / 2) * 0.05;

      // Apply animations
      bgXTo(x * -3); // Background moves slower and opposite
      bgYTo(y * -3);
      contentXTo(x * 5); // Content moves faster
      contentYTo(y * 5);
    };

    // GSAP quick animations
    const bgXTo = gsap.quickTo(earth.current, "x", earthAnimation);
    const bgYTo = gsap.quickTo(earth.current, "y", earthAnimation);
    const contentXTo = gsap.quickTo(starBg.current, "x", starAnimation);
    const contentYTo = gsap.quickTo(starBg.current, "y", starAnimation);

    const heading = headingRef.current;
    const text = heading.textContent;
    heading.textContent = "";

    const letters = text.split(/(\s+)/).map((word) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.style.display = "inline-block";
      span.style.marginRight = "10px";
      heading.appendChild(span);
      return span;
    });

    // Animate each letter
    gsap.fromTo(
      letters,
      {
        y: 100,
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        delay: 0.5,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }
    );

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        earth.current,
        {
          y: 200,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          delay: 1,
          ease: "power2.out",
        }
      );
    }
  }, [isVisible]);

  return (
    <div className="sp-hero-section">
      {/* Star Background */}
      <div className="sp-star-bg-img" ref={starBg} />

      {/* Header */}
      <nav className="w-full max-w-screen-2xl backdrop-blur-sm bg-transparent px-5 py-2">
        <h2>ASTO_</h2>
      </nav>

      {/* Main Content */}
      <div className="pt-40 w-full p-5 h-full">
        <h1 ref={headingRef}>Unlock the Infinite Space</h1>
      </div>

      {/* 3D Earth Model */}
      {isVisible && (
        <div className="h-screen w-screen text-5xl z-[5] relative font-RobotInvaders text-center">
          <h5>Loading Asset</h5>
        </div>
      )}
      <div
        ref={earth}
        className="absolute pointer-events-none top-[90vh] inset-0 origin-center left-0 h-full w-screen"
      >
        <Spline
          onLoad={() => setIsVisible(false)}
          scene="https://prod.spline.design/8XljPx8CoGV2Vbpf/scene.splinecode"
        />
      </div>
    </div>
  );
}
