"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Spline from "@splinetool/react-spline";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const earth = useRef(null);
  const starBg = useRef(null);
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const navRef = useRef(null);
  const [earthAnimationComplete, setEarthAnimationComplete] = useState(false);
  const starShip = useRef(null);
  const moon = useRef(null);
  const floatingAstro = useRef(null);

  const earthAnimation = {
    duration: 2.5,
    ease: "power2.out",
  };

  const starAnimation = {
    duration: 1.5,
    ease: "power3.out",
  };

  useEffect(() => {
    gsap.fromTo(
      moon.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2,
        delay: 4,
        ease: "power2.out",
      }
    );

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
      earthAnimationComplete && earthXTo(x * -4);
      earthYTo(y * -4);
      bgXTo(x * 5);
      bgYTo(y * 5);
      moonXTo(x * -3);
      moonYTo(y * -3);
    };

    // GSAP quick animations
    const earthXTo = gsap.quickTo(earth.current, "x", earthAnimation);
    const earthYTo = gsap.quickTo(earth.current, "y", earthAnimation);
    const bgXTo = gsap.quickTo(starBg.current, "x", starAnimation);
    const bgYTo = gsap.quickTo(starBg.current, "y", starAnimation);
    const moonXTo = gsap.quickTo(moon?.current, "x", earthAnimation);
    const moonYTo = gsap.quickTo(moon?.current, "y", earthAnimation);

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
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
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

  //scroll effect
  useEffect(() => {

    gsap.to(headingRef.current, {
      y: -150,
      opacity: 0,
      display: "none",
      ease: "none",
      scrollTrigger: {
        trigger: ".sp-hero-section",
        start: "top top",
        end: "100vh top",
        scrub: 1,
      },
    });

    gsap.to(
      earth.current,
      {
        left: "-100%",
        scale: 0.2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".sp-hero-section",
          start: "100vh top",
          end: "220vh top",
          scrub: 1.5,
        },
      }
    );


    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sp-hero-section",
        start: "100vh top",
        end: "500vh top",
        scrub: 1.5,
      }
    });

    // Total scroll distance = 400vh
    // First 200vh = 50% (0 to 0.5 of timeline)
    // Gap = next 100vh (0.5 to 0.75)
    // Second animation = last 100vh (0.75 to 1)

    tl.to(moon.current, {
      left: "-40%",
      scale: 1.5,
      ease: "power1.inOut",
    }, 0)

      .to(moon.current, {
        left: "5%",
        top: "50%",
        scale: 1,
        ease: "power1.inOut",
      }, 0.75); // starts at 75% of scroll (400vh)


    gsap.fromTo(floatingAstro.current,
      {
        top: "-35%",
        opacity: 0,
      },
      {
        top: "-30%",
        opacity: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".sp-hero-section",
          start: "195vh top",
          end: "210vh top",
          scrub: 1,
        },
      }
    );



  }, []);


  const onMoonLoad = (spline) => {
    const moonObject = spline.findObjectByName('Sphere');
    const light = spline.findObjectByName('Directional Light');

    if (!moonObject || !light) {
      console.warn('Missing objects');
      return;
    }

    gsap.to(moonObject?.rotation, {
      y: '+=360',
      duration: 3000,
      ease: 'none',
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize(value => parseFloat(value) % 360),
      },
    });

    gsap.to(light.position, {
      x: 200,
      y: 100,
      duration: 3000,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".sp-hero-section",
        start: "100vh top",
        end: "180vh top",
        scrub: 1.5,
      },
    });
    gsap.to(moonObject.scale, {
      x: 1.9, // width
      y: 1.9, // height
      z: 1.9, // optional depth
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".sp-hero-section",
        start: "100vh top",
        end: "180vh top",
        scrub: 1.5,
      },
    });
    gsap.to(moonObject.position, {
      x: -30,
      y: -50,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".sp-hero-section",
        start: "100vh top",
        end: "180vh top",
        scrub: 1.5,
      },
    });
  };



  return (
    <div className="sp-hero-section">
      {/* Star Background */}
      <div className="sp-star-bg-img" ref={starBg} />

      {/* Header */}
      <nav ref={navRef} className="w-full z-50 relative backdrop-blur-sm bg-transparent px-5 py-2">
        <h2>ASTO_</h2>
      </nav>

      {/* Main Content */}
      <div className="pt-40 w-full p-5 h-full">
        <h1 ref={headingRef}>Unlock the Infinite Space</h1>
      </div>


      {/* 3D Earth Model */}
      <div ref={earth} className="sp-3d-earth opacity-0">
        <Spline
          onLoad={() => setIsVisible(false)}
          scene="https://prod.spline.design/8XljPx8CoGV2Vbpf/scene.splinecode"
        />
      </div>
      <div ref={moon} className="sp-moon">
        <Spline
          scene="https://prod.spline.design/Q8CjR1fqdpMkaXSM/scene.splinecode"
          onLoad={onMoonLoad}
        />
      </div>
      <div ref={floatingAstro} className="sp-floating-astro">
        <div className="sp-img-container">
          <Image
            src="/assets/astronaut.png"
            alt="astro"
            width={500}
            height={500}
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}




// const tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".sp-hero-section",
//     start: "100vh top",
//     end: "270vh top",
//     scrub: 1.5,
//   }
// });

// // First part from start to 200vh top
// tl.to(moon.current, {
//   left: "-90%",
//   scale: 1.5,
//   ease: "power1.inOut",
// }, 0);

// // Second part from 200vh top to 370vh top
// tl.to(moon.current, {
//   left: "-45%",
//   top: "50%",
//   ease: "power1.inOut",
// }, 1); // starts after first animation finishes

{/* Loading State */ }
{/* {isVisible && (
        <div className="h-screen w-screen text-5xl z-[5] relative font-RobotInvaders text-center">
          <h5>Loading Asset</h5>
        </div>
      )} */}




// gsap.to(moonObject.position, {
//   x: -300,
//   y: -70,
//   ease: "power1.inOut",
//   scrollTrigger: {
//     trigger: ".sp-hero-section",
//     start: "100vh top",
//     end: "200vh top",
//     scrub: 1.5,
//   },
// });
// gsap.to(moonObject.position, {
//   x: -200,
//   y: 100,
//   ease: "power1.inOut",
//   scrollTrigger: {
//     trigger: ".sp-hero-section",
//     start: "210vh top",
//     end: "280vh top",
//     scrub: 1.5,
//   },
// });

// Change light position
// light.position.x = 200;
// light.position.y = 200;
// const tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".sp-hero-section",
//     start: "100vh top",
//     end: "150vh top",
//     scrub: 1,
//   },
// });

// const onLoad = (spline) => {
//   const rocketObject = spline.findObjectByName('rocket');

//   console.log(rocketObject);

//   rocketObject?.position?.set(800, 110, 0);
//   // rocketObject?.rotation?.set(2, 3.5, 0);
//   rocketObject?.scale?.set(0.3, 0.3, 0.3);

//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".sp-hero-section",
//       start: "100vh top",
//       end: "150vh top",
//       scrub: 1,
//     },
//   });

//   tl.to(rocketObject?.scale, {
//     x: 2,
//     y: 2,
//     z: 2,
//     duration: 2,
//     ease: "none"
//   });

//   tl.to(rocketObject?.position, {
//     x: -750,
//     y: -100,
//     duration: 2,
//     ease: "none",
//   }, "<");
// };
