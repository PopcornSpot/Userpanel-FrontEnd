import React from 'react';
import logo from '../../assets/POPFINAL.png';

const Loader = () => {
  return (
    <div className="flex items-center justify-center mt-20 h-screen w-full bg-white">
      <div
        className="relative w-48 h-48"
        style={{
          background: 'linear-gradient(90deg, rgb(121, 132, 148) 25%, rgb(91, 99, 112) 50%, rgb(140, 148, 160) 75%, rgb(121, 132, 148))',
          backgroundSize: '200% 100%',
          animation: 'colorShift 3s linear infinite, scaleUp 2s ease-in-out infinite',
          WebkitMaskImage: `url(${logo})`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskImage: `url(${logo})`,
          maskRepeat: 'no-repeat',
          maskSize: 'contain',
        }}
      ></div>
      <style>
        {`
          @keyframes colorShift {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
          @keyframes scaleUp {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
