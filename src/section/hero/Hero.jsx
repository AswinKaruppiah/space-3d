'use client';

import Spline from '@splinetool/react-spline';

export default function Hero() {

  return (
    <div className="sp-hero-section">
      <h1>Space</h1>
      <div className="w-screen h-screen">
        <Spline
          scene="https://prod.spline.design/8XljPx8CoGV2Vbpf/scene.splinecode" />
      </div>
    </div>
  );
}
