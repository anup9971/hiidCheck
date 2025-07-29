'use client';
import React, { useState, useEffect } from 'react';

const scenes = {
  reception: {
    img: '/hotel/hotel1.jpg',
    hotspots: [
      {
        position: '2 1 -3',
        target: 'conference',
      },
      {
        position: '-2 1 -2',
        target: 'cabin',
      },
    ],
  },
  conference: {
    img: '/hotel/hotel2.jpg',
    hotspots: [
      {
        position: '0 1 -3',
        target: 'reception',
      },
    ],
  },
  cabin: {
    img: '/hotel/hotel3.jpg',
    hotspots: [
      {
        position: '1 1 -3',
        target: 'reception',
      },
    ],
  },
};

const VirtualTour = () => {
  const [currentScene, setCurrentScene] = useState('reception');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleChangeScene = (target) => {
    setCurrentScene(target);
  };

  const currentHotspots = scenes[currentScene].hotspots;

  return (
    <a-scene>
      <a-assets>
        <img
          id="panorama"
          src={scenes[currentScene].img}
          crossOrigin="anonymous"
        />
      </a-assets>

      <a-sky src="#panorama" rotation="0 -130 0"></a-sky>

      {currentHotspots.map((hotspot, index) => (
        <a-entity
          key={index}
          geometry="primitive: circle; radius: 0.3"
          material="color: red"
          position={hotspot.position}
          rotation="0 0 0"
          class="clickable"
          event-set__enter="_event: mouseenter; scale: 1.2 1.2 1"
          event-set__leave="_event: mouseleave; scale: 1 1 1"
          onClick={() => handleChangeScene(hotspot.target)}
        ></a-entity>
      ))}
    </a-scene>
  );
};

export default VirtualTour;
