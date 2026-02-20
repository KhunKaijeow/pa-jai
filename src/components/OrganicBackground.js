import React from "react";
import { motion } from "framer-motion";

export default function OrganicBackground({ activeTab, currentMood }) {
  const getThemeColors = () => {
    // Dynamic based on mood
    if (currentMood === "lonely") return ["#f4a261", "#e76f51"]; // Peach / Warm
    if (currentMood === "burnout") return ["#e76f51", "#283618"]; // Burn orange / Dark green
    if (currentMood === "stressed") return ["#2a9d8f", "#264653"]; // Cool mint / Dark blue
    if (currentMood === "tired") return ["#a8dadc", "#457b9d"]; // Light blue / Soft mint

    // Dynamic based on Tab (Default)
    switch (activeTab) {
      case "blog":
        return ["#588157", "#3a5a40"];
      case "map":
        return ["#3a5a40", "#344e41"];
      case "recover":
        return ["#a3b18a", "#588157"];
      case "presentation":
        return ["#3a5a40", "#588157"];
      default:
        return ["#588157", "#a3b18a"];
    }
  };

  const colors = getThemeColors();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000">
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      <motion.div
        animate={{
          backgroundColor: colors[0],
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen filter blur-[120px] opacity-30"
      />
      <motion.div
        animate={{
          backgroundColor: colors[1],
          scale: [1, 1.5, 1],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[150px] opacity-30"
      />
    </div>
  );
}
