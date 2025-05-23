"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Spline from "@splinetool/react-spline";

export default function Hero() {
  const earth = useRef(null);
  const starBg = useRef(null);
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const navRef = useRef(null);
  const [earthAnimationComplete, setEarthAnimationComplete] = useState(false);

  const earthAnimation = {
    duration: 2.5,
    ease: "power2.out",
  };

  const starAnimation = {
    duration: 1.5,
    ease: "power3.out",
  };

  useEffect(() => {
    // Initial state setup
    gsap.set([navRef.current, starBg.current], { opacity: 0 });

    // Animation timeline
    const tl = gsap.timeline();

    // Sequence of animations
    tl.to(navRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      delay: 0.5
    })
      .to(starBg.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      })
  }, []);

  useEffect(() => {
    // Animation configurations
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate mouse position relative to center
      const x = (clientX - innerWidth / 2) * 0.05;
      const y = (clientY - innerHeight / 2) * 0.05;

      // Apply animations
      earthXTo(x * -4);
      earthAnimationComplete && earthYTo(y * -4);
      bgXTo(x * 5);
      bgYTo(y * 5);
    };

    // GSAP quick animations
    const earthXTo = gsap.quickTo(earth.current, "x", earthAnimation);
    const earthYTo = gsap.quickTo(earth.current, "y", earthAnimation);
    const bgXTo = gsap.quickTo(starBg.current, "x", starAnimation);
    const bgYTo = gsap.quickTo(starBg.current, "y", starAnimation);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [earthAnimationComplete]);



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
          delay: 2,
          ease: "power2.out",
          onComplete: () => setEarthAnimationComplete(true)
        }
      );
    }
  }, [isVisible]);

  useEffect(() => {
    const heading = headingRef.current;
    const text = heading.textContent;
    const originalDisplay = 'block';
    heading.textContent = "";

    const letters = text.split(/(\s+)/).map((word) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.style.display = "inline-block";
      span.style.marginRight = "10px";
      heading.appendChild(span);
      return span;
    });

    // Show the heading before animation starts
    heading.style.display = originalDisplay;

    gsap.fromTo(
      letters,
      {
        y: 100,
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        delay: 3,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }
    );
  }, [])

  return (
    <div className="sp-hero-section">
      {/* Star Background */}
      <div className="sp-star-bg-img" ref={starBg} />

      {/* Header */}
      <nav ref={navRef} className="w-full max-w-screen-2xl backdrop-blur-sm bg-transparent px-5 py-2">
        <h2>ASTO_</h2>
      </nav>

      {/* Main Content */}
      <div className="pt-40 w-full p-5 h-full">
        <h1 ref={headingRef}>Unlock the Infinite Space</h1>
      </div>

      {/* Loading State */}
      {/* {isVisible && (
        <div className="h-screen w-screen text-5xl z-[5] relative font-RobotInvaders text-center">
          <h5>Loading Asset</h5>
        </div>
      )} */}

      {/* 3D Earth Model */}
      <div ref={earth} className="sp-3d-earth">
        <Spline
          onLoad={() => setIsVisible(false)}
          scene="https://prod.spline.design/8XljPx8CoGV2Vbpf/scene.splinecode"
        />
      </div>
    </div>
  );
}
