import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="relative w-full pt-20 pb-10 scroll-mt-24 overflow-hidden" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          loading="lazy"
          decoding="async"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href="mailto:zaidjhon19@gmail.com">
          <MagicButton
            title="Let's get in touch"
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2026 Jhon Renz Diaz
        </p>

      <div className="flex items-center md:gap-3 gap-6">
        {socialMedia.map((info) => {
          // Dynamically assign the component reference to a capitalized variable for JSX
          const IconComponent = info.Icon as React.ElementType;
          
          return (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={info.label}
              className="active:scale-90 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple rounded-lg group"
            >
              <div className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 transition-colors group-hover:border-purple/50">
                <IconComponent className="w-5 h-5 text-white/80 group-hover:text-purple transition-colors" />
              </div>
            </a>
          );
        })}
      </div>

      </div>
    </footer>
  );
};

export default Footer;
