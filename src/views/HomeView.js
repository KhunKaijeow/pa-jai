import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Sparkles,
  BookOpen,
  Wind,
  MonitorPlay,
  BarChart2,
  Map as MapIcon,
} from "lucide-react";
import QuickActionCard from "../components/QuickActionCard";
import PresentationMode from "./PresentationMode";
import { moods } from "../constants/mockData";

export default function HomeView({
  onNavigate,
  showPresentation,
  setShowPresentation,
  currentMood,
  setCurrentMood,
  user,
  userMoodData,
  setIsAIChatOpen,
}) {
  const [isHugHovered, setIsHugHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col h-full w-full max-w-7xl mx-auto px-6 pt-4 md:pt-10 pb-10"
    >
      {/* ... (keep existing sections 1, 2, 3) */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12 border-b border-[#a3b18a]/20 pb-10">
        <div className="flex-1 max-w-2xl w-full">
          {/* Interactive Hug */}
          <div
            className="inline-block mb-4 px-4 py-2 rounded-full bg-[#3a5a40]/60 border border-[#a3b18a]/30 cursor-pointer select-none transition-all duration-300 min-w-[280px] text-center"
            onMouseEnter={() => setIsHugHovered(true)}
            onMouseLeave={() => setIsHugHovered(false)}
            onTouchStart={() => setIsHugHovered(true)}
            onTouchEnd={() => setIsHugHovered(false)}
          >
            <span className="text-sm font-medium">
              {isHugHovered
                ? "💚 ไม่เป็นไรนะ... เราอยู่ตรงนี้เสมอ"
                : "วันนี้โลกใจร้ายกับคุณหรือเปล่า?"}
            </span>
          </div>

          <motion.h2 className="text-4xl md:text-6xl font-light leading-tight mb-6">
            วันนี้ใจของคุณ <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#a3b18a] to-[#dad7cd]">
              เป็นอย่างไรบ้าง?
            </span>
          </motion.h2>

          {/* Mood Selector */}
          <div className="flex flex-wrap gap-3 mt-4">
            {moods.map((m) => (
              <button
                key={m.id}
                onClick={() =>
                  setCurrentMood(m.id === currentMood ? null : m.id)
                }
                className={`px-5 py-3 rounded-2xl border transition-all flex items-center gap-2 font-medium ${
                  currentMood === m.id
                    ? m.color.replace("/20", "/40") + " scale-105 shadow-lg"
                    : "bg-[#3a5a40]/40 border-[#a3b18a]/20 text-[#a3b18a] hover:bg-[#3a5a40]"
                }`}
              >
                <span className="text-xl">{m.emoji}</span> {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Healing Tools: Daily Whisper */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-[#3a5a40]/60 to-[#283618]/60 border border-[#a3b18a]/30 p-8 rounded-3xl shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-[#a3b18a]/10 group-hover:scale-110 transition-transform duration-500">
            <Quote size={120} />
          </div>
          <p className="text-xs font-semibold text-[#a3b18a] mb-4 uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={14} /> Daily Whisper
          </p>
          <p className="text-xl md:text-2xl text-[#dad7cd] font-medium leading-relaxed relative z-10">
            "บางครั้งการหยุดเดิน ก็ไม่ได้แปลว่ายอมแพ้
            แต่มันคือการอนุญาตให้ตัวเองได้พักหายใจ"
          </p>
        </div>
      </div>

      {/* 3. Engagement: Flowing Encouragement */}
      <div className="overflow-hidden bg-[#588157]/20 border-y border-[#a3b18a]/20 py-3 mb-12 -mx-6 px-6 relative w-[calc(100%+3rem)]">
        <div className="whitespace-nowrap animate-marquee flex gap-12 text-[#a3b18a] font-medium text-sm">
          <span>🌿 หายใจเข้าลึกๆ คุณทำดีที่สุดแล้ว</span>
          <span>✨ ไม่ต้องเก่งทุกเรื่องก็ได้ แค่มีความสุขก็พอ</span>
          <span>☕ ดื่มน้ำเยอะๆ และอย่าลืมใจดีกับตัวเอง</span>
          <span>💚 วันที่ยากลำบาก จะผ่านไปเสมอ</span>
          <span>🌿 หายใจเข้าลึกๆ คุณทำดีที่สุดแล้ว</span>
          <span>✨ ไม่ต้องเก่งทุกเรื่องก็ได้ แค่มีความสุขก็พอ</span>
          <span>☕ ดื่มน้ำเยอะๆ และอย่าลืมใจดีกับตัวเอง</span>
          <span>💚 วันที่ยากลำบาก จะผ่านไปเสมอ</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        {/* Core Actions Grid */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickActionCard
            icon={<BookOpen className="text-[#a3b18a]" />}
            title="Wellness Blog"
            desc="อ่านบทความฟื้นฟูจิตใจ"
            onClick={() => onNavigate("blog")}
          />
          <QuickActionCard
            icon={<Wind className="text-[#a3b18a]" />}
            title="มุมพักหายใจ"
            desc="ฝึกหายใจตามจังหวะ 4-7-8"
            onClick={() => onNavigate("recover")}
          />
          <QuickActionCard
            icon={<MapIcon className="text-[#a3b18a]" />}
            title="แผนที่พักใจ"
            desc="แนะนำสถานที่ฮีลใจ เชียงราย"
            onClick={() => onNavigate("map")}
          />
          <QuickActionCard
            icon={<MonitorPlay className="text-[#a3b18a]" />}
            title="Presentation"
            desc="โหมดนำเสนอภาพรวมโครงการ"
            onClick={() => setShowPresentation(true)}
          />
        </div>

        {/* 2. Healing Tools: Mood Analytics */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          {/* Mood Graph (Always visible) */}
          <div className="bg-[#3a5a40]/40 border border-[#a3b18a]/20 rounded-[32px] p-6 flex flex-col justify-between relative overflow-hidden h-full min-h-[320px]">
            {!user && (
              <div className="absolute inset-0 bg-[#344e41]/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center border border-[#a3b18a]/20">
                <BarChart2 size={24} className="text-[#dad7cd] mb-2" />
                <button
                  onClick={() => onNavigate("login")}
                  className="px-4 py-2 bg-[#a3b18a] text-[#344e41] rounded-xl text-xs font-bold hover:shadow-lg transition-all"
                >
                  Login to view details
                </button>
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-[#dad7cd] mb-1 flex items-center gap-2">
                <BarChart2 size={18} className="text-[#a3b18a]" /> Mood Graph
              </h3>
              <p className="text-[10px] text-[#a3b18a] mb-6 leading-relaxed">
                สถิติสุขภาพใจ 7 วันย้อนหลังของคุณ
              </p>
            </div>

            <div className="flex items-end justify-between h-24 gap-2 relative">
              {(user
                ? userMoodData[user.username] || [50, 60, 40, 70, 50, 80, 70]
                : [40, 60, 30, 80, 50, 90, 70]
              ).map((val, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 flex-1 group"
                >
                  <div className="w-full bg-[#283618]/40 rounded-t-md rounded-b-sm overflow-hidden relative h-full flex items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`w-full transition-all duration-500 rounded-t-md ${
                        i === 6 && user
                          ? "bg-gradient-to-t from-[#dda15e] to-[#f4a261] opacity-100 shadow-[0_0_15px_rgba(221,161,94,0.3)]"
                          : "bg-gradient-to-t from-[#3a5a40] to-[#a3b18a] opacity-40 group-hover:opacity-80"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[9px] ${i === 6 && user ? "text-[#dda15e] font-bold" : "text-[#a3b18a] opacity-60"}`}
                  >
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPresentation && (
          <PresentationMode onClose={() => setShowPresentation(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
