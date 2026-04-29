"use client";

import Link from "next/link";
import { FiArrowRight, FiStar, FiZap, FiShield, FiAward } from "react-icons/fi";
import { BsSpeedometer2, BsFuelPump } from "react-icons/bs";
import SectionHeading from "@/components/SectionHeading";
import VehicleCard from "@/components/VehicleCard";
import { cars, carCategories } from "@/data/cars";
import { bikes, bikeCategories } from "@/data/bikes";
import { testimonials } from "@/data/testimonials";

const featuredCars = cars.filter(c => !c.isUpcoming).slice(0, 4);
const featuredBikes = bikes.filter(b => !b.isUpcoming).slice(0, 4);
const latestLaunches = [
  ...cars.filter(c => !c.isUpcoming).slice(0, 3),
  ...bikes.filter(b => !b.isUpcoming).slice(0, 3),
].slice(0, 6);

const categoryIcons: Record<string, string> = {
  Sedan: "🚗", SUV: "🚙", Hatchback: "🏎️", Luxury: "👑", Sports: "🏁",
  Electric: "⚡", Hybrid: "🍃", Pickup: "🛻", Coupe: "💎", Family: "👨‍👩‍👧‍👦", Crossover: "🔄",
  "Sports Bike": "🏍️", Cruiser: "🛣️", Touring: "🌍", Scooter: "🛵", "Electric Bike": "⚡",
  Adventure: "🏔️", "Cafe Racer": "☕", "Heavy Bike": "💪", Standard: "🔧", "Dirt Bike": "🏜️", Commuter: "🚲",
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-500/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium mb-8">
              <FiZap className="text-red-500" /> Discover Performance Excellence
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] mb-6">
              <span className="text-gray-900 dark:text-white">Drive Your</span>
              <br />
              <span className="gradient-text">Dreams</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mb-10 leading-relaxed">
              Explore the world&apos;s most iconic cars and bikes. Compare specs,
              discover new models, and find your perfect ride.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/cars"
                className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
              >
                Explore Cars <FiArrowRight />
              </Link>
              <Link
                href="/bikes"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-900 dark:text-white rounded-xl font-semibold flex items-center gap-2 transition-all backdrop-blur-sm"
              >
                Explore Bikes <FiArrowRight />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20">
            {[
              { value: "200+", label: "Vehicle Models", icon: BsSpeedometer2 },
              { value: "50+", label: "Brands", icon: FiAward },
              { value: "10K+", label: "Reviews", icon: FiStar },
              { value: "99%", label: "Satisfaction", icon: FiShield },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-5 text-center"
              >
                <stat.icon className="text-red-500 text-2xl mx-auto mb-2" />
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading
              badge="Featured Cars"
              title="Premium Automobiles"
              subtitle="Handpicked selection of the finest cars available"
              center={false}
            />
            <Link
              href="/cars"
              className="hidden sm:flex items-center gap-2 text-red-500 hover:text-red-400 font-medium transition-colors"
            >
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map(car => (
              <VehicleCard
                key={car.id}
                id={car.id}
                name={car.name}
                brand={car.brand}
                category={car.category}
                price={car.price}
                image={car.image}
                rating={car.rating}
                fuelType={car.fuelType}
                transmission={car.transmission}
                horsepower={car.horsepower}
                type="car"
              />
            ))}
          </div>
          <div className="sm:hidden mt-8 text-center">
            <Link href="/cars" className="text-red-500 font-medium flex items-center justify-center gap-2">
              View All Cars <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Bikes */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading
              badge="Featured Bikes"
              title="Iconic Motorcycles"
              subtitle="The best two-wheelers from around the globe"
              center={false}
            />
            <Link
              href="/bikes"
              className="hidden sm:flex items-center gap-2 text-red-500 hover:text-red-400 font-medium transition-colors"
            >
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBikes.map(bike => (
              <VehicleCard
                key={bike.id}
                id={bike.id}
                name={bike.name}
                brand={bike.brand}
                category={bike.category}
                price={bike.price}
                image={bike.image}
                rating={bike.rating}
                fuelType={bike.engine.includes("Electric") ? "Electric" : "Petrol"}
                transmission={bike.transmission}
                horsepower={bike.horsepower}
                type="bike"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Categories"
            title="Browse by Category"
            subtitle="Find exactly what you're looking for"
          />

          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">Car Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {carCategories.slice(0, 6).map(cat => (
                <Link
                  key={cat}
                  href={`/cars?category=${cat}`}
                  className="glass rounded-xl p-4 text-center hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 group"
                >
                  <span className="text-2xl block mb-2">{categoryIcons[cat] || "🚗"}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors">{cat}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">Bike Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {bikeCategories.slice(0, 6).map(cat => (
                <Link
                  key={cat}
                  href={`/bikes?category=${cat}`}
                  className="glass rounded-xl p-4 text-center hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 group"
                >
                  <span className="text-2xl block mb-2">{categoryIcons[cat] || "🏍️"}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors">{cat}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Launches */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Just Launched"
            title="Latest Models"
            subtitle="Fresh arrivals and newest additions to our collection"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestLaunches.map((v, idx) => {
              const isCar = idx < 3;
              const vehicle = v as typeof cars[0] & typeof bikes[0];
              return (
                <div key={`${isCar ? "c" : "b"}-${vehicle.id}`} className="group relative bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden hover:border-red-500/30 transition-all duration-500">
                  <div className="relative h-56 overflow-hidden">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs text-red-400 font-semibold uppercase">{vehicle.brand}</span>
                      <h3 className="text-lg font-bold text-white">{vehicle.name}</h3>
                    </div>
                    <span className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      NEW
                    </span>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{vehicle.category}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">${vehicle.price.toLocaleString()}</p>
                    </div>
                    <Link
                      href={isCar ? `/cars/${vehicle.id}` : `/bikes/${vehicle.id}`}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-xl font-medium transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 to-red-800 p-12 sm:p-16 lg:p-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Find Your Perfect Ride?
              </h2>
              <p className="text-red-100 text-lg mb-8">
                Compare vehicles side by side, explore detailed specifications,
                and make an informed decision.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/compare"
                  className="px-8 py-4 bg-white text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors"
                >
                  Compare Vehicles
                </Link>
                <Link
                  href="/upcoming"
                  className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                >
                  Upcoming Models
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Testimonials"
            title="What Our Users Say"
            subtitle="Trusted by thousands of automotive enthusiasts worldwide"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="glass rounded-2xl p-6 hover:border-red-500/20 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={`${i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
