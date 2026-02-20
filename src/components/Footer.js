import React from "react";
import { Leaf, Mail, Quote } from "lucide-react";

export function Footer() {
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf size={24} className="text-[#a3b18a]" />
              <h2 className="text-2xl font-bold text-[#dad7cd]">พาใจ PA-JAI</h2>
            </div>
            <p className="text-[#a3b18a] mb-6 max-w-sm">
              Mental Wellness Companion
              พื้นที่ปลอดภัยและเพื่อนคู่คิดในการดูแลสุขภาพใจของคุณ
            </p>
          </div>

          {/* Newsletter */}
          <div className="bg-[#3a5a40]/30 p-6 rounded-3xl border border-[#a3b18a]/10">
            <h3 className="text-xl font-semibold text-[#dad7cd] mb-2 flex items-center gap-2">
              <Mail size={20} className="text-[#a3b18a]" /> จดหมายน้อยถึงตัวเอง
            </h3>
            <p className="text-sm text-[#a3b18a] mb-4">
              ลงทะเบียนรับอีเมลฮีลใจและเรื่องราวดีๆ ประจำสัปดาห์
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="อีเมลของคุณ..."
                className="flex-1 bg-[#344e41] border border-[#a3b18a]/30 rounded-xl px-4 py-2 text-[#dad7cd] outline-none"
              />
              <button className="px-6 py-2 bg-[#588157] text-[#dad7cd] rounded-xl hover:bg-[#a3b18a] hover:text-[#344e41] font-medium transition-colors">
                ส่ง
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#a3b18a]/10 text-center text-[#a3b18a]/60 text-sm">
          &copy; 2026 Pajai Platform. All rights reserved.
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
