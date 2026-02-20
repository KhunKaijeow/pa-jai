import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";

export default function LoginView({ onNavigate, onLogin, user, onLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // แก้ไข: ตัดช่องว่างซ้ายขวาของชื่อผู้ใช้ออก เพื่อป้องกันการพิมพ์ผิด
    const trimmedUsername = username.trim();

    if (trimmedUsername === "admin" && password === "admin") {
      onLogin({ username: "Admin", role: "admin" });
      onNavigate("home");
    } else if (trimmedUsername) {
      onLogin({ username: trimmedUsername, role: "user" });
      onNavigate("home");
    }
  };

  if (user) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center h-full pt-10 w-full px-6"
      >
        <div className="bg-[#3a5a40]/50 border border-[#a3b18a]/20 rounded-3xl p-8 md:p-12 w-full max-w-md text-center shadow-2xl">
          <div className="w-20 h-20 bg-[#588157]/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={40} className="text-[#dad7cd]" />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-[#dad7cd]">
            สวัสดี, {user.username}
          </h3>
          <p className="text-[#a3b18a] mb-8">
            สถานะ:{" "}
            {user.role === "admin" ? "ผู้ดูแลระบบ (Admin)" : "ผู้ใช้งานทั่วไป"}
          </p>

          {user.role === "admin" && (
            <button
              onClick={() => onNavigate("admin")}
              className="w-full py-3 mb-4 bg-[#a3b18a] text-[#344e41] font-semibold rounded-xl hover:bg-[#dad7cd] transition-colors flex items-center justify-center gap-2"
            >
              <Settings size={18} /> แผงควบคุมผู้ดูแลระบบ
            </button>
          )}

          <button
            onClick={onLogout}
            className="w-full py-3 border border-[#a3b18a]/30 text-[#dad7cd] font-semibold rounded-xl hover:bg-[#588157]/30 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={18} /> ออกจากระบบ
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full pt-10 w-full px-6"
    >
      <div className="bg-[#3a5a40]/50 border border-[#a3b18a]/20 rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-[#dad7cd]">
            เข้าสู่ระบบ
          </h3>
          <p className="text-[#a3b18a] text-sm">ยินดีต้อนรับสู่พื้นที่พักใจ</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-[#a3b18a] mb-2">
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#344e41]/80 border border-[#a3b18a]/30 rounded-xl p-3 text-[#dad7cd] outline-none focus:border-[#a3b18a]"
              placeholder="กรอกชื่อผู้ใช้..."
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-[#a3b18a] mb-2">
              รหัสผ่าน
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#344e41]/80 border border-[#a3b18a]/30 rounded-xl p-3 text-[#dad7cd] outline-none focus:border-[#a3b18a]"
              placeholder="กรอกรหัสผ่าน..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#588157] text-[#dad7cd] font-semibold rounded-xl hover:bg-[#a3b18a] hover:text-[#344e41] transition-colors"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#a3b18a]/70 p-4 bg-[#344e41]/40 rounded-xl">
          <p className="mb-1">
            <strong>สำหรับการทดสอบ:</strong>
          </p>
          <p>
            ล็อกอิน <strong>Admin:</strong> admin / admin
          </p>
          <p>
            ล็อกอิน <strong>User:</strong> ใส่ชื่ออะไรก็ได้
          </p>
        </div>
      </div>
    </motion.div>
  );
}
