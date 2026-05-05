"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    label: "Anlagegruppe",
    path: "/anlagegruppe",
    children: [
      { label: "Portfolio", path: "/portfolio" },
    ],
  },
  {
    label: "Über uns",
    path: "/ueber-uns",
    children: [
      { label: "Stiftungsrat", path: "/ueber-uns#stiftungsrat" },
      { label: "Team", path: "/ueber-uns#team" },
    ],
  },
  { label: "Dokumente", path: "/dokumente" },
  { label: "News", path: "/news" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 80) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
        setIsOpen(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: visible ? 0 : "-100%" }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-24 xl:h-32">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.avif" alt="Terra Helvetica Anlagestiftung" className="h-20 md:h-24 xl:h-28 py-1" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 3xl:gap-14">
          {navItems.map((item) => (
            <div
              key={item.path}
              className="relative"
              onMouseEnter={() => item.children && setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary flex items-center gap-1 ${
                  pathname === item.path
                    ? "text-primary"
                    : "text-foreground/70"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown size={14} className="opacity-50" />}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {item.children && hoveredItem === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-2 min-w-[180px]"
                  >
                    <div className="bg-background border border-border rounded-lg shadow-lg py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className="block px-4 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-secondary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <Link
            href="/kontakt"
            className={`text-sm font-medium tracking-wide px-5 py-2 rounded-lg border transition-colors ${
              pathname === "/kontakt"
                ? "border-primary text-primary"
                : "border-foreground/30 text-foreground/70 hover:border-primary hover:text-primary"
            }`}
          >
            Kontakt
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            {navItems.map((item) => (
              <div key={item.path}>
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-4 text-sm font-medium border-b border-border/50 transition-colors hover:bg-secondary ${
                    pathname === item.path
                      ? "text-primary"
                      : "text-foreground/70"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.path}
                    href={child.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-10 py-3 text-sm text-foreground/50 border-b border-border/30 hover:text-primary transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href="/kontakt"
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-4 text-sm font-medium transition-colors hover:bg-secondary ${
                pathname === "/kontakt"
                  ? "text-primary"
                  : "text-foreground/70"
              }`}
            >
              Kontakt
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
