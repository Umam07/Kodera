"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useProgress } from "@/lib/context/ProgressContext";
import { AuthModal } from "@/components/auth/AuthModal";

export function Navbar() {
  const pathname = usePathname();
  const { progress, levelInfo, isLoggedIn, logoutUser } = useProgress();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Silabus", href: "/java" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <>
      <header className="sticky top-4 z-40 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
        <nav className="bg-[#fcfaf5] border border-[#b6b6b6] rounded-[16px] px-5 py-3 flex items-center justify-between transition-all">
          {/* Clean Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-[#ffe95c] rounded-[6px] flex items-center justify-center border border-[#1a3300]/30 font-bricolage text-base font-extrabold text-[#1a3300] tracking-tight">
              kd
            </div>
            <span className="font-bricolage font-extrabold text-xl text-[#1a3300] tracking-tight">
              Kodera
            </span>
          </Link>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-[6px] text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#d5f5c2] text-[#1a3300] font-semibold shadow-2xs"
                      : "text-[#1a3300] hover:bg-[#ffe95c]/30"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Area: Minimal Auth & Action */}
          <div className="hidden sm:flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-3 py-1.5 text-xs font-medium text-[#1a3300] hover:bg-[#ffe95c]/30 rounded-[6px] transition-colors"
                title="Ganti akun"
              >
                {progress.displayName.split(" ")[0]}
              </button>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-3 py-1.5 text-xs font-medium text-[#1a3300] hover:bg-[#ffe95c]/30 rounded-[6px] transition-colors"
              >
                Masuk
              </button>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ willChange: "transform" }}>
              <Link
                href="/java"
                className="px-4 py-2 bg-[#1a3300] text-[#fcfaf5] text-xs font-medium rounded-[6px] hover:bg-[#1a3300]/90 transition-colors shadow-xs"
              >
                Mulai Belajar
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#1a3300] rounded-[6px] hover:bg-[#ffe95c]/40"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown with Motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              style={{ willChange: "transform, opacity" }}
              className="mt-2 p-4 bg-[#fcfaf5] border border-[#b6b6b6] rounded-[16px] flex flex-col gap-2 sm:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-[6px] text-sm font-medium text-[#1a3300] hover:bg-[#ffe95c]/30"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-[#b6b6b6]/40 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-[#1a3300]/70">Akun Aktif:</span>
                  <span className="font-semibold text-[#1a3300]">{progress.displayName}</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="w-full py-2 border border-[#1a3300] rounded-[6px] text-xs font-medium text-[#1a3300]"
                >
                  Ganti Akun / Masuk
                </button>
                <Link
                  href="/java"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 bg-[#1a3300] text-[#fcfaf5] rounded-[6px] text-xs font-medium text-center"
                >
                  → Lanjut ke Silabus
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
