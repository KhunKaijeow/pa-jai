import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, Settings, Plus, MessageSquare, Trash2 } from "lucide-react";

export default function AdminView({
  user,
  posts,
  setPosts,
  spots,
  setSpots,
  setIsAdminPopupOpen,
}) {
  const [adminTab, setAdminTab] = useState("blogs");
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [newPostData, setNewPostData] = useState({
    title: "",
    snippet: "",
    coverImage: "",
    content: "",
  });

  // เพิ่ม State สำหรับฟอร์มสถานที่
  const [isAddingSpot, setIsAddingSpot] = useState(false);
  const [newSpotData, setNewSpotData] = useState({
    name: "",
    lat: "",
    lng: "",
    distance: "",
    crowded: "Low",
    category: "Nature",
  });

  if (!user || user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-10 text-center">
        <Lock size={48} className="text-rose-400 mb-4" />
        <h2 className="text-2xl font-bold text-rose-300 mb-2">
          ปฏิเสธการเข้าถึง
        </h2>
        <p className="text-[#a3b18a]">
          หน้านี้สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น
        </p>
      </div>
    );
  }

  const handleAddPostSubmit = (e) => {
    e.preventDefault();

    // แปลงข้อความที่เว้นบรรทัด ให้กลายเป็นบล็อก paragraph
    const paragraphs = newPostData.content
      .split("\n")
      .filter((p) => p.trim() !== "")
      .map((p) => ({ type: "paragraph", text: p }));

    const newPost = {
      id: Date.now(),
      title: newPostData.title || "บทความใหม่ไม่มีชื่อ",
      snippet: newPostData.snippet || "ไม่มีคำโปรย...",
      coverImage:
        newPostData.coverImage ||
        "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=800&q=80",
      content:
        paragraphs.length > 0
          ? paragraphs
          : [{ type: "paragraph", text: "ยังไม่มีเนื้อหา" }],
      likes: 0,
      likedByMe: false,
      date: "เมื่อสักครู่",
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setIsAddingPost(false);
    setIsAdminPopupOpen(false);
    setNewPostData({ title: "", snippet: "", coverImage: "", content: "" });
  };

  // ฟังก์ชันสำหรับจัดการการอัปโหลดรูปภาพ
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostData({ ...newPostData, coverImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSpotSubmit = (e) => {
    e.preventDefault();
    const newSpot = {
      id: Date.now(),
      name: newSpotData.name || "สถานที่ใหม่",
      lat: parseFloat(newSpotData.lat) || 19.9,
      lng: parseFloat(newSpotData.lng) || 99.8,
      distance: newSpotData.distance || "0.0 km",
      crowded: newSpotData.crowded,
      category: newSpotData.category,
    };
    setSpots([newSpot, ...spots]);
    setIsAddingSpot(false);
    setIsAdminPopupOpen(false);
    setNewSpotData({
      name: "",
      lat: "",
      lng: "",
      distance: "",
      crowded: "Low",
      category: "Nature",
    });
  };

  const deletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const deleteComment = (postId, commentId) => {
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments.filter((c) => c.id !== commentId),
          };
        }
        return p;
      }),
    );
  };

  const deleteSpot = (id) => {
    setSpots(spots.filter((s) => s.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full pt-4 w-full max-w-5xl mx-auto px-6 relative"
    >
      {/* Modal สำหรับเพิ่มบทความใหม่ */}
      <AnimatePresence>
        {isAddingPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#283618]/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#344e41] border border-[#a3b18a]/30 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-[#a3b18a]/20 bg-[#3a5a40]/50">
                <h3 className="text-xl font-semibold text-[#dad7cd]">
                  สร้างบทความใหม่
                </h3>
                <button
                  onClick={() => {
                    setIsAddingPost(false);
                    setIsAdminPopupOpen(false);
                  }}
                  className="text-[#a3b18a] hover:text-[#dad7cd]"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 scrollbar-hide">
                <form
                  id="addPostForm"
                  onSubmit={handleAddPostSubmit}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label className="block text-sm text-[#a3b18a] mb-2">
                      หัวข้อบทความ
                    </label>
                    <input
                      type="text"
                      required
                      value={newPostData.title}
                      onChange={(e) =>
                        setNewPostData({
                          ...newPostData,
                          title: e.target.value,
                        })
                      }
                      className="w-full bg-[#283618]/80 border border-[#a3b18a]/30 rounded-xl p-3 text-[#dad7cd] outline-none focus:border-[#a3b18a]"
                      placeholder="เช่น 5 วิธีคลายเครียด..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#a3b18a] mb-2">
                      คำโปรย (สั้นๆ)
                    </label>
                    <input
                      type="text"
                      required
                      value={newPostData.snippet}
                      onChange={(e) =>
                        setNewPostData({
                          ...newPostData,
                          snippet: e.target.value,
                        })
                      }
                      className="w-full bg-[#283618]/80 border border-[#a3b18a]/30 rounded-xl p-3 text-[#dad7cd] outline-none focus:border-[#a3b18a]"
                      placeholder="สรุปใจความสำคัญสั้นๆ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#a3b18a] mb-2">
                      รูปภาพหน้าปก
                    </label>
                    <div className="flex flex-col gap-3">
                      {/* อัปโหลดไฟล์จากเครื่อง */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="text-sm text-[#dad7cd] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#588157] file:text-[#dad7cd] hover:file:bg-[#a3b18a] hover:file:text-[#344e41] transition-colors cursor-pointer w-full bg-[#283618]/80 border border-[#a3b18a]/30 rounded-xl p-2"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-[#a3b18a] text-xs whitespace-nowrap">
                          หรือใส่ลิงก์ (URL):
                        </span>
                        <input
                          type="url"
                          value={newPostData.coverImage}
                          onChange={(e) =>
                            setNewPostData({
                              ...newPostData,
                              coverImage: e.target.value,
                            })
                          }
                          className="flex-1 bg-[#283618]/80 border border-[#a3b18a]/30 rounded-xl p-2 text-sm text-[#dad7cd] outline-none focus:border-[#a3b18a]"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    {/* ภาพตัวอย่าง (Preview) */}
                    {newPostData.coverImage && (
                      <div className="mt-4 w-full h-40 rounded-xl overflow-hidden border border-[#a3b18a]/30 relative group">
                        <img
                          src={newPostData.coverImage}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            type="button"
                            onClick={() =>
                              setNewPostData({ ...newPostData, coverImage: "" })
                            }
                            className="bg-[#283618]/80 text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/20 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-[#a3b18a] mb-2">
                      เนื้อหาบทความ (เว้นบรรทัดเพื่อแบ่งย่อหน้า)
                    </label>
                    <textarea
                      required
                      value={newPostData.content}
                      onChange={(e) =>
                        setNewPostData({
                          ...newPostData,
                          content: e.target.value,
                        })
                      }
                      className="w-full h-40 bg-[#283618]/80 border border-[#a3b18a]/30 rounded-xl p-3 text-[#dad7cd] outline-none focus:border-[#a3b18a] resize-none"
                      placeholder="พิมพ์เนื้อหาที่นี่..."
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="p-6 border-t border-[#a3b18a]/20 bg-[#3a5a40]/50 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsAddingPost(false);
                    setIsAdminPopupOpen(false);
                  }}
                  className="px-6 py-2 rounded-xl text-[#a3b18a] hover:bg-[#a3b18a]/10 font-medium transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  form="addPostForm"
                  className="px-6 py-2 bg-[#588157] text-[#dad7cd] rounded-xl hover:bg-[#a3b18a] hover:text-[#344e41] font-medium transition-colors"
                >
                  บันทึกบทความ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isAddingSpot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#283618]/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#344e41] border border-[#a3b18a]/30 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-[#a3b18a]/20 bg-[#3a5a40]/50">
                <h3 className="text-xl font-semibold text-[#dad7cd]">
                  เพิ่มสถานที่ใหม่
                </h3>
                <button
                  onClick={() => {
                    setIsAddingSpot(false);
                    setIsAdminPopupOpen(false);
                  }}
                  className="text-[#a3b18a] hover:text-[#dad7cd]"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 scrollbar-hide">
                <form
                  id="addSpotForm"
                  onSubmit={handleAddSpotSubmit}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label className="block text-sm text-[#a3b18a] mb-2">
                      ชื่อสถานที่
                    </label>
                    <input
                      type="text"
                      required
                      value={newSpotData.name}
                      onChange={(e) =>
                        setNewSpotData({ ...newSpotData, name: e.target.value })
                      }
                      className="w-full bg-[#283618]/80 border border-[#a3b18a]/30 rounded-xl p-3 text-[#dad7cd] outline-none focus:border-[#a3b18a]"
                      placeholder="เช่น ลานกางเต็นท์..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#a3b18a] mb-2">
                        ละติจูด (Latitude)
                      </label>
                      <input
                        type="number"
                        step="any"
                        required
                        value={newSpotData.lat}
                        onChange={(e) =>
                          setNewSpotData({
                            ...newSpotData,
                            lat: e.target.value,
                          })
                        }
                        className="w-full bg-[#283618]/80 border border-[#a3b18a]/30 rounded-xl p-3 text-[#dad7cd] outline-none focus:border-[#a3b18a]"
                        placeholder="เช่น 19.9..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#a3b18a] mb-2">
                        ลองจิจูด (Longitude)
                      </label>
                      <input
                        type="number"
                        step="any"
                        required
                        value={newSpotData.lng}
                        onChange={(e) =>
                          setNewSpotData({
                            ...newSpotData,
                            lng: e.target.value,
                          })
                        }
                        className="w-full bg-[#283618]/80 border border-[#a3b18a]/30 rounded-xl p-3 text-[#dad7cd] outline-none focus:border-[#a3b18a]"
                        placeholder="เช่น 99.8..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#a3b18a] mb-2">
                      ระยะทางอ้างอิง
                    </label>
                    <input
                      type="text"
                      value={newSpotData.distance}
                      onChange={(e) =>
                        setNewSpotData({
                          ...newSpotData,
                          distance: e.target.value,
                        })
                      }
                      className="w-full bg-[#283618]/80 border border-[#a3b18a]/30 rounded-xl p-3 text-[#dad7cd] outline-none focus:border-[#a3b18a]"
                      placeholder="เช่น 5.2 km"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#a3b18a] mb-2">
                        ความพลุกพล่าน (Traffic)
                      </label>
                      <select
                        value={newSpotData.crowded}
                        onChange={(e) =>
                          setNewSpotData({
                            ...newSpotData,
                            crowded: e.target.value,
                          })
                        }
                        className="w-full bg-[#283618]/80 border border-[#a3b18a]/30 rounded-xl p-3 text-[#dad7cd] outline-none focus:border-[#a3b18a] appearance-none"
                      >
                        <option value="Low">น้อย (Low)</option>
                        <option value="Medium">ปานกลาง (Medium)</option>
                        <option value="High">มาก (High)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-[#a3b18a] mb-2">
                        หมวดหมู่ (Category)
                      </label>
                      <select
                        value={newSpotData.category}
                        onChange={(e) =>
                          setNewSpotData({
                            ...newSpotData,
                            category: e.target.value,
                          })
                        }
                        className="w-full bg-[#283618]/80 border border-[#a3b18a]/30 rounded-xl p-3 text-[#dad7cd] outline-none focus:border-[#a3b18a] appearance-none"
                      >
                        <option value="Nature">ธรรมชาติ (Nature)</option>
                        <option value="Cafe">คาเฟ่ (Cafe)</option>
                        <option value="Quiet">เงียบสงบ (Quiet)</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="p-6 border-t border-[#a3b18a]/20 bg-[#3a5a40]/50 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsAddingSpot(false);
                    setIsAdminPopupOpen(false);
                  }}
                  className="px-6 py-2 rounded-xl text-[#a3b18a] hover:bg-[#a3b18a]/10 font-medium transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  form="addSpotForm"
                  className="px-6 py-2 bg-[#588157] text-[#dad7cd] rounded-xl hover:bg-[#a3b18a] hover:text-[#344e41] font-medium transition-colors"
                >
                  บันทึกสถานที่
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl md:text-4xl font-semibold mb-2 flex items-center gap-3">
            <Settings className="text-[#a3b18a]" /> แผงควบคุม (Admin)
          </h3>
          <p className="text-[#a3b18a] text-sm md:text-base">
            จัดการข้อมูลบทความและแผนที่ภายในระบบ
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-[#a3b18a]/20 pb-4 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setAdminTab("blogs")}
          className={`px-6 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${adminTab === "blogs" ? "bg-[#588157] text-[#dad7cd]" : "bg-[#3a5a40]/50 text-[#a3b18a] hover:bg-[#3a5a40]"}`}
        >
          จัดการบทความ (Blogs)
        </button>
        <button
          onClick={() => setAdminTab("spots")}
          className={`px-6 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${adminTab === "spots" ? "bg-[#588157] text-[#dad7cd]" : "bg-[#3a5a40]/50 text-[#a3b18a] hover:bg-[#3a5a40]"}`}
        >
          จัดการสถานที่ (Map Spots)
        </button>
      </div>

      {adminTab === "blogs" && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              setIsAddingPost(true);
              setIsAdminPopupOpen(true);
            }}
            className="w-fit mb-2 flex items-center gap-2 px-4 py-2 bg-[#a3b18a] text-[#344e41] font-semibold rounded-xl hover:bg-[#dad7cd] transition-colors shadow-lg"
          >
            <Plus size={18} /> เขียนบทความใหม่
          </button>

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#3a5a40]/40 border border-[#a3b18a]/20 rounded-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-[#dad7cd] mb-1 line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-sm text-[#a3b18a] line-clamp-1">
                    {post.snippet}
                  </p>
                  <div className="text-xs text-[#a3b18a]/70 mt-2 flex gap-4">
                    <span>Likes: {post.likes}</span>
                    <span>Comments: {post.comments.length}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setExpandedPostId(
                        expandedPostId === post.id ? null : post.id,
                      )
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-[#588157]/30 text-[#dad7cd] rounded-xl hover:bg-[#588157]/50 transition-colors whitespace-nowrap"
                  >
                    <MessageSquare size={16} /> ดูความคิดเห็น
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-500/20 text-rose-400 rounded-xl hover:bg-rose-500/40 transition-colors whitespace-nowrap"
                  >
                    <Trash2 size={16} /> ลบ
                  </button>
                </div>
              </div>

              {/* ส่วนแสดงความคิดเห็น (ขยายเพื่อจัดการ) */}
              <AnimatePresence>
                {expandedPostId === post.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-[#a3b18a]/20 bg-[#283618]/30"
                  >
                    <div className="p-4 flex flex-col gap-3">
                      {post.comments.length > 0 ? (
                        post.comments.map((c) => (
                          <div
                            key={c.id}
                            className="flex justify-between items-start gap-4 p-3 bg-[#3a5a40]/50 rounded-xl border border-[#a3b18a]/10"
                          >
                            <div>
                              <p className="text-sm text-[#dad7cd] mb-1">
                                {c.text}
                              </p>
                              <span className="text-[10px] text-[#a3b18a]/70">
                                {c.timestamp}
                              </span>
                            </div>
                            <button
                              onClick={() => deleteComment(post.id, c.id)}
                              className="text-rose-400 hover:text-rose-300 p-2 bg-rose-500/10 rounded-lg hover:bg-rose-500/20 transition-colors shrink-0"
                              title="ลบคอมเมนต์นี้"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-[#a3b18a] text-center py-4">
                          ยังไม่มีความคิดเห็นในบทความนี้
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-[#a3b18a] py-8 text-center bg-[#3a5a40]/20 rounded-2xl border border-[#a3b18a]/10">
              ไม่มีข้อมูลบทความ
            </p>
          )}
        </div>
      )}

      {adminTab === "spots" && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              setIsAddingSpot(true);
              setIsAdminPopupOpen(true);
            }}
            className="w-fit mb-2 flex items-center gap-2 px-4 py-2 bg-[#a3b18a] text-[#344e41] font-semibold rounded-xl hover:bg-[#dad7cd] transition-colors shadow-lg"
          >
            <Plus size={18} /> เพิ่มสถานที่ใหม่
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spots.map((spot) => (
              <div
                key={spot.id}
                className="bg-[#3a5a40]/40 border border-[#a3b18a]/20 rounded-2xl p-4 flex justify-between items-center gap-4"
              >
                <div>
                  <h4 className="text-base font-semibold text-[#dad7cd] mb-1 line-clamp-1">
                    {spot.name}
                  </h4>
                  <p className="text-xs text-[#a3b18a]/70 font-mono">
                    Lat: {spot.lat}, Lng: {spot.lng} | {spot.category}
                  </p>
                </div>
                <button
                  onClick={() => deleteSpot(spot.id)}
                  className="p-2 bg-rose-500/20 text-rose-400 rounded-xl hover:bg-rose-500/40 transition-colors shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {spots.length === 0 && (
              <p className="text-[#a3b18a] py-8 text-center bg-[#3a5a40]/20 rounded-2xl border border-[#a3b18a]/10 col-span-1 md:col-span-2">
                ไม่มีข้อมูลสถานที่
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
