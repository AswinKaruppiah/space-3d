'use client';

import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';

export default function Hero() {

  return (
    <div className="sp-hero-section">
      <div className='w-full max-w-screen-2xl backdrop-blur-sm bg-transparent px-5 py-2'>
        <h2>ASTO_</h2>
      </div>
      <div className='pt-40 w-full p-5 h-full'>
        <h1>Unlock the Infinte Space</h1>
      </div>
      <div className="absolute top-[90vh] inset-0 origin-center left-0 h-full w-screen">
        <Suspense fallback={<div className="w-full h-full animate-pulse bg-gray-200">Loading 3D Model...</div>}>
          <Spline
            scene="https://prod.spline.design/8XljPx8CoGV2Vbpf/scene.splinecode"
          />
        </Suspense>
      </div>
    </div>
  );
}
