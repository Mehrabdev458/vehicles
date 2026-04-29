"use client";

import { useState, useMemo } from "react";
import SectionHeading from "@/components/SectionHeading";
import { galleryImages } from "@/data/gallery";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Filter = "all" | "cars" | "bikes";

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return galleryImages;
    return galleryImages.filter(img => img.category === filter);
  }, [filter]);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () =>
    setLightbox(i => (i === null ? null : i === 0 ? filtered.length - 1 : i - 1));
  const nextImage = () =>
    setLightbox(i => (i === null ? null : i === filtered.length - 1 ? 0 : i + 1));

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Gallery"
          title="Premium Gallery"
          subtitle="A curated collection of stunning automotive photography"
        />

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {(["all", "cars", "bikes"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-xl font-semibold transition-colors capitalize ${
                filter === f
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-red-500/10 hover:text-red-500"
              }`}
            >
              {f === "all" ? "All" : f === "cars" ? "🚗 Cars" : "🏍️ Bikes"}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <div
              key={img.id}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => openLightbox(i)}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ minHeight: i % 3 === 0 ? "300px" : i % 3 === 1 ? "220px" : "260px" }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full uppercase">
                      {img.category}
                    </span>
                    <p className="text-white font-semibold mt-2">{img.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <FiX className="text-xl" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <FiChevronRight className="text-xl" />
            </button>
            <div className="max-w-5xl max-h-[80vh] px-16" onClick={e => e.stopPropagation()}>
              <img
                src={filtered[lightbox].image.replace("w=800", "w=1200")}
                alt={filtered[lightbox].title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl"
              />
              <p className="text-white text-center mt-4 font-medium">{filtered[lightbox].title}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
