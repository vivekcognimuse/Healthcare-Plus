"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/../public/logo.svg";
import logoWhite from "@/../public/logoWhite.svg";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer({ isBlackTheme }) {
  const pathname = usePathname();

  const textColor = isBlackTheme ? "text-white" : "text-black-800";
  const hoverColor = isBlackTheme ? "hover:text-white" : "hover:text-black";
  const borderColor = isBlackTheme ? "border-white" : "border-black-300";
  const copyrightColor = isBlackTheme ? "text-white" : "text-black-600";

  return (
    <footer className={`w-full p-side  border-t mt-16 ${borderColor} flex `}>
      <div className="max-w-[1420px] mx-auto  w-full  py-6 ">
        <div className="flex flex-col md:flex-row last-of-type sm:mb-44 mb-24 justify-between items-center gap-6 md:gap-0">
          {/* Logo with Image */}
          <Link
            href="/"
            className={`flex items-center ${textColor} text-xl font-medium`}
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}>
            <Image
              src={isBlackTheme ? logoWhite : logo}
              alt="Tala Health logo"
              className="h-6 w-fit mr-2"
            />
          </Link>

          {/* Navigation links */}
          <nav className="flex mt-16 md:mt-0 justify-between w-full md:w-fit md:justify-center items-center gap-2 sm:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${textColor} ${hoverColor} transition font-light md:text-xl`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className={`${copyrightColor} font-light text-center md:text-lg`}>
          &copy;Tala Health 2025
        </div>
      </div>
    </footer>
  );
}
