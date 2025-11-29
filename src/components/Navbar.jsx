"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { Menu, X, Search, Phone, Ambulance } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/logo.svg";
import logoBlack from "@/../public/logo-black.svg";
import Button from "./ui/Button";
import { useModal } from "@/context/ContactContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "" },
  { name: "Doctors", href: "" },
  { name: "Health Library", href: "" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openFormModal } = useModal();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  // Listen for scroll to toggle scrolled state and check footer overlap
  useEffect(() => {
    const checkFooterOverlap = () => {
      const footer = document.getElementById("footer");
      if (footer && isOpen) {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        setAtFooter(footerRect.top < viewportHeight);
      } else {
        setAtFooter(false);
      }
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
      checkFooterOverlap();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Check footer overlap when mobile menu opens/closes
  useEffect(() => {
    const footer = document.getElementById("footer");
    if (footer && isOpen) {
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      setAtFooter(footerRect.top < viewportHeight);
    } else {
      setAtFooter(false);
    }
  }, [isOpen]);

  return (
    <div
      className="fixed flex flex-col z-[99] px-4 top-4 left-0 w-full transition-all duration-300"
      aria-label="Main navigation"
    >
      <div
        className={`mx-auto max-w-[1420px]  w-full rounded-2xl px-4 backdrop-blur-[30px] shadow-elevated ${
          isOpen ? "pb-4" : ""
        } transition-all duration-300`}
      >
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center flex-1">
            <Link
              href="/"
              className="flex items-center"
              aria-label="Healthcare Plus logo"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <Image
                src={isOpen && atFooter ? logo : scrolled ? logoBlack : logo}
                alt="Healthcare Plus logo"
                className="h-6 w-fit"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav
            className="hidden md:flex items-center space-x-8 flex-1 justify-center"
            aria-label="Main"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={
                  scrolled
                    ? "text-black group hover:text-blue-600 transition-colors duration-200"
                    : "text-white group hover:text-black transition-colors duration-200"
                }
              >
                <div className="inline-flex items-center flex-col">
                  <span className="text-base">{item.name}</span>
                  <div
                    className={`h-0.5 rounded-32 bg-blue-500 transition-all duration-200 ${
                      pathname === item.href ? "w-6" : "w-0 group-hover:w-6"
                    }`}
                  />
                </div>
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search
                className={`h-5 w-5 ${scrolled ? "text-black" : "text-white"}`}
              />
            </button>

            <button
              className={`p-2 ${
                scrolled
                  ? "bg-blue-100 hover:bg-blue-200"
                  : "bg-blue-600 hover:bg-blue-700"
              } rounded-full transition-colors`}
              aria-label="Call"
            >
              <Phone
                className={`h-5 w-5 ${scrolled ? "text-black" : "text-white"}`}
              />
            </button>

            <button
              className={`p-2 ${
                scrolled
                  ? "bg-red-100 hover:bg-red-200"
                  : "bg-red-600 hover:bg-red-700"
              } rounded-full transition-colors`}
              aria-label="ambulance"
            >
              <Ambulance
                className={`h-5 w-5 ${scrolled ? "text-black" : "text-white"}`}
              />
            </button>

            <button
              className="px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors border border-gray-300"
              aria-label="Language"
            >
              <span
                className={`text-sm font-medium ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                ENG
              </span>
              <span
                className={`ml-1 ${scrolled ? "text-black" : "text-white"}`}
              >
                ▼
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu inside the same container */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col md:hidden overflow-hidden space-y-4 pt-4"
              id="mobile-menu"
              aria-labelledby="mobile-menu-heading"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={
                    atFooter
                      ? "text-white hover:text-blue-200 transition-colors duration-200"
                      : "text-black-800 hover:text-black transition-colors duration-200"
                  }
                >
                  <div className="inline-flex text-xl items-center flex-col">
                    <span
                      className={`${
                        pathname === item.href
                          ? atFooter
                            ? "text-blue-200"
                            : "text-blue-600"
                          : atFooter
                          ? "text-white hover:text-blue-200"
                          : "text-black-800 hover:text-blue-600"
                      }`}
                    >
                      {item.name}
                    </span>
                    <div
                      className={`h-0.5 rounded-32 bg-blue-500 transition-all duration-200 ${
                        pathname === item.href ? "w-6" : "w-0 hover:w-6"
                      }`}
                    />
                  </div>
                </Link>
              ))}

              <div className="flex items-center justify-center space-x-4 pt-4">
                <button
                  className="p-2  hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Search"
                >
                  <Search
                    className={`h-5 w-5 ${
                      atFooter
                        ? "text-white"
                        : scrolled
                        ? "text-black"
                        : "text-white"
                    }`}
                  />
                </button>

                <button
                  className={`p-2 ${
                    atFooter
                      ? "bg-blue-600 hover:bg-blue-700"
                      : scrolled
                      ? "bg-blue-100 hover:bg-blue-200"
                      : "bg-blue-600 hover:bg-blue-700"
                  } rounded-full transition-colors`}
                  aria-label="Call"
                >
                  <Phone
                    className={`h-5 w-5 ${
                      atFooter
                        ? "text-white"
                        : scrolled
                        ? "text-black"
                        : "text-white"
                    }`}
                  />
                </button>

                <button
                  className={`p-2 ${
                    atFooter
                      ? "bg-red-600 hover:bg-red-700"
                      : scrolled
                      ? "bg-red-100 hover:bg-red-200"
                      : "bg-red-600 hover:bg-red-700"
                  } rounded-full transition-colors`}
                  aria-label="YouTube"
                >
                  <Youtube
                    className={`h-5 w-5 ${
                      atFooter
                        ? "text-white"
                        : scrolled
                        ? "text-black"
                        : "text-white"
                    }`}
                  />
                </button>

                <button
                  className="px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors border border-gray-300"
                  aria-label="Language"
                >
                  <span
                    className={`text-sm font-medium ${
                      atFooter
                        ? "text-white"
                        : scrolled
                        ? "text-black"
                        : "text-white"
                    }`}
                  >
                    ENG
                  </span>
                  <span
                    className={`ml-1 ${
                      atFooter
                        ? "text-white"
                        : scrolled
                        ? "text-black"
                        : "text-gray-500"
                    }`}
                  >
                    ▼
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
