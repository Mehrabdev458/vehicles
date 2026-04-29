"use client";

import Link from "next/link";
import { FiStar, FiArrowRight } from "react-icons/fi";
import { BsFuelPump } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";

interface VehicleCardProps {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  fuelType?: string;
  transmission?: string;
  horsepower: number;
  type: "car" | "bike";
}

export default function VehicleCard({
  id, name, brand, category, price, image, rating, fuelType, transmission, horsepower, type,
}: VehicleCardProps) {
  const href = type === "car" ? `/cars/${id}` : `/bikes/${id}`;

  return (
    <div className="group bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden hover:border-red-500/30 dark:hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-500">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
          {category}
        </span>
        {rating > 0 && (
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-xs rounded-full">
            <FiStar className="text-yellow-400 fill-yellow-400" /> {rating.toFixed(1)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-red-500 font-semibold uppercase tracking-wider mb-1">{brand}</p>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-500 transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
          {fuelType && (
            <span className="flex items-center gap-1">
              <BsFuelPump /> {fuelType}
            </span>
          )}
          {transmission && (
            <span className="flex items-center gap-1">
              <TbManualGearbox /> {transmission.split(" ")[0]}
            </span>
          )}
          <span>{horsepower} HP</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ${price.toLocaleString()}
          </p>
          <Link
            href={href}
            className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
          >
            View <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
