import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Sprite, Stage } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { PlayState, Tween as GSAPTween } from 'react-gsap';

gsap.registerPlugin(MotionPathPlugin);

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

const CANVAS_WIDTH = 520;
const CANVAS_HEIGHT = 520;
const CANVAS_CONFIG = { antialias: true, autoDensity: true, backgroundColor: 0x55863F };
export const ANIMATION_DURATION = 10;

const roulettePointOffsetMap = {
  0: 4.5,
  1: 138,
  2: 301,
  3: 25,
  4: 322,
  5: 173,
  6: 258,
  7: 65,
  8: 200.5,
  9: 102,
  10: 182,
  11: 219,
  12: 45.5,
  13: 238.5,
  14: 120,
  15: 343.5,
  16: 156,
  17: 280,
  18: 84,
  19: 333,
  20: 129,
  21: 311,
  22: 93,
  23: 191,
  24: 165,
  25: 290.5,
  26: 15,
  27: 248,
  28: 55,
  29: 75,
  30: 210,
  31: 112,
  32: 354,
  33: 147,
  34: 269,
  35: 35.5,
  36: 229,
}

const rotateByPoint = (cx, cy, x, y, angle) => {
  const radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return {
    x: nx, y: ny
  };
}

const roulettePath = "M254.59,15.1S19.68,28.07,19.68,260c0,132.72,107.6,240.32,240.32,240.32,102.37,0,189.79-64,224.42-154.19,16.43-42.79,18.91-89.62,8.33-134.22-16.61-70-69-191.58-232.75-190.71C97.73,22.06,46.68,139.65,30.69,208.69a194.76,194.76,0,0,0,1.93,95.07C51.39,372.75,106.32,495,260,495c161.84,0,211.8-134.27,226.54-199.82a188.43,188.43,0,0,0,2-73.11C477.29,156.24,433.15,27.9,260,27.9,83.23,27.9,42.06,163.2,32.48,228.37a173.65,173.65,0,0,0,3.26,66.81C51.13,357.64,102.19,488.27,260,488.27c199.68,0,225.19-220.46,226.81-236.85a10.48,10.48,0,0,0,0-1.94c-1.07-12.19-14.67-133.86-134.09-135.28a10.57,10.57,0,0,0-4.08.77l-87.93,35.2a13.26,13.26,0,0,0-1.42.69c-90,52.23-101.58,95.27-103,106.36a10.57,10.57,0,0,1-2.18,5.2c-7.56,9.58-33.76,45.37-21.73,67.5,1.67,3.06,17.43,24.89,42.81,9.18,7.29-4.52,11.12,29.74,12.45,44.95a10.67,10.67,0,0,0,7.32,9.24l36.76,12.07a10.75,10.75,0,0,0,9.87-1.68l32.59-25c3.46-2.65,21.23,4.73,21.23,4.73a10.71,10.71,0,0,0,15.27-5l8.75-20.42c1.81-4.21,15.89,6.23,15.89,6.23,6.33.49,17-36.28,17-36.28,13.56,8.18,16.59-6.33,15.9-10.82l-1-6.39a10.68,10.68,0,0,1,3.72-9.85l7.62-6.35a10.72,10.72,0,0,0,3-12.37l-5-12a10.76,10.76,0,0,1,.16-8.65l1.33-2.85a26.11,26.11,0,0,0-2.9-26.79l-2.43-3.19a10.75,10.75,0,0,1-2.12-7.62h0a27.17,27.17,0,0,0-12.92-26.13l-3.47-2.11a10.7,10.7,0,0,0-6.85-1.48l2.07-11.94a9.53,9.53,0,0,0-8.23-11.08l-12.48-1.53-4.53-6.85a11.69,11.69,0,0,0-8.06-5.13L301,152.49s-4.19-13-10.84-14.09c-7-1.19-16.5,9.42-16.53,8.61l1-21.28";

const MotionPath = ({ path, progress, children, drop }) => {
  const createMotion = (x, y, rotation) => ({ x, y, rotation });
  const tween = useRef();
  const [ motion, setMotion ] = useState(createMotion(0, 0, 0));

  useEffect(() => {
    const t = {
      x: 0,
      y: 0,
      rotation: 0,
    };
    // @ts-ignore
    tween.current = gsap.to(t, {
      duration: 1,
      ease: 'none',
      paused: true,
      motionPath: {
        path,
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
        type: 'cubic',
        useRadians: true,
      },
      onUpdate: () => {
        const rotatePoint = rotateByPoint(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, t.x, t.y, roulettePointOffsetMap[drop]);
        setMotion(createMotion(rotatePoint.x, rotatePoint.y, t.rotation));
      }
    });

    // @ts-ignore
    return () => tween.current.kill();
  }, [ path, drop ]);

  useEffect(() => {
    // @ts-ignore
    tween.current.progress(progress);
  }, [ progress ]);

  return children(motion);
};

const Roulette = ({ drop }) => {
  const [ progress, setProgress ] = useState(0);
  const timeline = useMemo(() => gsap.timeline({ paused: true }), []);
  const [ timelineData, setTimelineData ] = useState({ progress: 0 });

  timeline.duration(ANIMATION_DURATION);

  useEffect(() => {
    timeline.invalidate().restart();
    setTimelineData({ progress: 0 });
  }, [ drop ]);


  useEffect(() => {
    if (timelineData.progress === 0 && drop !== null) {
      timeline.to(timelineData, {
        progress: 1,
        ease: 'none',
        duration: ANIMATION_DURATION,
        onUpdate: () => {
          setProgress(timelineData.progress)
        }
      }, [ timelineData ]);
    }
  }, [ timelineData.progress, drop ] )

  return (
    <div>
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} options={CANVAS_CONFIG}>
        <GSAPTween
          playState={PlayState.pause}
          to={{
            angle: 1080,
          }}
          progress={progress}
          duration={ANIMATION_DURATION}
        >
            <Sprite
              image={"/images/roulette.png"}
              anchor={0.5}
              scale={1}
              position={[ CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 ]}
              rotation={0}
            />
        </GSAPTween>
        <MotionPath path={roulettePath} progress={progress} drop={drop}>
          { (motion) => {
            return (
              <Sprite
                scale={0.5}
                image="/images/ball.png"
                { ...motion }
              />
            );
          }}
        </MotionPath>
      </Stage>
    </div>
  );
};

export default Roulette;
