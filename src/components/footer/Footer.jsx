import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp, FaCode } from "react-icons/fa";

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/GauravSingh0001",
    label: "GitHub",
    username: "@GauravSingh0001",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/in/GauravSinghDev",
    label: "LinkedIn",
    username: "GauravSinghDev",
  },
  {
    icon: FaEnvelope,
    href: "mailto:gauravsinghdev@gmail.com",
    label: "Email",
    username: "gauravsinghdev@gmail.com",
  },
];

const navLinks = [
  { label: "Home",         href: "#hero" },
  { label: "Skills",       href: "#skills" },
  { label: "Experience",   href: "#experience" },
  { label: "Projects",     href: "#projects" },
  { label: "Certificates", href: "#certificates" },
];

function Footer() {
  const [hovered, setHovered] = useState(null);
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative w-full border-t border-app-main bg-app-surface overflow-hidden"
      style={{ transition: "background-color 0.35s, border-color 0.35s" }}
    >
      {/* Ambient glows */}
      <div
        className="absolute -top-24 left-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-60"
        style={{ backgroundColor: "var(--ambient-1)" }}
      />
      <div
        className="absolute -top-16 right-1/4 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-50"
        style={{ backgroundColor: "var(--ambient-2)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Block */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span
                className="text-3xl font-black tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Gaurav
                <span className="ml-1" style={{ color: "var(--accent-main)" }}>
                  .
                </span>
              </span>
            </div>

            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Full Stack Developer building performant,
              scalable web applications with modern architecture and delightful
              user experiences.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-xs font-bold uppercase tracking-widest font-mono flex items-center gap-2"
              style={{ color: "var(--accent-main)" }}
            >
              <FaCode className="text-sm" /> Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-all duration-200 hover:translate-x-0.5 inline-block"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent-main)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-secondary)")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-xs font-bold uppercase tracking-widest font-mono"
              style={{ color: "var(--accent-main)" }}
            >
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-3">
              {socialLinks.map(({ icon: Icon, href, label, username }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-3 text-sm transition-all duration-200"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => {
                      setHovered(label);
                      e.currentTarget.style.color = "var(--accent-main)";
                    }}
                    onMouseLeave={(e) => {
                      setHovered(null);
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                    aria-label={label}
                  >
                    <span
                      className="flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200"
                      style={{
                        backgroundColor:
                          hovered === label
                            ? "var(--accent-main)"
                            : "var(--chip-bg)",
                        borderColor:
                          hovered === label
                            ? "var(--accent-main)"
                            : "var(--border-main)",
                        color:
                          hovered === label ? "#fff" : "var(--text-primary)",
                      }}
                    >
                      <Icon className="text-sm" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="font-semibold text-xs uppercase tracking-wide">
                        {label}
                      </span>
                      <span className="text-xs opacity-70 truncate max-w-[180px]">
                        {username}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{ backgroundColor: "var(--border-main)" }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-center sm:text-left font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            &copy; {year}{" "}
            <span style={{ color: "var(--accent-main)", fontWeight: 600 }}>
              Gaurav Singh
            </span>
            . Crafted with{" "}
            <FaHeart
              className="inline-block mx-0.5 text-[10px] animate-pulse"
              style={{ color: "var(--accent-main)" }}
            />{" "}
            using React &amp; Tailwind CSS.
          </p>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Back to top"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group"
            style={{
              backgroundColor: "var(--chip-bg)",
              borderColor: "var(--border-main)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-main)";
              e.currentTarget.style.color = "var(--accent-main)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-main)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <FaArrowUp className="text-xs transition-transform group-hover:-translate-y-0.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
