import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  BrainCircuit,
  Heart,
  MessageSquare,
  ArrowLeft,
  Send,
} from "lucide-react";

export default function BlogView({
  posts,
  setPosts,
  user,
  onNavigate,
  currentMood,
}) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const isLoggedIn = !!user;

  // Add AI Suggestion note if mood is selected
  const suggestionText = {
    tired:
      "เรามีบทความเกี่ยวกับการพักหน้าจอและการนอนหลับพักผ่อนที่คุณน่าจะชอบ ลองอ่านดูนะ",
    stressed:
      "ลองอ่านเรื่องราวการสัมผัสธรรมชาติ หรือลองไปฟังเสียงน้ำตกเพื่อลดความเครียดดูสิ",
    lonely: "เราไม่ได้อยู่คนเดียวนะ... ลองอ่านรีวิวจาก Community ของเราดู",
    burnout:
      "เมื่อหมดไฟ ลองออกไปชาร์จพลังกับพื้นที่สีเขียว หรืออ่านมุมมองใหม่ๆ ได้ที่นี่",
  };

  const handleLike = (postId) => {
    if (!isLoggedIn) {
      onNavigate("login");
      return;
    }
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.likedByMe ? post.likes - 1 : post.likes + 1,
            likedByMe: !post.likedByMe,
          };
        }
        return post;
      }),
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => ({
        ...prev,
        likes: prev.likedByMe ? prev.likes - 1 : prev.likes + 1,
        likedByMe: !prev.likedByMe,
      }));
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !isLoggedIn || !selectedPost) return;

    const comment = {
      id: Date.now(),
      text: newComment,
      timestamp: "เมื่อสักครู่",
    };

    const updatedPosts = posts.map((post) => {
      if (post.id === selectedPost.id) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });

    setPosts(updatedPosts);
    setSelectedPost({
      ...selectedPost,
      comments: [...selectedPost.comments, comment],
    });
    setNewComment("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full pt-4 w-full max-w-4xl mx-auto px-6"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <h3 className="text-2xl md:text-4xl font-semibold mb-2">
            Content Hub
          </h3>
          <p className="text-[#a3b18a] text-sm md:text-base">
            บทความฟื้นฟูจิตใจและมุมมองดีๆ จากทีมงานพาใจ
          </p>
        </div>

        <button
          onClick={() => onNavigate("login")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors w-fit ${
            isLoggedIn
              ? "bg-[#588157]/20 text-[#a3b18a] border border-[#588157]/50 hover:bg-[#588157]/40"
              : "bg-[#3a5a40] text-[#dad7cd] border border-[#a3b18a]/30 hover:bg-[#588157]"
          }`}
        >
          {isLoggedIn ? <User size={16} /> : <Lock size={16} />}
          {isLoggedIn
            ? user.role === "admin"
              ? "แอดมิน"
              : "โหมดผู้ใช้ทั่วไป"
            : "เข้าสู่ระบบ"}
        </button>
      </div>

      {!selectedPost && currentMood && suggestionText[currentMood] && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-[#588157]/20 border border-[#588157]/50 rounded-2xl flex items-start gap-3"
        >
          <BrainCircuit className="text-[#a3b18a] shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-[#dad7cd] leading-relaxed">
            <strong className="text-[#a3b18a]">AI Suggestion:</strong>{" "}
            {suggestionText[currentMood]}
          </p>
        </motion.div>
      )}

      {!selectedPost ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedPost(post)}
              className="bg-[#3a5a40]/40 border border-[#a3b18a]/20 rounded-3xl cursor-pointer hover:bg-[#588157]/30 transition-colors flex flex-col overflow-hidden group shadow-lg"
            >
              {post.coverImage && (
                <div className="w-full h-48 md:h-56 overflow-hidden relative border-b border-[#a3b18a]/20">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#344e41]/90 to-transparent"></div>
                </div>
              )}

              <div className="p-6 flex flex-col flex-1 relative">
                <div className="text-xs font-semibold text-[#a3b18a] mb-2 uppercase tracking-wider">
                  {post.date}
                </div>
                <h4 className="text-xl font-medium text-[#dad7cd] mb-3 line-clamp-2 group-hover:text-[#a3b18a] transition-colors">
                  {post.title}
                </h4>
                <p className="text-[#a3b18a] text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                  {post.snippet}
                </p>

                <div className="flex items-center gap-6 text-[#a3b18a]/80 border-t border-[#a3b18a]/20 pt-4 mt-auto">
                  <div className="flex items-center gap-2">
                    <Heart
                      size={16}
                      className={
                        post.likedByMe ? "text-rose-400 fill-rose-400" : ""
                      }
                    />
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    <span className="text-sm">{post.comments.length}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {posts.length === 0 && (
            <p className="text-[#a3b18a] col-span-1 md:col-span-2 text-center py-10">
              ยังไม่มีบทความในขณะนี้
            </p>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col flex-1 bg-[#3a5a40]/30 border border-[#a3b18a]/20 rounded-3xl p-6 md:p-10 shadow-xl"
        >
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-[#a3b18a] hover:text-[#dad7cd] w-fit mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> กลับหน้ารวมบทความ
          </button>

          <div className="text-sm text-[#a3b18a] mb-4">{selectedPost.date}</div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-[#dad7cd]">
            {selectedPost.title}
          </h2>

          <div className="text-lg text-[#dad7cd]/90 leading-relaxed mb-12 space-y-6">
            {selectedPost.content.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="whitespace-pre-line">
                    {block.text}
                  </p>
                );
              } else if (block.type === "image") {
                return (
                  <figure key={index} className="my-8">
                    <img
                      src={block.url}
                      alt={block.alt}
                      className="w-full rounded-2xl object-cover max-h-[400px] shadow-lg border border-[#a3b18a]/20"
                    />
                    {block.caption && (
                      <figcaption className="text-center text-sm text-[#a3b18a] mt-3">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              } else if (block.type === "video") {
                return (
                  <figure key={index} className="my-8">
                    <div className="rounded-2xl overflow-hidden bg-[#3a5a40] border border-[#a3b18a]/20 shadow-lg relative aspect-video">
                      <video
                        src={block.url}
                        controls
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="text-center text-sm text-[#a3b18a] mt-3">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              return null;
            })}
          </div>

          <div className="flex items-center gap-4 mb-10 border-b border-[#a3b18a]/20 pb-8">
            <button
              onClick={() => handleLike(selectedPost.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                selectedPost.likedByMe
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  : "bg-[#588157]/30 text-[#dad7cd] hover:bg-[#588157]/50 border border-[#a3b18a]/30"
              }`}
            >
              <Heart
                size={20}
                className={selectedPost.likedByMe ? "fill-rose-400" : ""}
              />
              {selectedPost.likes} Likes
            </button>
            {!isLoggedIn && (
              <span className="text-sm text-[#a3b18a] flex items-center gap-2">
                <Lock size={14} /> ต้องเข้าสู่ระบบเพื่อถูกใจและคอมเมนต์
              </span>
            )}
          </div>

          <div>
            <h4 className="text-xl font-medium mb-6 flex items-center gap-2 text-[#dad7cd]">
              <MessageSquare size={20} /> ความคิดเห็น (
              {selectedPost.comments.length})
            </h4>

            <div className="mb-8 relative">
              {!isLoggedIn && (
                <div className="absolute inset-0 bg-[#344e41]/80 backdrop-blur-sm z-10 rounded-2xl flex items-center justify-center border border-[#a3b18a]/20">
                  <p className="text-[#dad7cd] flex items-center gap-2">
                    <Lock size={16} /> กรุณา{" "}
                    <button
                      className="underline text-[#a3b18a] ml-1"
                      onClick={() => onNavigate("login")}
                    >
                      เข้าสู่ระบบ
                    </button>{" "}
                    เพื่อร่วมแบ่งปันความคิดเห็น
                  </p>
                </div>
              )}
              <div className="bg-[#3a5a40]/50 border border-[#a3b18a]/20 rounded-2xl p-4 focus-within:border-[#588157] transition-colors flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#588157]/40 flex items-center justify-center shrink-0">
                  <User size={20} className="text-[#dad7cd]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#a3b18a] font-medium mb-2">
                    แสดงความเห็นในฐานะ:{" "}
                    {user?.role === "admin"
                      ? "ผู้ดูแลระบบ"
                      : "ผู้ใช้งาน (ไม่ระบุตัวตน)"}
                  </p>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="แบ่งปันความรู้สึกของคุณที่นี่..."
                    className="w-full bg-transparent resize-none outline-none text-[#dad7cd] placeholder-[#a3b18a]/60 min-h-[60px]"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="px-6 py-2 bg-[#588157] text-[#dad7cd] font-medium rounded-xl hover:bg-[#a3b18a] hover:text-[#344e41] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send size={16} /> ส่งข้อความ
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {selectedPost.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-[#3a5a40]/50 rounded-2xl p-5 border border-[#a3b18a]/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#344e41] flex items-center justify-center">
                      <User size={14} className="text-[#a3b18a]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#dad7cd]">
                        ผู้ใช้งาน (ไม่ระบุตัวตน)
                      </div>
                      <div className="text-xs text-[#a3b18a]/80">
                        {comment.timestamp}
                      </div>
                    </div>
                  </div>
                  <p className="text-[#dad7cd]/90 leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              ))}
              {selectedPost.comments.length === 0 && (
                <div className="text-center py-8 text-[#a3b18a]">
                  ยังไม่มีความคิดเห็น เป็นคนแรกที่แบ่งปันความรู้สึกสิ
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
