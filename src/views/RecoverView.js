import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { breathingExercises } from "../constants/mockData";

export default function RecoverView() {
  const [selectedId, setSelectedId] = useState("4-7-8");
  const [isActive, setIsActive] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [prepTimeLeft, setPrepTimeLeft] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const exercise = breathingExercises.find((e) => e.id === selectedId);
  const currentPhase =
    isActive && !isPreparing ? exercise.phases[phaseIndex] : null;

  useEffect(() => {
    if (isPreparing && prepTimeLeft > 0) {
      const timer = setTimeout(() => setPrepTimeLeft((p) => p - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isPreparing && prepTimeLeft === 0) {
      setIsPreparing(false);
      setPhaseIndex(0);
      setTimeLeft(exercise.phases[0].duration);
      setIsActive(true);
    }
  }, [isPreparing, prepTimeLeft, exercise]);

  useEffect(() => {
    if (!isActive || isPreparing) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isActive, isPreparing, phaseIndex]);

  useEffect(() => {
    if (!isActive || isPreparing) return;
    if (timeLeft <= 0) {
      const nextIndex = (phaseIndex + 1) % exercise.phases.length;
      setPhaseIndex(nextIndex);
      setTimeLeft(exercise.phases[nextIndex].duration);
    }
  }, [timeLeft, isActive, isPreparing, phaseIndex, exercise]);

  const handleStart = () => {
    setIsPreparing(true);
    setPrepTimeLeft(5);
  };

  const handleStop = () => {
    setIsPreparing(false);
    setIsActive(false);
    setPhaseIndex(0);
    setTimeLeft(0);
    setPrepTimeLeft(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full pt-4 items-center w-full px-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-4xl font-semibold mb-2">มุมพักหายใจ</h3>
        <p className="text-[#a3b18a] text-sm md:text-base">
          เลือกจังหวะการหายใจเพื่อลดความเครียดทันที
        </p>
      </div>

      {!isActive && !isPreparing ? (
        <div className="flex flex-col items-center w-full max-w-4xl mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
            {breathingExercises.map((ex) => (
              <motion.div
                key={ex.id}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedId(ex.id)}
                className={`p-8 rounded-[40px] border-2 transition-all cursor-pointer flex flex-col justify-center items-center text-center relative overflow-hidden group ${
                  selectedId === ex.id
                    ? "bg-[#588157]/30 border-[#a3b18a] shadow-2xl"
                    : "bg-[#3a5a40]/40 border-[#a3b18a]/10 hover:border-[#a3b18a]/30"
                }`}
              >
                {selectedId === ex.id && (
                  <motion.div
                    layoutId="active-bg"
                    className="absolute inset-0 bg-gradient-to-br from-[#a3b18a]/10 to-transparent pointer-events-none"
                  />
                )}
                <h4
                  className={`font-bold text-xl mb-3 transition-colors ${selectedId === ex.id ? "text-[#dad7cd]" : "text-[#dad7cd]/60"}`}
                >
                  {ex.name}
                </h4>
                <p className="text-sm text-[#a3b18a] leading-relaxed opacity-80">
                  {ex.desc}
                </p>
                <div className="mt-4 flex gap-1">
                  {ex.phases.map((p, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#a3b18a]/40"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              shadow: "0 0 50px rgba(163, 177, 138, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="group relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#588157] to-[#3a5a40] text-[#dad7cd] font-bold text-2xl flex items-center justify-center shadow-2xl hover:text-white transition-all overflow-hidden"
          >
            <span className="relative z-10">เริ่มพัก</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-[#a3b18a]/30 rounded-full scale-90"
            />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>
      ) : isPreparing ? (
        <div className="flex flex-col items-center flex-1 justify-center relative w-full mt-10 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 text-center text-[#a3b18a] tracking-[0.3em] uppercase text-xs font-bold"
          >
            {exercise.name}
          </motion.div>

          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-[#a3b18a]/20 rounded-[40%] blur-sm"
            />

            <div className="relative z-10 text-center">
              <motion.div
                key={prepTimeLeft}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-8xl md:text-[120px] font-thin text-[#dad7cd] tabular-nums"
              >
                {prepTimeLeft}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm md:text-base text-[#a3b18a] uppercase tracking-widest mt-6 font-medium"
              >
                เตรียมพร้อมรับความสงบ...
              </motion.div>
            </div>
          </div>

          <button
            onClick={handleStop}
            className="mt-20 md:mt-24 text-[#a3b18a]/60 hover:text-rose-400 text-sm tracking-widest uppercase transition-colors z-10"
          >
            ยกเลิกกิจกรรม
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center flex-1 justify-center relative w-full mt-10 md:mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0 text-center text-[#a3b18a]/60 tracking-[0.3em] uppercase text-xs font-bold"
          >
            {exercise.name}
          </motion.div>

          <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] flex items-center justify-center">
            {/* Organic Blob Layers */}
            <AnimatePresence mode="wait">
              <motion.div
                key={phaseIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale:
                    currentPhase?.action === "in"
                      ? 1.5
                      : currentPhase?.action === "hold"
                        ? 1.5
                        : 1,
                  opacity: 1,
                }}
                transition={{
                  duration: currentPhase?.duration || 1,
                  ease: "easeInOut",
                }}
                className={`absolute inset-0 rounded-full blur-[60px] md:blur-[100px] transition-colors duration-1000 ${
                  currentPhase?.action === "in"
                    ? "bg-[#a3b18a]/40"
                    : currentPhase?.action === "hold"
                      ? "bg-[#dda15e]/30"
                      : "bg-[#588157]/40"
                }`}
              />
            </AnimatePresence>

            {/* Pulsing Core Rings */}
            {[1, 0.8, 0.6].map((scale, i) => (
              <motion.div
                key={i}
                animate={{
                  scale:
                    (currentPhase?.action === "in"
                      ? 1.4
                      : currentPhase?.action === "hold"
                        ? 1.4
                        : 1) * scale,
                  borderRadius: ["40%", "50%", "45%", "50%"],
                  rotate: [0, 45, -45, 0],
                }}
                transition={{
                  scale: {
                    duration: currentPhase?.duration || 1,
                    ease: "easeInOut",
                  },
                  borderRadius: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                }}
                className={`absolute inset-0 border border-[#dad7cd]/10 pointer-events-none opacity-${30 - i * 10}`}
              />
            ))}

            <div className="relative z-10 text-center">
              <motion.div
                key={timeLeft}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-8xl md:text-[140px] font-thin text-[#dad7cd] tabular-nums drop-shadow-2xl"
              >
                {timeLeft > 0 ? timeLeft : 1}
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase?.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="text-xl md:text-3xl text-[#dad7cd] uppercase tracking-[0.4em] mt-8 font-light"
                >
                  {currentPhase?.label === "Inhale"
                    ? "หายใจเข้า"
                    : currentPhase?.label === "Hold"
                      ? "ค้างไว้"
                      : "หายใจออก"}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 md:mt-24"
          >
            <button
              onClick={handleStop}
              className="px-8 py-3 rounded-full border border-[#a3b18a]/20 text-[#a3b18a] hover:text-[#dad7cd] hover:border-[#a3b18a]/50 text-xs tracking-[0.2em] uppercase transition-all"
            >
              จบกิจกรรม
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
