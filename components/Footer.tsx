"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  GithubLogo,
  FacebookLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { socialMedia } from "@/data";

const baseEase = [0.22, 1, 0.36, 1] as const;

const socialIcons: Record<string, typeof GithubLogo> = {
  github: GithubLogo,
  facebook: FacebookLogo,
  linkedin: LinkedinLogo,
};

export const Footer = () => {
  return (
    <motion.footer
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 sm:py-24 bg-[#F2F2EF] border-t border-[#E5E5E2]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: baseEase }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl space-y-6">
          <p className="text-xs font-semibold tracking-wide text-[#1D4ED8]">
            Get in touch
          </p>

          <h2
            id="contact-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0D0D0D] font-heading leading-tight [text-wrap:balance]"
          >
            Interested in my work or building in web development? Feel free to
            connect.
          </h2>

          <p className="text-sm sm:text-base text-[#525250] leading-relaxed [text-wrap:pretty]">
            I&apos;m always open to discussing web engineering projects,
            technical collaborations, or early-career developer opportunities.
          </p>

          <div className="pt-2">
            <a
              href="mailto:zaidjhon19@gmail.com"
              className="btn-primary-blue gap-2.5"
            >
              <EnvelopeSimple size={16} weight="bold" />
              <span>zaidjhon19@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Social */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#E5E5E2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-xs text-[#737370]">
              &copy; 2026 Jhon Renz Diaz &middot; ZAID.DEV
            </p>
            <span className="hidden sm:inline text-xs text-[#E5E5E2]">
              &middot;
            </span>
            <div className="flex items-center gap-3 text-xs text-[#737370]">
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {socialMedia.map((item) => {
              const IconComp = socialIcons[item.icon];
              if (!IconComp) return null;
              return (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-xl border border-[#E5E5E2] bg-white flex items-center justify-center text-[#525250] hover:text-[#1D4ED8] hover:border-[#1D4ED8]/50 shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
                >
                  <IconComp size={16} weight="fill" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
