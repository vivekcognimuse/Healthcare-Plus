import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Doctors", href: "/doctors" },
    { name: "Health Libraries", href: "/health-libraries" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Cardiology", href: "/services/cardiology" },
    { name: "Emergency Care", href: "/services/emergency-care" },
    { name: "General Medicine", href: "/services/general-medicine" },
    { name: "Pediatrics", href: "/services/pediatrics" },
    { name: "Neurology", href: "/services/neurology" },
  ];

  const socialIcons = [
    { name: "Facebook", icon: "/facebook.svg", href: "#" },
    { name: "Twitter", icon: "/twitter.svg", href: "#" },
    { name: "Instagram", icon: "/instagram.svg", href: "#" },
    { name: "LinkedIn", icon: "/linkedin.svg", href: "#" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ];

  return (
    <footer id="footer" className="bg-[#1a1a1a] text-gray-300">
      <div className="max-w-[1420px] mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/footer-logo.svg"
                alt="HealthCare Plus"
                width={200}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Providing exceptional healthcare services with compassion and
              expertise for over 25 years.
            </p>
            <div className="flex items-center space-x-3">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-[#2d4a8c] hover:bg-[#3d5a9c] rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={20}
                    height={20}
                    className="w-10 h-10"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  123 Medical Center Drive
                  <br />
                  New York, NY 10001
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">
                  Phone:{" "}
                  <a
                    href="tel:5551234567"
                    className="hover:text-white transition-colors"
                  >
                    (555) 123-4567
                  </a>
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">
                  Email:{" "}
                  <a
                    href="mailto:info@healthcare.com"
                    className="hover:text-white transition-colors"
                  >
                    info@healthcare.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2024 HealthCare Plus. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
