"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/logo.svg";
import Button from "./ui/Button";
import { useModal } from "@/context/ContactContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openFormModal } = useModal();
  const pathname = usePathname();

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "News", href: "/news" },
  ];

  return (
    <div
      className={`fixed flex flex-col z-[999] lg:px-8 px-4 top-4 left-0 w-full transition-all duration-300`}
      aria-label="Main navigation">
      <div className="mx-auto max-w-[1480px] w-full rounded-32 px-4 bg-white shadow-elevated">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center"
              aria-label="Crumpler Health logo"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}>
              <Image
                src={logo}
                alt="Crumpler Health logo"
                className="h-6 w-fit"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            aria-label="Main">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-black-800 group hover:text-black transition-colors duration-200">
                <div className="inline-flex items-center flex-col">
                  <span>{item.name}</span>
                  <div
                    className={`h-0.5 rounded-32 bg-purple-500 transition-all duration-200 ${
                      pathname === item.href ? "w-6" : "w-0 group-hover:w-6"
                    }`}
                  />
                </div>
              </Link>
            ))}

            <Button
              onClick={() => openFormModal()}
              className="px-4 w-fit py-1 text-base">
              Contact Us
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        aria-labelledby="mobile-menu-heading">
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block py-2 ${
                pathname === item.href
                  ? "text-purple-600 font-medium"
                  : "text-gray-700 hover:text-purple-600"
              }`}
              onClick={() => setIsOpen(false)}>
              {item.name}
            </Link>
          ))}
          <Button
            onClick={() => {
              openFormModal();
              setIsOpen(false);
            }}
            href="/contact"
            className="block mt-4 px-4 py-2 text-center border border-gray-800 rounded-full text-gray-800 hover:bg-gray-800 hover:text-white">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
