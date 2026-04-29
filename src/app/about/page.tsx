"use client";

import SectionHeading from "@/components/SectionHeading";
import { FiTarget, FiEye, FiAward, FiUsers, FiGlobe, FiShield, FiZap, FiHeart } from "react-icons/fi";

const stats = [
  { value: "200+", label: "Vehicle Models", icon: FiZap },
  { value: "50+", label: "Global Brands", icon: FiGlobe },
  { value: "1M+", label: "Monthly Visitors", icon: FiUsers },
  { value: "99%", label: "Satisfaction Rate", icon: FiHeart },
];

const whyChooseUs = [
  {
    icon: FiShield,
    title: "Verified Data",
    description: "Every specification is verified by automotive experts to ensure accuracy and reliability.",
  },
  {
    icon: FiZap,
    title: "Instant Comparison",
    description: "Compare any two vehicles side by side with our advanced comparison engine.",
  },
  {
    icon: FiGlobe,
    title: "Global Coverage",
    description: "We cover vehicles from every major market worldwide, giving you the most comprehensive database.",
  },
  {
    icon: FiAward,
    title: "Expert Reviews",
    description: "Our team of automotive journalists provides in-depth reviews and insights.",
  },
  {
    icon: FiUsers,
    title: "Community Driven",
    description: "Real user reviews and ratings help you make informed decisions.",
  },
  {
    icon: FiHeart,
    title: "Passion First",
    description: "Built by automotive enthusiasts for automotive enthusiasts. We live and breathe cars and bikes.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            badge="Our Story"
            title="About AutoVerse"
            subtitle="We're on a mission to make vehicle discovery and comparison effortless for everyone."
          />
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-red-500/10 text-red-500 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                From Passion to Platform
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  AutoVerse was born from a simple frustration: finding comprehensive, accurate vehicle
                  information shouldn&apos;t be difficult. As lifelong automotive enthusiasts, we knew there
                  had to be a better way.
                </p>
                <p>
                  What started as a small project in 2020 has grown into one of the most trusted automotive
                  information platforms on the web. Today, we serve over a million monthly visitors who
                  rely on our detailed specifications, expert reviews, and powerful comparison tools.
                </p>
                <p>
                  Our team combines decades of automotive journalism experience with cutting-edge technology
                  to deliver an experience that&apos;s both comprehensive and delightful to use.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
                  alt="Luxury car"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-950 shadow-xl hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80"
                  alt="Motorcycle"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 sm:p-10">
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
                <FiTarget className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To empower every car and bike enthusiast with the most comprehensive, accurate, and
                accessible vehicle information platform. We believe informed decisions lead to
                happier drivers and riders.
              </p>
            </div>
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 sm:p-10">
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
                <FiEye className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To become the world&apos;s most trusted automotive platform where every vehicle buyer,
                from first-timers to collectors, finds exactly what they need to make the perfect choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8"
              >
                <stat.icon className="text-red-500 text-3xl mx-auto mb-4" />
                <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why Us"
            title="Why Choose AutoVerse"
            subtitle="What makes us the preferred choice for automotive enthusiasts"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <item.icon className="text-red-500 text-xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
