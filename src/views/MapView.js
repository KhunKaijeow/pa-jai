import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Filter,
  Sprout,
  Coffee,
  Wind,
  Activity,
  Navigation,
} from "lucide-react";

export default function MapView({ spots }) {
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Nature", "Cafe", "Quiet"];
  const filteredSpots =
    activeFilter === "All"
      ? spots
      : spots.filter((s) => s.category === activeFilter);

  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    if (!document.getElementById("leaflet-js")) {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => setLeafletLoaded(true);
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current || mapInstance.current)
      return;

    // Use Chiang Rai center approximately based on spots
    const centerLat = 19.9;
    const centerLng = 99.8;

    mapInstance.current = window.L.map(mapContainerRef.current).setView(
      [centerLat, centerLng],
      10,
    );

    window.L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; OpenStreetMap contributors",
      },
    ).addTo(mapInstance.current);

    const style = document.createElement("style");
    style.innerHTML = `
      .leaflet-popup-content-wrapper, .leaflet-popup-tip {
        background: #3a5a40 !important;
        color: #dad7cd !important;
        border: 1px solid rgba(163,177,138,0.3);
        border-radius: 12px;
        font-family: 'Prompt', sans-serif !important;
      }
      .leaflet-popup-content { margin: 12px 16px; font-family: inherit; }
      .leaflet-container a.leaflet-popup-close-button { color: #a3b18a !important; }
      .leaflet-container a.leaflet-popup-close-button:hover { color: #dad7cd !important; }
    `;
    document.head.appendChild(style);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [leafletLoaded]);

  useEffect(() => {
    if (!mapInstance.current || !leafletLoaded) return;

    Object.values(markersRef.current).forEach((marker) => {
      mapInstance.current.removeLayer(marker);
    });
    markersRef.current = {};

    filteredSpots.forEach((spot) => {
      let markerColor = "#588157";
      if (spot.category === "Nature") markerColor = "#10b981";
      if (spot.category === "Cafe") markerColor = "#d97706";
      if (spot.category === "Quiet") markerColor = "#3b82f6";

      const marker = window.L.circleMarker([spot.lat, spot.lng], {
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 0.6,
        radius: 8,
        weight: 2,
      }).addTo(mapInstance.current);

      marker.bindPopup(`
        <div>
          <b style="font-size: 14px; color: #dad7cd;">${spot.name}</b><br/>
          <span style="font-size: 12px; color: #a3b18a;">Category: ${spot.category}</span>
        </div>
      `);

      marker.on("click", () => {
        setSelectedSpotId(spot.id);
      });

      markersRef.current[spot.id] = marker;
    });

    // Auto-fit bounds if we have spots
    if (filteredSpots.length > 0) {
      const bounds = window.L.latLngBounds(
        filteredSpots.map((s) => [s.lat, s.lng]),
      );
      mapInstance.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [filteredSpots, leafletLoaded]);

  const handleSpotClick = (spot) => {
    setSelectedSpotId(spot.id);
    if (mapInstance.current) {
      mapInstance.current.flyTo([spot.lat, spot.lng], 15, {
        duration: 1.5,
      });
      const marker = markersRef.current[spot.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full pt-4 w-full max-w-5xl mx-auto px-6"
    >
      <h3 className="text-2xl md:text-4xl font-semibold mb-2">
        Pajai Map (Chiang Rai Edition)
      </h3>
      <p className="text-[#a3b18a] mb-6 text-sm md:text-base">
        ค้นหาสถานที่ฮีลใจและพื้นที่สีเขียวใกล้ตัวคุณ
      </p>

      <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeFilter === cat
                ? "bg-[#a3b18a] text-[#344e41]"
                : "bg-[#3a5a40]/50 text-[#a3b18a] border border-[#a3b18a]/20 hover:bg-[#3a5a40]"
            }`}
          >
            {cat === "All" && <Filter size={14} />}
            {cat === "Nature" && <Sprout size={14} />}
            {cat === "Cafe" && <Coffee size={14} />}
            {cat === "Quiet" && <Wind size={14} />}
            {cat}
          </button>
        ))}
      </div>

      <div className="w-full h-64 md:h-[450px] bg-[#3a5a40] rounded-3xl border border-[#a3b18a]/20 mb-8 relative overflow-hidden shadow-2xl z-0">
        {!leafletLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#3a5a40] z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Activity size={32} className="text-[#588157] mb-4" />
            </motion.div>
            <span className="text-sm font-medium text-[#a3b18a]">
              Loading Pajai Map...
            </span>
          </div>
        )}
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            onClick={() => handleSpotClick(spot)}
            className={`border rounded-2xl p-6 flex flex-col justify-between transition-all cursor-pointer group ${
              selectedSpotId === spot.id
                ? "bg-[#588157]/20 border-[#588157] shadow-[0_0_15px_rgba(88,129,87,0.3)]"
                : "bg-[#3a5a40]/50 border-[#a3b18a]/20 hover:bg-[#588157]/30"
            }`}
          >
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h4
                  className={`font-semibold text-lg transition-colors line-clamp-1 ${selectedSpotId === spot.id ? "text-[#dad7cd]" : "text-[#dad7cd] group-hover:text-[#a3b18a]"}`}
                  title={spot.name}
                >
                  {spot.name}
                </h4>
              </div>
              <p className="text-sm text-[#a3b18a] flex items-center gap-1 mt-2">
                <Navigation
                  size={14}
                  className={selectedSpotId === spot.id ? "text-[#a3b18a]" : ""}
                />
                {spot.distance}
              </p>
              <div className="mt-3 flex gap-2">
                <span className="text-[10px] px-2 py-1 rounded bg-[#344e41] text-[#a3b18a] border border-[#a3b18a]/20">
                  #{spot.category}
                </span>
              </div>
            </div>
            <div
              className={`text-xs px-3 py-1.5 rounded-full inline-flex w-fit ${spot.crowded === "Low" ? "bg-[#588157]/30 text-[#dad7cd]" : spot.crowded === "Medium" ? "bg-[#a3b18a]/30 text-[#344e41]" : "bg-orange-500/20 text-orange-200"}`}
            >
              {spot.crowded} Traffic
            </div>
          </div>
        ))}
        {filteredSpots.length === 0 && (
          <p className="text-[#a3b18a] col-span-3 text-center py-10">
            ไม่พบสถานที่ในหมวดหมู่นี้
          </p>
        )}
      </div>
    </motion.div>
  );
}
