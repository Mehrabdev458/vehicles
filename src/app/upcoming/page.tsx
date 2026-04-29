"use client";

import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { cars } from "@/data/cars";
import { bikes } from "@/data/bikes";
import { FiCalendar, FiClock } from "react-icons/fi";

function getCountdown(dateStr: string) {
  const target = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, expired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours, expired: false };
}

const upcomingCars = cars.filter(c => c.isUpcoming);
const upcomingBikes = bikes.filter(b => b.isUpcoming);

export default function UpcomingPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Coming Soon"
          title="Upcoming Models"
          subtitle="Get excited about the newest cars and bikes launching soon"
        />

        {/* Upcoming Cars */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            🚗 Upcoming Cars
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingCars.map(car => {
              const countdown = getCountdown(car.launchDate || "");
              return (
                <div
                  key={car.id}
                  className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-500"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full flex items-center gap-1">
                      <FiClock /> Coming Soon
                    </span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs text-red-400 font-semibold uppercase">{car.brand}</p>
                      <h4 className="text-lg font-bold text-white">{car.name}</h4>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{car.description}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <FiCalendar className="text-red-500" />
                      <span>Expected: {new Date(car.launchDate || "").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                    </div>

                    {/* Countdown */}
                    {!countdown.expired && (
                      <div className="flex gap-3 mb-4">
                        <div className="flex-1 bg-gray-100 dark:bg-white/10 rounded-xl p-3 text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{countdown.days}</p>
                          <p className="text-xs text-gray-500">Days</p>
                        </div>
                        <div className="flex-1 bg-gray-100 dark:bg-white/10 rounded-xl p-3 text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{countdown.hours}</p>
                          <p className="text-xs text-gray-500">Hours</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ${car.price.toLocaleString()}
                        <span className="text-xs font-normal text-gray-500 ml-1">est.</span>
                      </p>
                      <Link
                        href={`/cars/${car.id}`}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-xl font-medium transition-colors"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Bikes */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            🏍️ Upcoming Bikes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingBikes.map(bike => {
              const countdown = getCountdown(bike.launchDate || "");
              return (
                <div
                  key={bike.id}
                  className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-500"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full flex items-center gap-1">
                      <FiClock /> Coming Soon
                    </span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs text-red-400 font-semibold uppercase">{bike.brand}</p>
                      <h4 className="text-lg font-bold text-white">{bike.name}</h4>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{bike.description}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <FiCalendar className="text-red-500" />
                      <span>Expected: {new Date(bike.launchDate || "").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                    </div>

                    {!countdown.expired && (
                      <div className="flex gap-3 mb-4">
                        <div className="flex-1 bg-gray-100 dark:bg-white/10 rounded-xl p-3 text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{countdown.days}</p>
                          <p className="text-xs text-gray-500">Days</p>
                        </div>
                        <div className="flex-1 bg-gray-100 dark:bg-white/10 rounded-xl p-3 text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{countdown.hours}</p>
                          <p className="text-xs text-gray-500">Hours</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ${bike.price.toLocaleString()}
                        <span className="text-xs font-normal text-gray-500 ml-1">est.</span>
                      </p>
                      <Link
                        href={`/bikes/${bike.id}`}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-xl font-medium transition-colors"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
