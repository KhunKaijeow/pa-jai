import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Home, MapPin, Wind, BookOpen, User } from "lucide-react";

// Components
import OrganicBackground from "./components/OrganicBackground";
import { NavItem, DesktopNavItem } from "./components/Navigation";
import AIChatWidget from "./components/AIChatWidget";
import { Footer, CompactFooter } from "./components/Footer";
import CustomLogo from "./components/CustomLogo";

// Views
import HomeView from "./views/HomeView";
import BlogView from "./views/BlogView";
import MapView from "./views/MapView";
import RecoverView from "./views/RecoverView";
import LoginView from "./views/LoginView";
import AdminView from "./views/AdminView";

// Constants
import { initialPosts, initialSpots } from "./constants/mockData";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState(null);
  const [currentMood, setCurrentMood] = useState(null);
  const [posts, setPosts] = useState(initialPosts);
  const [spots, setSpots] = useState(initialSpots);
  const [showPresentation, setShowPresentation] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isAdminPopupOpen, setIsAdminPopupOpen] = useState(false);

  // Mock data for mood charts based on user
  const userMoodData = {
    Admin: [65, 75, 55, 85, 60, 95, 80],
    Pajai: [40, 50, 45, 60, 50, 70, 65],
  };

  // Scroll transparency management
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab("home");
  };

  return (
    <div className="min-h-screen font-['Prompt'] text-[#dad7cd] selection:bg-[#a3b18a]/30 relative">
      <OrganicBackground activeTab={activeTab} currentMood={currentMood} />

      {/* 1. Header & Desktop Navigation */}
      {!showPresentation && !isAdminPopupOpen && (
        <header
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "bg-[#344e41]/90 backdrop-blur-xl border-b border-[#a3b18a]/10 py-3" : "bg-transparent py-6"}`}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setActiveTab("home")}
            >
              <CustomLogo className="w-10 h-10 text-[#a3b18a] group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold tracking-tighter text-[#dad7cd]">
                PAJAI
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-2 bg-[#3a5a40]/40 p-1.5 rounded-2xl border border-[#a3b18a]/20 backdrop-blur-md">
              <DesktopNavItem
                icon={<Home size={18} />}
                label="Home"
                isActive={activeTab === "home"}
                onClick={() => setActiveTab("home")}
              />
              <DesktopNavItem
                icon={<BookOpen size={18} />}
                label="Blog"
                isActive={activeTab === "blog"}
                onClick={() => setActiveTab("blog")}
              />
              <DesktopNavItem
                icon={<MapPin size={18} />}
                label="Heal-Jai Map"
                isActive={activeTab === "map"}
                onClick={() => setActiveTab("map")}
              />
              <DesktopNavItem
                icon={<Wind size={18} />}
                label="Breathing"
                isActive={activeTab === "recover"}
                onClick={() => setActiveTab("recover")}
              />
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all border ${
                  user
                    ? "bg-[#588157]/20 border-[#a3b18a]/30 text-[#dad7cd] hover:bg-[#588157]/40"
                    : "bg-[#a3b18a] border-[#a3b18a] text-[#344e41] font-semibold hover:shadow-lg hover:shadow-[#a3b18a]/20"
                }`}
              >
                <User size={18} />
                <span className="hidden sm:inline">
                  {user ? user.username : "เข้าสู่ระบบ"}
                </span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* 2. Main Content Area */}
      <main className="pt-24 md:pt-32 pb-32 min-h-screen relative z-30">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <HomeView
              key="home"
              onNavigate={setActiveTab}
              showPresentation={showPresentation}
              setShowPresentation={setShowPresentation}
              currentMood={currentMood}
              setCurrentMood={setCurrentMood}
              user={user}
              userMoodData={userMoodData}
              setIsAIChatOpen={setIsAIChatOpen}
            />
          )}
          {activeTab === "blog" && (
            <BlogView
              key="blog"
              posts={posts}
              setPosts={setPosts}
              user={user}
              onNavigate={setActiveTab}
              currentMood={currentMood}
            />
          )}
          {activeTab === "map" && <MapView key="map" spots={spots} />}
          {activeTab === "recover" && <RecoverView key="recover" />}
          {activeTab === "login" && (
            <LoginView
              key="login"
              onNavigate={setActiveTab}
              onLogin={handleLogin}
              user={user}
              onLogout={handleLogout}
            />
          )}
          {activeTab === "admin" && (
            <AdminView
              key="admin"
              user={user}
              posts={posts}
              setPosts={setPosts}
              spots={spots}
              setSpots={setSpots}
              setIsAdminPopupOpen={setIsAdminPopupOpen}
            />
          )}
        </AnimatePresence>
      </main>

      {/* 3. Mobile Navigation */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-[#344e41]/80 backdrop-blur-2xl border border-[#a3b18a]/30 p-3 rounded-[32px] flex justify-between items-center shadow-2xl">
        <NavItem
          icon={<Home size={22} />}
          label="Home"
          isActive={activeTab === "home"}
          onClick={() => setActiveTab("home")}
        />
        <NavItem
          icon={<BookOpen size={22} />}
          label="Blog"
          isActive={activeTab === "blog"}
          onClick={() => setActiveTab("blog")}
        />
        <NavItem
          icon={<MapPin size={22} />}
          label="Heal-Jai Map"
          isActive={activeTab === "map"}
          onClick={() => setActiveTab("map")}
        />
        <NavItem
          icon={<Wind size={22} />}
          label="Breathing"
          isActive={activeTab === "recover"}
          onClick={() => setActiveTab("recover")}
        />
      </nav>

      {/* 4. Global Footers */}
      {activeTab !== "recover" &&
        activeTab !== "admin" &&
        activeTab !== "map" &&
        (activeTab === "home" ? <Footer /> : <CompactFooter />)}

      {/* 5. Floating AI Chat Widget */}
      {user && (
        <AIChatWidget isOpen={isAIChatOpen} setIsOpen={setIsAIChatOpen} />
      )}

      {/* Logo in background for aesthetic depth */}
      <div className="fixed -bottom-20 -right-20 opacity-[0.03] rotate-12 pointer-events-none z-0">
        <CustomLogo className="w-[600px] h-[600px]" />
      </div>
    </div>
  );
}
