import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Footprints,
  Laptop,
  Users,
  MapPin,
  Sparkles,
  Sprout,
  Wind,
  BrainCircuit,
  X,
  ChevronLeft,
  ChevronRight,
  Map as MapIcon,
} from "lucide-react";
import CustomLogo from "../components/CustomLogo";

export default function PresentationMode({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 8;

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const renderSlideContent = () => {
    switch (currentSlide) {
      case 0:
        return (
          <motion.div
            key="slide-0"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto"
          >
            <motion.h1
              variants={itemVars}
              className="text-6xl md:text-8xl font-bold text-[#dad7cd] mb-6"
            >
              พาใจ (PA-JAI)
            </motion.h1>
            <motion.p
              variants={itemVars}
              className="text-2xl md:text-3xl text-[#a3b18a] leading-relaxed"
            >
              Disconnect to Reconnect:
              <br />
              วางภาระไว้แล้วพาใจมารู้จักตัวเองและธรรมชาติ
            </motion.p>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="slide-1"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col h-full w-full max-w-5xl mx-auto py-10"
          >
            <motion.h2
              variants={itemVars}
              className="text-3xl md:text-5xl font-bold text-[#dad7cd] mb-12 border-b-2 border-[#588157] pb-4 w-fit"
            >
              วัตถุประสงค์ของโครงการ
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Leaf size={32} />,
                  title: "สร้างพื้นที่ปลอดภัย",
                  desc: "รณรงค์ให้คนทำงานยุคใหม่ออกไปสัมผัสธรรมชาติเพื่อลดความเครียด จัดการ Digital Burnout ด้วยการพักผ่อนเชิงรุก",
                },
                {
                  icon: <Footprints size={32} />,
                  title: "ส่งเสริมกิจกรรมนอกจอ",
                  desc: "นำพาตัวเองออกไปค้นหาสิ่งใหม่ๆ ผ่านกิจกรรม เช่น การเดินป่า การทำงานศิลปะ โดยเน้นพื้นที่จังหวัดเชียงราย",
                },
                {
                  icon: <Laptop size={32} />,
                  title: "เรียนรู้และพัฒนา",
                  desc: "แชร์และพัฒนา Web Application ร่วมกัน โดยใช้ AI เป็นหลักในการสรรสร้าง Platform ที่ชื่อว่า Pajai",
                },
                {
                  icon: <Users size={32} />,
                  title: "สร้าง Community",
                  desc: "เชิญชวนคนรู้จักมาร่วมกิจกรรม แบ่งปันเรื่องราว เพื่อให้รู้จักตัวเอง เพื่อนร่วมงาน และสิ่งรอบตัวให้ลึกซึ้งยิ่งขึ้น",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVars}
                  className="bg-[#3a5a40]/60 border border-[#a3b18a]/20 p-6 rounded-2xl flex gap-4"
                >
                  <div className="text-[#a3b18a] bg-[#344e41] p-4 rounded-xl h-fit">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#dad7cd] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#a3b18a] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="slide-2"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col md:flex-row items-center h-full w-full max-w-6xl mx-auto py-10 gap-12"
          >
            <div className="flex-1">
              <motion.h2
                variants={itemVars}
                className="text-3xl md:text-5xl font-bold text-[#dad7cd] mb-8 border-b-2 border-[#588157] pb-4 inline-block"
              >
                แนวคิดและจุดเริ่มต้น
              </motion.h2>
              <motion.p
                variants={itemVars}
                className="text-[#a3b18a] text-lg mb-6 leading-relaxed"
              >
                โครงการ "พาใจ"
                เกิดจากความสนใจที่อยากจะพาตัวเองออกห่างจากหน้าจอและการตามติดกระแสเทคโนโลยีที่เปลี่ยนแปลงอย่างรวดเร็ว
                เพื่อค้นหาความสมดุลในชีวิต
              </motion.p>
              <motion.p
                variants={itemVars}
                className="text-[#a3b18a] text-lg mb-6 leading-relaxed"
              >
                เราได้นำแนวคิด{" "}
                <strong className="text-[#dad7cd]">
                  การอาบป่า (Shinrin-yoku)
                </strong>{" "}
                มาผสมผสานกับการนั่งสมาธิ และการฝึกหายใจ (Breath Work)
                ก่อให้เกิดเป็นกิจกรรมการพักผ่อนที่ลึกซึ้ง
              </motion.p>
              <motion.p
                variants={itemVars}
                className="text-[#a3b18a] text-lg leading-relaxed"
              >
                นี่คือการบรรจบกันระหว่าง <strong>นวัตกรรมดิจิทัล</strong> และ{" "}
                <strong>การบำบัดด้วยธรรมชาติ</strong> เพื่อให้เกิดการ
                "เชื่อมต่อกับธรรมชาติ" และ "ตัดขาดจากโลกดิจิทัล"
              </motion.p>
            </div>
            <motion.div
              variants={itemVars}
              className="flex-1 w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-[#a3b18a]/20"
            >
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
                alt="Forest"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="slide-3"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col justify-center h-full w-full max-w-5xl mx-auto py-10"
          >
            <motion.h2
              variants={itemVars}
              className="text-3xl md:text-5xl font-bold text-[#dad7cd] mb-12 border-b-2 border-[#588157] pb-4 text-center"
            >
              Theme & Innovation
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                variants={itemVars}
                className="bg-[#3a5a40]/40 backdrop-blur-xl border border-[#a3b18a]/20 p-8 rounded-3xl"
              >
                <h3 className="text-2xl font-semibold text-[#dad7cd] mb-4 border-l-4 border-[#588157] pl-4">
                  AI-Powered Innovation
                </h3>
                <p className="text-[#a3b18a] text-lg leading-relaxed mb-4">
                  ยกระดับการทำงานด้วยเทคโนโลยี โดยใช้ AI Vibe Coding ในการพัฒนา
                  Web Application ที่ชื่อว่า <strong>Pajai</strong> ผ่าน{" "}
                  <em>www.pajai.co</em>
                </p>
                <p className="text-[#a3b18a] text-lg leading-relaxed">
                  สร้างพื้นที่ที่พวกเราจะร่วมกันพัฒนาขึ้นและแชร์ให้ทุกคนสามารถเข้าถึงและเป็นส่วนหนึ่งได้
                </p>
              </motion.div>
              <motion.div
                variants={itemVars}
                className="bg-[#3a5a40]/40 backdrop-blur-xl border border-[#a3b18a]/20 p-8 rounded-3xl"
              >
                <h3 className="text-2xl font-semibold text-[#dad7cd] mb-4 border-l-4 border-[#588157] pl-4">
                  Longevity & Well-being
                </h3>
                <p className="text-[#a3b18a] text-lg leading-relaxed mb-4">
                  การ Balance ดูแลสุขภาวะเพื่อการทำงานอย่างสมดุล ผสมผสานแนวคิด{" "}
                  <strong>การอาบป่า</strong> เข้ากับ{" "}
                  <strong>Meditation (สมาธิ)</strong>
                </p>
                <p className="text-[#a3b18a] text-lg leading-relaxed">
                  รวมถึง <strong>Breath Work (การฝึกลมหายใจ)</strong>{" "}
                  และนำพาตัวเองออกไปสัมผัสโลกนอกจอ
                </p>
              </motion.div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="slide-4"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col justify-center h-full w-full max-w-6xl mx-auto py-10 px-6"
          >
            <motion.h2
              variants={itemVars}
              className="text-4xl md:text-6xl font-bold text-[#dad7cd] mb-4 text-center"
            >
              องค์ประกอบหลักของ{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3b18a] to-[#dda15e]">
                "พาใจ"
              </span>
            </motion.h2>
            <motion.p
              variants={itemVars}
              className="text-[#a3b18a] text-center mb-16 max-w-2xl mx-auto"
            >
              การผสมผสานเทคโนโลยีที่ล้ำสมัยเข้ากับวิถีธรรมชาติ
              เพื่อการพักผ่อนอย่างมีคุณภาพในยุคดิจิทัล
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-[500px] md:h-[600px]">
              {/* Featured: Map */}
              <motion.div
                variants={itemVars}
                className="md:col-span-3 md:row-span-2 bg-[#3a5a40]/60 border border-[#a3b18a]/20 rounded-[40px] p-10 relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-8 text-[#a3b18a]/10 group-hover:scale-110 transition-transform duration-700">
                  <MapIcon size={180} />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <div className="bg-[#dad7cd] text-[#344e41] p-3 rounded-2xl w-fit mb-6 shadow-lg">
                    <MapIcon size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-[#dad7cd] mb-4">
                    แผนที่พาใจ (Pajai Map)
                  </h3>
                  <p className="text-[#a3b18a] text-lg leading-relaxed max-w-md">
                    Chiang Rai Edition: รวบรวมสถานที่ลับ พื้นที่สีเขียว
                    และคาเฟ่เงียบๆ ที่เหมาะสำหรับการ "อาบป่า" และ "พักใจ"
                    อย่างแท้จริง
                  </p>
                </div>
              </motion.div>

              {/* Box 2: 5 Senses */}
              <motion.div
                variants={itemVars}
                className="md:col-span-3 bg-gradient-to-br from-[#588157]/40 to-[#3a5a40]/20 border border-[#a3b18a]/20 rounded-[40px] p-8 flex gap-6 items-center shadow-xl hover:bg-[#588157]/30 transition-colors"
              >
                <div className="bg-[#344e41] text-[#a3b18a] p-5 rounded-3xl shadow-inner border border-[#a3b18a]/10">
                  <Sprout size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#dad7cd] mb-2">
                    The 5 Senses
                  </h4>
                  <p className="text-[#a3b18a] text-sm leading-relaxed">
                    กิจกรรมที่ออกแบบมาเพื่อปลุกประสาทสัมผัสทั้ง 5
                    ให้กลับมาสดชื่นอีกครั้ง สูดกลิ่นดิน สัมผัสน้ำ และมองสีเขียว
                  </p>
                </div>
              </motion.div>

              {/* Smaller Grid Boxes */}
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  variants={itemVars}
                  className="bg-[#3a5a40]/40 border border-[#a3b18a]/20 rounded-[40px] p-8 flex flex-col justify-between group hover:border-[#a3b18a]/40 transition-all shadow-lg"
                >
                  <Wind
                    size={28}
                    className="text-[#a3b18a] mb-4 group-hover:rotate-12 transition-transform"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-[#dad7cd] mb-1">
                      Breath Work
                    </h4>
                    <p className="text-[#a3b18a] text-xs leading-relaxed">
                      ฝึกหายใจตามจังหวะที่ AI แนะนำ
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVars}
                  className="bg-[#3a5a40]/40 border border-[#a3b18a]/20 rounded-[40px] p-8 flex flex-col justify-between group hover:border-[#a3b18a]/40 transition-all shadow-lg"
                >
                  <BrainCircuit
                    size={28}
                    className="text-[#dda15e] mb-4 group-hover:scale-110 transition-transform"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-[#dad7cd] mb-1">
                      AI Suggestion
                    </h4>
                    <p className="text-[#a3b18a] text-xs leading-relaxed">
                      วิเคราะห์สภาวะใจและแนะนำที่เที่ยว
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="slide-5"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col justify-center h-full w-full max-w-6xl mx-auto py-10"
          >
            <motion.h2
              variants={itemVars}
              className="text-3xl md:text-5xl font-bold text-[#dad7cd] mb-12 border-b-2 border-[#588157] pb-4 text-center"
            >
              ผลลัพธ์ที่คาดว่าจะได้รับ
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
                  title: "ด้านผู้เข้าร่วม",
                  text: "มีระดับความเครียดลดลง สภาวะจิตใจผ่อนคลายและตื่นรู้มากขึ้น ได้รับการพักผ่อนเชิงรุกที่มีคุณภาพ",
                },
                {
                  img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
                  title: "ด้านชุมชน/สังคม",
                  text: "เกิด Community ที่เข้มแข็งผ่านกิจกรรมรายเดือน ช่วยกระตุ้นเศรษฐกิจท้องถิ่นเชิง Wellness Tourism ในจังหวัดเชียงราย",
                },
                {
                  img: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80",
                  title: "ด้านดิจิทัล",
                  text: "มี Web App นำฝึกหายใจและเชื่อมต่อบทธรรมะ ผสานความสงบของจิตใจเข้ากับความล้ำสมัยของ AI",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVars}
                  className="bg-[#344e41] border border-[#a3b18a]/20 rounded-3xl overflow-hidden flex flex-col shadow-xl"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-semibold text-[#dad7cd] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#a3b18a] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div
            key="slide-6"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col justify-center h-full w-full max-w-6xl mx-auto py-10 px-4"
          >
            <motion.h2
              variants={itemVars}
              className="text-3xl md:text-5xl font-bold text-[#dad7cd] mb-16 md:mb-20 border-b-2 border-[#588157] pb-4 text-center mx-auto"
            >
              แผนการดำเนินโครงการ (Roadmap)
            </motion.h2>

            <div className="relative w-full mt-4">
              <div className="absolute left-[20px] md:left-0 top-0 md:top-1/2 bottom-0 md:bottom-auto w-1.5 md:w-full md:h-1.5 bg-gradient-to-b md:bg-gradient-to-r from-[#a3b18a] via-[#588157] to-[#bc6c25] rounded-full -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 opacity-70"></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10 pl-12 md:pl-0">
                {[
                  {
                    month: "มีนาคม",
                    step: "Development Phase",
                    detail: "พัฒนา Web Application\nและวางแผนกิจกรรม",
                    icon: <Laptop size={24} className="text-[#a3b18a]" />,
                  },
                  {
                    month: "เมษายน",
                    step: "MVP1 Launch",
                    detail:
                      "เปิดตัวเว็บ pajai.co\nกิจกรรมน้ำตกนางแล (Sheetali)",
                    icon: <Sparkles size={24} className="text-[#a3b18a]" />,
                  },
                  {
                    month: "พ.ค. - ก.ค.",
                    step: "1st & 2nd Release",
                    detail:
                      "กิจกรรม The Scent of Early Rain\nและอัปเดตฟีเจอร์ใหม่",
                    icon: <Sprout size={24} className="text-[#a3b18a]" />,
                  },
                  {
                    month: "ส.ค. - ธ.ค.",
                    step: "Monthly Activities",
                    detail:
                      "น้ำตกขุนกรณ์ (Negative Ion)\nยอดดอยช้าง (Silent Trekking)",
                    icon: <MapPin size={24} className="text-[#a3b18a]" />,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVars}
                    className={`flex flex-col md:items-center relative ${i % 2 !== 0 ? "md:flex-col-reverse md:mt-32" : "md:mb-32"}`}
                  >
                    <div
                      className={`absolute left-[-48px] md:relative md:left-auto w-10 h-10 rounded-full bg-[#344e41] border-4 border-[#a3b18a] flex items-center justify-center shadow-[0_0_20px_rgba(163,177,138,0.6)] z-20 ${i % 2 !== 0 ? "md:mt-6" : "md:mb-6"} top-1/2 md:top-auto -translate-y-1/2 md:translate-y-0`}
                    >
                      <div className="w-3 h-3 bg-[#dad7cd] rounded-full"></div>
                    </div>

                    <div className="bg-[#3a5a40]/70 backdrop-blur-xl border border-[#a3b18a]/30 p-6 rounded-3xl w-full shadow-[0_10px_30px_rgba(40,54,24,0.5)] hover:bg-[#3a5a40] transition-colors group">
                      <div className="bg-[#283618] w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner border border-[#a3b18a]/10">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-[#dad7cd] mb-1">
                        {item.month}
                      </h3>
                      <p className="text-[#dda15e] font-medium mb-3 text-sm tracking-wide uppercase">
                        {item.step}
                      </p>
                      <p className="text-[#a3b18a] text-sm whitespace-pre-line leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 7:
        return (
          <motion.div
            key="slide-7"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
            <motion.div
              variants={itemVars}
              className="relative z-10 bg-[#344e41]/60 backdrop-blur-xl p-12 rounded-3xl border border-[#a3b18a]/20"
            >
              <h2 className="text-5xl md:text-7xl font-bold text-[#dad7cd] mb-6">
                พาใจไปพัก...
              </h2>
              <p className="text-2xl md:text-3xl text-[#a3b18a]">
                แล้วพบกันที่เชียงราย
              </p>
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#344e41] text-[#dad7cd] flex flex-col overflow-hidden"
    >
      <div className="flex justify-between items-center p-6 border-b border-[#a3b18a]/20 bg-[#3a5a40]/30 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center text-[#a3b18a]">
            <CustomLogo className="w-full h-full drop-shadow-[0_0_10px_rgba(163,177,138,0.2)]" />
          </div>
          <span className="font-bold tracking-widest text-[#a3b18a] text-xl">
            PA-JAI PITCH
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[#a3b18a]/20 rounded-full transition-colors"
        >
          <X size={24} className="text-[#dad7cd]" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative overflow-y-auto px-6">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="fixed w-[60vw] h-[60vw] rounded-full bg-[#588157] mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none"
        />

        <AnimatePresence mode="wait">{renderSlideContent()}</AnimatePresence>
      </div>

      <div className="h-1 w-full bg-[#3a5a40]">
        <motion.div
          className="h-full bg-[#a3b18a]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex justify-between items-center p-6 bg-[#3a5a40]/80 backdrop-blur-md relative z-20">
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#588157] text-[#dad7cd] disabled:opacity-30 hover:bg-[#a3b18a] hover:text-[#344e41] transition-all"
        >
          <ChevronLeft size={20} /> ก่อนหน้า
        </button>
        <div className="hidden md:flex gap-3">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? "bg-[#dad7cd] scale-125" : "bg-[#a3b18a]/40 hover:bg-[#a3b18a]"}`}
            />
          ))}
        </div>
        <div className="md:hidden text-[#a3b18a] font-medium">
          {currentSlide + 1} / {totalSlides}
        </div>
        <button
          onClick={() =>
            setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1))
          }
          disabled={currentSlide === totalSlides - 1}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#588157] text-[#dad7cd] disabled:opacity-30 hover:bg-[#a3b18a] hover:text-[#344e41] transition-all"
        >
          ถัดไป <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}
