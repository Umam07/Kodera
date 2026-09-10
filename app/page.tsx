"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  BookOpen,
  Layers,
  GraduationCap,
  Terminal,
  Zap,
  Check,
  X,
  Compass,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { JAVA_COURSE_DATA } from "@/lib/data/javaCourseData";

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 24,
    },
  },
};

const willChangeTransform = { willChange: "transform" } as const;
const willChangeTransformOpacity = { willChange: "transform, opacity" } as const;

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  // Interactive mini showcase on hero: 3 code lines to reorder
  const initialMiniItems = [
    { id: "3", text: 'System.out.println("Halo, " + nama);', pos: 3 },
    { id: "1", text: 'String nama = "Umam";', pos: 1 },
    { id: "2", text: "int semester = 5;", pos: 2 },
  ];
  const [items, setItems] = useState(initialMiniItems);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);
    setChecked(false);
  };

  const checkMiniOrder = () => {
    const correct =
      items[0].pos === 1 && items[1].pos === 2 && items[2].pos === 3;
    setIsCorrect(correct);
    setChecked(true);
  };

  const resetMini = () => {
    setItems(initialMiniItems);
    setChecked(false);
    setIsCorrect(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* HERO SECTION */}
      <motion.section
        variants={shouldReduceMotion ? undefined : heroContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full pt-16 pb-20 px-4 sm:px-6 max-w-[1200px] mx-auto text-center flex flex-col items-center"
      >
        {/* Main Display Headline */}
        <motion.h1
          variants={shouldReduceMotion ? undefined : heroItemVariants}
          style={willChangeTransformOpacity}
          className="font-bricolage font-extrabold text-[32px] sm:text-[44px] md:text-[54px] lg:text-[62px] text-[#1a3300] leading-[1.15] tracking-[0.02em] max-w-4xl"
        >
          Belajar Java terarah,{" "}
          <br className="hidden sm:inline" />
          <span className="highlight-wash whitespace-nowrap">langsung praktik.</span>
        </motion.h1>

        {/* Subhead Paragraph */}
        <motion.p
          variants={shouldReduceMotion ? undefined : heroItemVariants}
          style={willChangeTransformOpacity}
          className="mt-6 font-inter text-[18px] sm:text-[20px] text-[#1a3300]/85 leading-[1.55] max-w-[660px] mx-auto"
        >
          Tinggalkan tutorial acak yang bikin bingung mau mulai dari mana. Di Kodera,
          kamu belajar konsep secara terstruktur bab demi bab, melatih nalar lewat
          latihan <strong>drag & drop alur kode</strong>, dan menuntaskan tantangan{" "}
          <strong>coding auto-judge</strong> langsung di browser.
        </motion.p>

        {/* Primary CTA & Reassurance */}
        <motion.div
          variants={shouldReduceMotion ? undefined : heroItemVariants}
          style={willChangeTransformOpacity}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            style={willChangeTransform}
            className="w-full sm:w-auto"
          >
            <Link
              href="/java"
              className="w-full sm:w-auto px-9 py-4 bg-[#1a3300] text-[#fcfaf5] text-[15px] font-semibold rounded-[6px] hover:bg-[#1a3300]/90 transition-colors shadow-xs flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#ffe95c]"
              style={{ touchAction: "manipulation" }}
            >
              <span>Mulai Belajar Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            style={willChangeTransform}
            className="w-full sm:w-auto"
          >
            <Link
              href="/java/variabel-dan-tipe-data/pengenalan-variabel"
              className="w-full sm:w-auto px-6 py-4 bg-[#d5f5c2] border-2 border-[#1a3300] text-[#1a3300] text-[15px] font-semibold rounded-[6px] hover:bg-[#d5f5c2]/80 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#1a3300]"
              style={{ touchAction: "manipulation" }}
            >
              <Play className="w-4 h-4 fill-[#1a3300]" />
              <span>Coba Modul 1 Langsung</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Reassurance Features Line */}
        <motion.div
          variants={shouldReduceMotion ? undefined : heroItemVariants}
          style={willChangeTransformOpacity}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-mono text-[#1a3300]/70"
        >
          <span>✓ 100% di browser</span>
          <span>•</span>
          <span>✓ Tanpa ribet instal JDK lokal</span>
          <span>•</span>
          <span>✓ Gratis untuk mahasiswa & pemula</span>
        </motion.div>

        {/* INTERACTIVE MINI SHOWCASE */}
        <motion.div
          variants={shouldReduceMotion ? undefined : heroItemVariants}
          style={willChangeTransformOpacity}
          className="mt-14 w-full max-w-2xl bg-[#fcfaf5] border-2 border-[#1a3300] rounded-[16px] p-5 sm:p-7 shadow-xs text-left relative"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#b6b6b6] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#cb5521]" />
              <span className="w-3 h-3 rounded-full bg-[#ffe95c]" />
              <span className="w-3 h-3 rounded-full bg-[#d5f5c2]" />
              <span className="font-mono text-xs text-[#1a3300] font-bold ml-2">
                Coba Sendiri: Latihan Susun Potongan Kode
              </span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-[#a8e5e5] rounded-[4px] border border-[#1a3300]/20 font-bold">
              +15 XP Preview
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#1a3300]/80 mb-3">
            Buktikan pemahamanmu: susun 3 potongan kode Java berikut ke urutan eksekusi yang benar:
          </p>

          {/* Draggable/Reorderable items */}
          <div className="space-y-2 mb-4" role="list">
            {items.map((item, index) => (
              <motion.div
                layout={!shouldReduceMotion}
                key={item.id}
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
                style={willChangeTransform}
                className="flex items-center justify-between p-3 bg-white border border-[#1a3300] rounded-[6px] text-xs sm:text-sm font-mono transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 flex items-center justify-center bg-[#ffe95c] text-[#1a3300] font-bold rounded-[3px] text-xs shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-[#1a3300] font-semibold">{item.text}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="px-2 py-1 bg-[#fcfaf5] border border-[#b6b6b6] rounded-[4px] text-xs font-mono disabled:opacity-30 hover:border-[#1a3300] focus-visible:ring-2 focus-visible:ring-[#1a3300]"
                    style={{ touchAction: "manipulation" }}
                    aria-label={`Pindah baris ${index + 1} ke atas`}
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, "down")}
                    disabled={index === items.length - 1}
                    className="px-2 py-1 bg-[#fcfaf5] border border-[#b6b6b6] rounded-[4px] text-xs font-mono disabled:opacity-30 hover:border-[#1a3300] focus-visible:ring-2 focus-visible:ring-[#1a3300]"
                    style={{ touchAction: "manipulation" }}
                    aria-label={`Pindah baris ${index + 1} ke bawah`}
                  >
                    ▼
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feedback and Check Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-xs">
              {checked ? (
                isCorrect ? (
                  <span className="text-[#1a3300] font-semibold bg-[#d5f5c2] px-2.5 py-1 rounded-[4px] border border-[#1a3300]/30 inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1a3300]" />
                    Urutan Tepat! Variabel dideklarasikan sebelum dibaca.
                  </span>
                ) : (
                  <span className="text-[#cb5521] font-semibold bg-[#f6d0ff] px-2.5 py-1 rounded-[4px] border border-[#cb5521]/30 inline-flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-[#cb5521]" />
                    Belum tepat. Geser `String nama` ke urutan pertama.
                  </span>
                )
              ) : (
                <span className="text-[#1a3300]/60 font-mono text-[11px]">
                  Gunakan tombol panah untuk mengatur urutan baris.
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetMini}
                className="p-2 border border-[#b6b6b6] rounded-[6px] hover:bg-[#ffe95c]/30 text-xs text-[#1a3300] focus-visible:ring-2 focus-visible:ring-[#1a3300]"
                style={{ touchAction: "manipulation" }}
                title="Acak ulang posisi"
                aria-label="Reset posisi latihan mini"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={checkMiniOrder}
                className="px-4 py-2 bg-[#1a3300] text-[#fcfaf5] text-xs font-semibold rounded-[6px] hover:bg-[#1a3300]/90 transition-colors focus-visible:ring-2 focus-visible:ring-[#ffe95c]"
                style={{ touchAction: "manipulation" }}
              >
                Cek Jawaban
              </button>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* WHY KODERA: 4 CORE SUPERPOWERS */}
      <section className="w-full py-16 px-4 sm:px-6 max-w-[1200px] mx-auto border-t border-[#b6b6b6]/30">
        <div className="text-center mb-12">
          <h2 className="font-bricolage text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a3300] tracking-tight text-pretty">
            Kenapa Belajar di Kodera Terasa Lebih Cepat Nempel?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#1a3300]/75 max-w-xl mx-auto">
            Bukan sekadar membaca dokumentasi tebal. Kami merancang alur belajar
            yang langsung menguji logika dan tanganmu.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: 14 Modul Runtut */}
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={willChangeTransform}
            className="bg-[#d5f5c2] border-2 border-[#1a3300] rounded-[14px] p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 bg-[#fcfaf5] border border-[#1a3300] rounded-[6px] flex items-center justify-center mb-4 text-[#1a3300]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-inter font-bold text-lg text-[#1a3300] mb-2">
                14 Modul Terstruktur
              </h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/85 leading-relaxed">
                Tahu persis harus belajar apa berikutnya. Dari variabel, operator,
                loop, hingga OOP kompleks (inheritance, polymorphism, interface, exception).
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#1a3300]/20 text-[11px] font-mono text-[#1a3300]/70">
              Level 1 Dasar → Level 7 Collections
            </div>
          </motion.div>

          {/* Card 2: Mode Baca Terarah */}
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={willChangeTransform}
            className="bg-[#ffe95c]/50 border-2 border-[#1a3300] rounded-[14px] p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 bg-[#fcfaf5] border border-[#1a3300] rounded-[6px] flex items-center justify-center mb-4 text-[#1a3300]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-inter font-bold text-lg text-[#1a3300] mb-2">
                Mode Baca Terarah
              </h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/85 leading-relaxed">
                Anti-lelah membaca artikel ribuan piksel. Materi dipecah per bab
                pendek (*bite-sized*) lengkap dengan tabel perbandingan dan use case nyata.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#1a3300]/20 text-[11px] font-mono text-[#1a3300]/70">
              Bab terfokus + ringkasan visual
            </div>
          </motion.div>

          {/* Card 3: Drag & Drop */}
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={willChangeTransform}
            className="bg-[#a8e5e5] border-2 border-[#1a3300] rounded-[14px] p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 bg-[#fcfaf5] border border-[#1a3300] rounded-[6px] flex items-center justify-center mb-4 text-[#1a3300]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-inter font-bold text-lg text-[#1a3300] mb-2">
                Latihan Drag & Drop
              </h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/85 leading-relaxed">
                Latih nalar alur kode sebelum mengetik dari nol. Susun potongan kode
                dan baca penjelasan mendalam di balik susunan setiap barisnya.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#1a3300]/20 text-[11px] font-mono text-[#1a3300]/70">
              Verifikasi urutan + penjelasan solusi
            </div>
          </motion.div>

          {/* Card 4: Function Code Judge */}
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={willChangeTransform}
            className="bg-[#f6d0ff] border-2 border-[#1a3300] rounded-[14px] p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 bg-[#fcfaf5] border border-[#1a3300] rounded-[6px] flex items-center justify-center mb-4 text-[#1a3300]">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-inter font-bold text-lg text-[#1a3300] mb-2">
                Coding Auto-Judge
              </h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/85 leading-relaxed">
                Langsung tulis badan method di editor Monaco (engine VS Code).
                Diuji otomatis dengan test case terlihat dan tersembunyi.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#1a3300]/20 text-[11px] font-mono text-[#1a3300]/70">
              Tanpa boilerplate main()
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMPARISON TABLE: CARA LAMA VS KODERA */}
      <section className="w-full py-14 px-4 sm:px-6 max-w-[1200px] mx-auto">
        <div className="bg-white border-2 border-[#1a3300] rounded-[16px] p-6 sm:p-10 shadow-2xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-bricolage text-2xl sm:text-3xl font-extrabold text-[#1a3300]">
              Perbandingan: Cara Belajar Konvensional vs Kodera
            </h2>
            <p className="text-xs sm:text-sm text-[#1a3300]/75 mt-1.5">
              Kenapa cara belajar di Kodera lebih hemat waktu dan praktis untuk mahasiswa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Hard Way */}
            <div className="p-5 sm:p-6 bg-[#fcfaf5] border border-[#b6b6b6] rounded-[12px] space-y-3.5">
              <div className="font-bold text-sm text-[#cb5521] uppercase tracking-wider font-mono flex items-center gap-1.5">
                <X className="w-4 h-4 text-[#cb5521]" />
                <span>Cara Belajar Biasa</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#1a3300]/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#cb5521] font-bold">✕</span>
                  <span>Menonton video tutorial berjam-jam, tapi begitu buka IDE bingung mau mulai ngetik apa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#cb5521] font-bold">✕</span>
                  <span>Ribet instal JDK, setting PATH environment variable, dan bingung debug error sistem.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#cb5521] font-bold">✕</span>
                  <span>Dokumentasi teks panjang monoton tanpa sarana langsung untuk menguji nalar alur kode.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#cb5521] font-bold">✕</span>
                  <span>Harus nulis boilerplate `public static void main` cuma buat tes fungsi sederhana.</span>
                </li>
              </ul>
            </div>

            {/* The Kodera Way */}
            <div className="p-5 sm:p-6 bg-[#d5f5c2]/40 border-2 border-[#1a3300] rounded-[12px] space-y-3.5">
              <div className="font-bold text-sm text-[#1a3300] uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#1a3300]" />
                <span>Cara Belajar di Kodera</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#1a3300] font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-[#1a3300] font-bold">✓</span>
                  <span>Teori dirangkum per bab pendek (*bite-sized*) dan langsung disambut latihan interaktif.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1a3300] font-bold">✓</span>
                  <span>100% jalan di browser, buka laptop langsung latihan tanpa instalasi apa pun.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1a3300] font-bold">✓</span>
                  <span>Latihan drag & drop melatih pemahaman logika sebelum kamu mulai coding mandiri.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1a3300] font-bold">✓</span>
                  <span>Cukup implementasikan satu method (function harness otomatis), langsung dinilai test case.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SYLLABUS ROADMAP PREVIEW (7 Progression Levels) */}
      <section className="w-full py-16 px-4 sm:px-6 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-bricolage text-3xl sm:text-4xl font-extrabold text-[#1a3300] text-pretty">
              Perjalanan 7 Tingkatan Belajar Java
            </h2>
            <p className="text-sm text-[#1a3300]/80 mt-1">
              Disusun bertahap dari konsep paling mendasar menuju abstraksi arsitektur software.
            </p>
          </div>
          <Link
            href="/java"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a3300] hover:underline"
          >
            <span>Buka Silabus Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Progression grid preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {JAVA_COURSE_DATA.modules.slice(0, 6).map((mod) => (
            <motion.div
              key={mod.id}
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              style={willChangeTransform}
            >
              <Link
                href={`/java/${mod.slug}/${mod.lessons[0]?.slug || ""}`}
                className="h-full bg-white border border-[#b6b6b6] hover:border-[#1a3300] rounded-[12px] p-5 transition-colors group flex flex-col justify-between shadow-2xs hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-[#fcfaf5] text-[#1a3300] rounded-[4px] border border-[#b6b6b6]">
                      Modul {mod.order}
                    </span>
                    <span className="text-xs font-mono text-[#1a3300]/60">
                      {mod.levelName.split(" — ")[0]}
                    </span>
                  </div>
                  <h3 className="font-inter font-bold text-lg text-[#1a3300] group-hover:text-[#1a3300] mb-2 flex items-center justify-between">
                    <span>{mod.title}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-[#1a3300]/70 line-clamp-2 leading-relaxed">
                    {mod.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f1f1f1] flex items-center justify-between text-xs font-mono text-[#1a3300]/80">
                  <span>{mod.lessons.length} Pelajaran</span>
                  <span className="text-[#cb5521] font-semibold">+40 XP</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all modules callout */}
        <div className="mt-6 p-4 bg-[#fcfaf5] border-2 border-[#1a3300] rounded-[12px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#1a3300]">
            <GraduationCap className="w-5 h-5 shrink-0" />
            <span>
              Tersedia <strong>14 modul komplit</strong> hingga Exception Handling & Collections (ArrayList, HashMap).
            </span>
          </div>
          <Link
            href="/java"
            className="px-4 py-2 bg-[#1a3300] text-[#fcfaf5] text-xs font-semibold rounded-[6px] shrink-0 hover:bg-[#1a3300]/90 transition-colors"
          >
            → Lihat Semua 14 Modul
          </Link>
        </div>
      </section>

      {/* DEVELOPER STORY / CONTEXT BANNER */}
      <section className="w-full py-16 px-4 sm:px-6 max-w-[1200px] mx-auto">
        <div className="bg-[#ffe95c]/30 border-2 border-[#1a3300] rounded-[16px] p-8 sm:p-12 relative">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a3300]/70 mb-2">
              Cerita di Balik Kodera
            </div>
            <h2 className="font-bricolage text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a3300] tracking-tight text-pretty">
              &quot;Dibuat karena materi kuliah Java sering gampang lupa kalau cuma dibaca.&quot;
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#1a3300]/85 leading-relaxed">
              Dokumentasi di internet sering kali terlalu teoritis atau malah terlalu rumit
              tanpa latihan yang menguji pemahaman konsep seperti method, constructor,
              overriding, dan polimorfisme. Kodera hadir sebagai wadah belajar santai
              tapi terarah untuk saya dan teman-teman kampus saling asah nalar coding.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1a3300] text-[#fcfaf5] rounded-full flex items-center justify-center font-bold text-sm font-bricolage">
                U
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#1a3300]">Muhammad Syafi&apos;ul Umam</div>
                <div className="text-[#1a3300]/70">Mahasiswa IT & Creator Kodera</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="w-full py-14 px-4 sm:px-6 max-w-[1200px] mx-auto text-center">
        <div className="bg-[#1a3300] text-[#fcfaf5] rounded-[16px] p-10 sm:p-14 flex flex-col items-center">
          <h2 className="font-bricolage text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-2xl text-pretty">
            Siap tingkatkan kemampuan Java-mu hari ini?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#fcfaf5]/85 max-w-lg leading-relaxed">
            Mulai dari Modul 1 Variabel & Tipe Data, susun alur kodenya, dan rasakan
            sensasi status Accepted saat kamu berhasil menyelesaikan soal coding pertamamu.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/java/variabel-dan-tipe-data/pengenalan-variabel"
              className="px-8 py-3.5 bg-[#ffe95c] text-[#1a3300] font-bold text-sm rounded-[6px] hover:bg-[#ffe95c]/90 transition-colors flex items-center gap-2 shadow-xs focus-visible:ring-2 focus-visible:ring-white"
              style={{ touchAction: "manipulation" }}
            >
              <span>Mulai Latihan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3.5 border border-[#fcfaf5]/40 text-[#fcfaf5] text-sm font-medium rounded-[6px] hover:bg-[#fcfaf5]/10 transition-colors focus-visible:ring-2 focus-visible:ring-white"
              style={{ touchAction: "manipulation" }}
            >
              Cek Dashboard XP
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
