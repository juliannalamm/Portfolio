import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap-trial';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import JohnImage from '../assets/John.svg';

gsap.registerPlugin(ScrollTrigger);

const JohnZoom = () => {
  const johnRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      johnRef.current,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: 'power1.out',
        // Remove scrub so it doesn't tie the tween to scroll progress
        scrollTrigger: {
            trigger: johnRef.current,
            scroller: '.scroll__text', // Use the same scroller as the main scroll
            start: 'top 80%',
            end: '+=300',       // adjust this as needed
            scrub: false,       // disables continuous syncing to scroll; plays once
            toggleActions: 'play none none none', // onEnter: play, onLeave: do nothing, onEnterBack: do nothing, onLeaveBack: do nothing
            markers: true,      // for debugging
          }
      }
    );
  }, []);

  return (
    <div
      ref={johnRef}
      style={{
        width: '80%',
        margin: '0 auto',
        transformOrigin: 'center center',
      }}
    >
      <img src={JohnImage} alt="John" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
};

export default JohnZoom;
