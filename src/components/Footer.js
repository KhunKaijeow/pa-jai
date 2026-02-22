import React from "react";
import { Leaf, Mail, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { teamMembers } from "../constants/mockData";

export function Footer({ showTeam = false }) {
  return (
    <footer className="mt-20 relative w-full">
      {/* Decorative Wave Design */}
      <svg
        className="absolute -top-12 md:-top-24 w-full h-12 md:h-24 text-[#283618]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 74"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,0 C240,74 480,74 720,37 C960,0 1200,0 1440,37 L1440,74 L0,74 Z" />
      </svg>

      <div className="bg-[#283618] pt-12 pb-32 md:pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {showTeam && (
            <div className="mb-20">
              <div className="flex flex-col items-center mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-[1px] w-8 bg-[#a3b18a]/30" />
                  <span className="text-[#a3b18a] text-sm font-medium uppercase tracking-[0.2em]">
                    Our Team
                  </span>
                  <div className="h-[1px] w-8 bg-[#a3b18a]/30" />
                </div>
                <h3 className="text-3xl font-bold text-[#dad7cd]">
                  ทีมผู้พัฒนาพาใจ
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
                {teamMembers.map((member, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 border-2 border-[#a3b18a]/20 group-hover:border-[#a3b18a]/50 transition-all duration-300 shadow-lg group-hover:scale-105">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-[#dad7cd] font-semibold text-sm mb-1 leading-tight group-hover:text-[#a3b18a] transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-[#a3b18a] text-xs opacity-70">
                      ({member.nickname})
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-20 border-t border-[#a3b18a]/10" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf size={24} className="text-[#a3b18a]" />
                <h2 className="text-2xl font-bold text-[#dad7cd]">
                  พาใจ PA-JAI
                </h2>
              </div>
              <p className="text-[#a3b18a] mb-6 max-w-sm font-light">
                Mental Wellness Companion
                <br />
                พื้นที่ปลอดภัยและเพื่อนคู่คิดในการดูแลสุขภาพใจของคุณ
              </p>
            </div>

            {/* Newsletter */}
            <div className="bg-[#3a5a40]/20 p-6 rounded-[2rem] border border-[#a3b18a]/10 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-[#dad7cd] mb-2 flex items-center gap-2">
                <Mail size={20} className="text-[#a3b18a]" />{" "}
                จดหมายน้อยถึงตัวเอง
              </h3>
              <p className="text-sm text-[#a3b18a] mb-4 font-light">
                ลงทะเบียนรับอีเมลฮีลใจและเรื่องราวดีๆ ประจำสัปดาห์
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="อีเมลของคุณ..."
                  className="flex-1 bg-[#344e41] border border-[#a3b18a]/30 rounded-2xl px-4 py-2 text-[#dad7cd] outline-none text-sm focus:border-[#a3b18a] transition-colors"
                />
                <button className="px-6 py-2 bg-[#588157] text-[#dad7cd] rounded-2xl hover:bg-[#a3b18a] hover:text-[#344e41] font-semibold transition-all shadow-lg active:scale-95">
                  ส่ง
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-[#a3b18a]/10 text-center text-[#a3b18a]/40 text-[10px] tracking-widest uppercase">
            &copy; 2026 Pajai Platform. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export function CompactFooter() {
  return (
    <footer className="mt-20 relative w-full z-20 pb-32 md:pb-12 px-6">
      <div className="max-w-4xl mx-auto bg-[#3a5a40]/40 border border-[#a3b18a]/20 backdrop-blur-xl rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
        {/* Background soft glow */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#588157]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#588157]/30 transition-colors duration-700"></div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-[#344e41] rounded-full border border-[#a3b18a]/30">
              <Leaf size={18} className="text-[#a3b18a]" />
            </div>
            <h2 className="text-xl font-bold text-[#dad7cd] tracking-wide">
              พาใจ PA-JAI
            </h2>
          </div>
          <p className="text-[#a3b18a] text-sm max-w-xs leading-relaxed">
            ให้เราเป็นพื้นที่ปลอดภัยในวันที่คุณเหนื่อยล้า...
            <br />
            พักผ่อนให้เต็มที่ แล้วค่อยเริ่มใหม่นะ 🌿
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end z-10">
          <div className="flex items-start gap-3 bg-[#344e41]/80 p-4 rounded-2xl border border-[#a3b18a]/20 mb-4 max-w-sm shadow-inner">
            <Quote
              size={20}
              className="text-[#588157] shrink-0 mt-1 opacity-50"
            />
            <p className="text-[#dad7cd] text-sm italic leading-relaxed">
              "ไม่ว่าวันนี้จะเจอกับอะไร ขอให้คืนนี้หลับฝันดี
              และตื่นมาพบกับเช้าที่ใจดีกับคุณนะ"
            </p>
          </div>
          <div className="text-[#a3b18a]/50 text-xs tracking-wide">
            &copy; 2026 Pajai Platform. Take your time, there is no rush.
          </div>
        </div>
      </div>
    </footer>
  );
}
