"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Spline from "@splinetool/react-spline";
import { useGLTF } from '@react-three/drei';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Hero() {
  const earth = useRef(null);
  const starBg = useRef(null);
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const navRef = useRef(null);
  const [earthAnimationComplete, setEarthAnimationComplete] = useState(false);
  const starShip = useRef(null);
  const moon = useRef(null);

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
    const moonXTo = gsap.quickTo(moon.current, "x", earthAnimation);
    const moonYTo = gsap.quickTo(moon.current, "y", earthAnimation);

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
    gsap.registerPlugin(ScrollTrigger);

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

    gsap.to(earth.current, {
      left: "-40%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".sp-hero-section",
        start: "top top",
        end: "100vh top",
        scrub: 1.5,
      },
    });
  }, []);

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

  const onMoonLoad = (spline) => {
    const moonObject = spline.findObjectByName('Sphere');

    if (!moonObject) {
      console.warn('Sphere object not found');
      return;
    };

    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".sp-hero-section",
    //     start: "100vh top",
    //     end: "150vh top",
    //     scrub: 1,
    //   },
    // });

    gsap.to(moonObject?.rotation, {
      y: '+=360',
      duration: 3000,         // rotation duration in seconds
      ease: 'none',        // constant speed
      repeat: -1,          // infinite loop
      modifiers: {
        y: gsap.utils.unitize(value => parseFloat(value) % 360), // keep value from growing endlessly
      },
    });

  };



  return (
    <div className="sp-hero-section">
      {/* Star Background */}
      <div className="sp-star-bg-img" ref={starBg} />

      {/* Header */}
      <nav ref={navRef} className="w-full z-50 relative max-w-screen-2xl backdrop-blur-sm bg-transparent px-5 py-2">
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
      <div ref={moon} className="sp-moon">
        <Spline
          scene="https://prod.spline.design/Q8CjR1fqdpMkaXSM/scene.splinecode"
          onLoad={onMoonLoad}
        />
      </div>
      {/* <div className="sp-rocket">
        <Spline
          scene="https://prod.spline.design/nF6F8SbP8pltLT-E/scene.splinecode"
          onLoad={onLoad}
        />
      </div> */}
      {/* <div className="sp-rocket">
        <div className="sp-rocket-container">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 0.4 }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <OrbitControls enabled={false} />
            <Stage shadows={false} intensity={2}> // Increased intensity to make the object brighter
              <Model starShip={starShip} />
            </Stage>
            <Preload all />
          </Canvas>
        </div>
      </div> */}
    </div>
  );
}



const Model = ({ starShip }) => {
  const gltf = useGLTF("/star_wars_tieln_fighter/scene.gltf");

  return (
    <group ref={starShip}>
      {/* <hemisphereLight intensity={0.5} /> */}
      {/* <pointLight intensity={1} /> */}
      {/* <meshPhysicalMaterial
        reflectivity={0.9}
        roughness={0.9}
        color="#aaa"
        metalness={1}
        iridescence={0.3}
        iridescenceIOR={1}
        iridescenceThicknessRange={[100, 1000]}
      /> */}
      <primitive object={gltf.scene} />
    </group>
  );
};
