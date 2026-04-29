"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cars } from "@/data/cars";
import { FiStar, FiArrowLeft, FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsFuelPump, BsSpeedometer2 } from "react-icons/bs";
import { TbManualGearbox, TbEngine } from "react-icons/tb";

export default function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const car = cars.find(c => c.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);

  if (!car) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🚗</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Car Not Found</h2>
          <Link href="/cars" className="text-red-500 hover:text-red-400 font-medium">
            ← Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  const allImages = car.gallery.length > 0 ? car.gallery : [car.image];

  const specs = [
    { label: "Engine", value: car.engine, icon: TbEngine },
    { label: "Horsepower", value: `${car.horsepower} HP`, icon: BsSpeedometer2 },
    { label: "Torque", value: car.torque, icon: BsSpeedometer2 },
    { label: "Transmission", value: car.transmission, icon: TbManualGearbox },
    { label: "Fuel Type", value: car.fuelType, icon: BsFuelPump },
    { label: "Top Speed", value: car.topSpeed, icon: BsSpeedometer2 },
    { label: "0-60 mph", value: car.acceleration, icon: BsSpeedometer2 },
    { label: "Mileage", value: car.mileage, icon: BsFuelPump },
    { label: "Seating", value: `${car.seating} seats`, icon: BsSpeedometer2 },
    { label: "Year", value: `${car.year}`, icon: BsSpeedometer2 },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 mb-8 transition-colors"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 mb-4 bg-gray-200 dark:bg-white/5">
              <img
                src={allImages[activeImage]}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage(i => (i === 0 ? allImages.length - 1 : i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    onClick={() => setActiveImage(i => (i === allImages.length - 1 ? 0 : i + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <FiChevronRight />
                  </button>
                </>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === activeImage ? "border-red-500" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">{car.brand}</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-1 mb-2">
              {car.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-red-500/10 text-red-500 text-sm font-medium rounded-full">
                {car.category}
              </span>
              {car.rating > 0 && (
                <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <FiStar className="text-yellow-400 fill-yellow-400" />
                  {car.rating.toFixed(1)} ({car.reviews} reviews)
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{car.description}</p>

            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              ${car.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-500 ml-2">MSRP</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href={`/compare?type=car&id=${car.id}`}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold transition-colors"
              >
                Compare
              </Link>
              <button className="px-6 py-3 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                Book Test Drive
              </button>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Specifications</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {specs.map((spec, i) => (
              <div
                key={i}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4"
              >
                <spec.icon className="text-red-500 text-xl mb-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{spec.label}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {car.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl"
              >
                <FiCheck className="text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews preview */}
        {car.reviews > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Alex M.", text: `Absolutely love the ${car.name}. The performance is incredible and it turns heads everywhere.`, rating: 5 },
                { name: "Jordan K.", text: `Great value for the price. The ${car.brand} quality really shows in every detail.`, rating: 4 },
              ].map((review, i) => (
                <div key={i} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <FiStar key={si} className={si < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">&ldquo;{review.text}&rdquo;</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{review.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
