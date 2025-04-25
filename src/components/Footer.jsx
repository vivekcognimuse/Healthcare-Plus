"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/../public/logo.svg";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="w-full border-t mt-16 border-black-300 flex px-4">
      <div className="container mx-auto py-6 max-w-[1480px]">
        <div className="flex flex-col md:flex-row last-of-type sm:mb-44 mb-24 justify-between items-center gap-6 md:gap-0">
          {/* Logo with Image */}
          <Link
            href="/"
            className="flex items-center text-gray-800 text-xl font-medium"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}>
            <Image
              src={logo}
              alt="Crumpler Health logo"
              className="h-6 w-fit mr-2"
            />
          </Link>

          {/* Navigation links */}
          <nav className="flex mt-16 md:mt-0 justify-between w-full md:w-fit md:justify-center items-center gap-2 sm:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black-800 hover:text-black transition font-light md:text-xl">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="text-black-600 font-light text-center md:text-lg">
          &copy;Crumpler Health 2025
        </div>
      </div>
    </footer>
  );
}
