"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { bikes } from "@/data/bikes";
import { FiStar, FiArrowLeft, FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsSpeedometer2 } from "react-icons/bs";
import { TbEngine, TbManualGearbox } from "react-icons/tb";
import { GiWeight } from "react-icons/gi";

export default function BikeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();

  const bike = bikes.find((b) => b.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);

  if (!bike) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🏍️</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Bike Not Found
          </h2>
          <Link
            href="/bikes"
            className="text-red-500 hover:text-red-400 font-medium"
          >
            ← Back to Bikes
          </Link>
        </div>
      </div>
    );
  }

  const allImages = bike.gallery.length > 0 ? bike.gallery : [bike.image];

  const specs = [
    { label: "Engine", value: bike.engine, icon: TbEngine },
    {
      label: "Displacement",
      value: bike.cc > 0 ? `${bike.cc}cc` : "Electric",
      icon: TbEngine,
    },
    { label: "Horsepower", value: `${bike.horsepower} HP`, icon: BsSpeedometer2 },
    { label: "Torque", value: bike.torque, icon: BsSpeedometer2 },
    { label: "Transmission", value: bike.transmission, icon: TbManualGearbox },
    { label: "Top Speed", value: bike.topSpeed, icon: BsSpeedometer2 },
    { label: "Mileage", value: bike.mileage, icon: BsSpeedometer2 },
    { label: "Weight", value: bike.weight, icon: GiWeight },
    { label: "Year", value: `${bike.year}`, icon: BsSpeedometer2 },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                alt={bike.name}
                className="w-full h-full object-cover"
              />

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage((i) =>
                        i === 0 ? allImages.length - 1 : i - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <FiChevronLeft />
                  </button>

                  <button
                    onClick={() =>
                      setActiveImage((i) =>
                        i === allImages.length - 1 ? 0 : i + 1
                      )
                    }
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
                      i === activeImage
                        ? "border-red-500"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
              {bike.brand}
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-1 mb-2">
              {bike.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-red-500/10 text-red-500 text-sm font-medium rounded-full">
                {bike.category}
              </span>

              {bike.rating > 0 && (
                <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <FiStar className="text-yellow-400 fill-yellow-400" />
                  {bike.rating.toFixed(1)} ({bike.reviews} reviews)
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {bike.description}
            </p>

            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              ${bike.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-500 ml-2">
                MSRP
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href={`/compare?type=bike&id=${bike.id}`}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold transition-colors"
              >
                Compare
              </Link>

              <button className="px-6 py-3 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                Book Test Ride
              </button>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Specifications
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {specs.map((spec, i) => (
              <div
                key={i}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4"
              >
                <spec.icon className="text-red-500 text-xl mb-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {spec.label}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Key Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {bike.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl"
              >
                <FiCheck className="text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}