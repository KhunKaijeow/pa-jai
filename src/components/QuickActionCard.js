import React from "react";

export default function QuickActionCard({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#3a5a40]/40 border border-[#a3b18a]/20 rounded-3xl p-6 md:p-8 hover:bg-[#588157]/30 transition-colors cursor-pointer group flex flex-col h-full"
    >
      <div className="mb-6 bg-[#344e41] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-[#a3b18a]/20 group-hover:scale-110 transition-transform shadow-lg">
        {icon}
      </div>
      <h4 className="font-semibold text-lg md:text-xl text-[#dad7cd] mb-2">
        {title}
      </h4>
      <p className="text-sm text-[#a3b18a] leading-relaxed">{desc}</p>
    </div>
  );
}
