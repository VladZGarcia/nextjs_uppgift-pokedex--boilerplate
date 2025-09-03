"use client"
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const LoadingScreen = () => {
  return (
      <div className='w-32 h-32'>
          <DotLottieReact
      src="/pokeball_animation.json"
      loop
      autoplay
      style={{ width: "100%", height: "100%" }}    
    
    />
    </div>
  );
};