import React from "react";
import { motion } from "framer-motion";

export function DesktopNavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isActive ? "text-[#dad7cd] bg-[#588157]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" : "text-[#a3b18a] hover:text-[#dad7cd] hover:bg-[#3a5a40]/50"}`}
    >
      {icon}
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </button>
  );
}

export function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-all ${isActive ? "text-[#dad7cd]" : "text-[#a3b18a] hover:text-[#dad7cd]"}`}
    >
      <motion.div animate={{ y: isActive ? -2 : 0 }} className="relative">
        {icon}
        {isActive && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#a3b18a] rounded-full"
          />
        )}
      </motion.div>
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );
}
