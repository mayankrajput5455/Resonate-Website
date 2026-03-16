"use client";
import React, { useState, useCallback, useEffect } from "react";
import "./Navbar.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Logo = { src: "/resonate_logo_white.png" };

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  }, []);

  const handleLinkClick = () => setOpen(false);
  const handleToggleMenu = () => setOpen((prev) => !prev);

  // 🔹 Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const marker = document.getElementById("features-end");

      if (!marker) return;

      const markerTop = marker.getBoundingClientRect().top;

      if (markerTop < 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${visible ? "show" : "hide"}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div
          className="navbar-logo"
          onClick={scrollToTop}
          style={{ cursor: "pointer" }}
        >
          <img src={Logo.src} alt="Resonate Logo" className="logo-icon" />
          <span className="logo-text">Resonate</span>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={handleToggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          ☰
        </button>

        {/* Links */}
        <div className={`navbar-links ${open ? "open" : ""}`}>
          <a
            href="https://aossie.org"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            onClick={handleLinkClick}
          >
            AOSSIE <FaExternalLinkAlt size={12} />
          </a>

          <a
            href="https://github.com/AOSSIE-Org/Resonate"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            onClick={handleLinkClick}
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.resonate.resonate"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
            onClick={handleLinkClick}
          >
            Download Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;