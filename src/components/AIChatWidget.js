import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Send, MessageCircle } from "lucide-react";

export default function AIChatWidget({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "สวัสดีค่ะ มีเรื่องอะไรกวนใจ หรืออยากเล่าให้เราฟังไหมคะ? พื้นที่นี้ปลอดภัยเสมอ 💚",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // คลังคำตอบจำลองของ AI เชิงให้กำลังใจ
  const aiResponses = [
    "เราเข้าใจความรู้สึกของคุณนะ ไม่เป็นไรเลยที่จะรู้สึกแบบนี้",
    "เก่งมากแล้วที่ผ่านวันนี้มาได้ พักผ่อนเยอะๆ นะคะ",
    "ลองสูดหายใจลึกๆ ดูนะ เราอยู่ตรงนี้เป็นเพื่อนคุณเสมอ",
    "ทุกอย่างจะค่อยๆ ดีขึ้น ให้เวลาตัวเองหน่อยนะคะ 🌿",
    "มีอะไรอยากระบายอีกไหม เราพร้อมรับฟังเสมอค่ะ",
    "วันนี้คุณอาจจะเหนื่อยล้า แต่พรุ่งนี้จะเป็นวันใหม่ที่สดใสกว่าเดิมนะ",
    "อย่าลืมใจดีกับตัวเองบ้างนะ คุณมีค่ามากเลยรู้ไหม 😊",
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // เพิ่มข้อความผู้ใช้
    const newUserMsg = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputText("");
    setIsTyping(true);

    // จำลองการตอบกลับของ AI (หน่วงเวลา 1.5 วิ)
    setTimeout(() => {
      const randomReply =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages((prev) => [...prev, { sender: "ai", text: randomReply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 h-96 bg-[#283618] border border-[#a3b18a]/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-[#3a5a40] p-4 flex justify-between items-center border-b border-[#a3b18a]/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#588157] flex items-center justify-center">
                  <Heart size={16} className="text-[#dad7cd]" />
                </div>
                <span className="font-semibold text-[#dad7cd]">
                  AI Heart Mate
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#a3b18a] hover:text-[#dad7cd]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl text-sm max-w-[85%] ${
                    msg.sender === "user"
                      ? "bg-[#588157] text-[#dad7cd] self-end rounded-tr-none"
                      : "bg-[#3a5a40]/50 text-[#dad7cd] self-start rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {/* Animation กำลังพิมพ์ */}
              {isTyping && (
                <div className="bg-[#3a5a40]/50 self-start p-3 rounded-2xl rounded-tl-none text-sm text-[#dad7cd] max-w-[85%] flex gap-1 items-center h-10 px-4">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="w-1.5 h-1.5 bg-[#a3b18a] rounded-full"
                  ></motion.div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-1.5 h-1.5 bg-[#a3b18a] rounded-full"
                  ></motion.div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-1.5 h-1.5 bg-[#a3b18a] rounded-full"
                  ></motion.div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSend}
              className="p-3 bg-[#3a5a40]/30 border-t border-[#a3b18a]/10 flex gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="พิมพ์ข้อความ..."
                className="flex-1 bg-[#344e41] border border-[#a3b18a]/30 rounded-full px-4 text-sm text-[#dad7cd] outline-none focus:border-[#a3b18a] transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="w-10 h-10 bg-[#588157] rounded-full flex items-center justify-center text-[#dad7cd] shrink-0 hover:bg-[#a3b18a] hover:text-[#344e41] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-[#588157] to-[#a3b18a] rounded-full flex items-center justify-center text-[#283618] shadow-[0_0_20px_rgba(88,129,87,0.4)] hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
