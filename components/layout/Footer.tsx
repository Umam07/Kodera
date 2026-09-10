import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[#b6b6b6] bg-[#fcfaf5] text-[#1a3300] py-12 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-[#ffe95c] rounded-[6px] flex items-center justify-center border border-[#1a3300]/30 font-bricolage text-base font-extrabold text-[#1a3300] tracking-tight">
                kd
              </div>
              <span className="font-bricolage font-extrabold text-xl text-[#1a3300] tracking-tight">
                Kodera
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#1a3300]/80 max-w-sm leading-relaxed">
              Platform belajar pemrograman terstruktur dimulai dari Java fundamental hingga Object-Oriented Programming, dilengkapi latihan drag & drop dan coding auto-judge.
            </p>
            <p className="text-xs text-[#1a3300]/60">
              Dibuat oleh Muhammad Syafi&apos;ul Umam untuk mahasiswa IT &amp; pemula.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="font-semibold text-xs uppercase tracking-wider text-[#1a3300]">
              Menu Belajar
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/java"
                  className="text-[#1a3300]/75 hover:text-[#1a3300] hover:underline transition-colors"
                >
                  Silabus Lengkap Java
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-[#1a3300]/75 hover:text-[#1a3300] hover:underline transition-colors"
                >
                  Dashboard & XP
                </Link>
              </li>
              <li>
                <Link
                  href="/java/variabel-dan-tipe-data/pengenalan-variabel"
                  className="text-[#1a3300]/75 hover:text-[#1a3300] hover:underline transition-colors"
                >
                  Mulai Modul 1
                </Link>
              </li>
            </ul>
          </div>

          {/* Modules Overview */}
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="font-semibold text-xs uppercase tracking-wider text-[#1a3300]">
              Kurikulum
            </div>
            <ul className="space-y-2 text-xs text-[#1a3300]/75">
              <li>14 Modul Terstruktur</li>
              <li>Latihan Drag & Drop Alur Kode</li>
              <li>Function-Based Code Judge</li>
              <li>Tanpa Instalasi JDK Lokal</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#b6b6b6]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#1a3300]/65">
          <div>
            © {new Date().getFullYear()} Kodera. Semua hak cipta dilindungi.
          </div>
          <div className="font-mono text-[11px]">
            Platform Belajar Java Interaktif
          </div>
        </div>
      </div>
    </footer>
  );
}
