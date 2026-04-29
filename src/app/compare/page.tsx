"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import { cars } from "@/data/cars";
import { bikes } from "@/data/bikes";

type CompareMode = "cars" | "bikes";

function CompareContent() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") === "bike" ? "bikes" : "cars") as CompareMode;
  const initialId = searchParams.get("id") || "";

  const [mode, setMode] = useState<CompareMode>(initialType);
  const [selection1, setSelection1] = useState(initialId);
  const [selection2, setSelection2] = useState("");

  const availableCars = cars.filter(c => !c.isUpcoming);
  const availableBikes = bikes.filter(b => !b.isUpcoming);

  const items = mode === "cars" ? availableCars : availableBikes;

  const item1 = items.find(v => v.id === Number(selection1));
  const item2 = items.find(v => v.id === Number(selection2));

  const carSpecs = (c: typeof cars[0]) => [
    { label: "Brand", v: c.brand },
    { label: "Category", v: c.category },
    { label: "Price", v: `$${c.price.toLocaleString()}` },
    { label: "Engine", v: c.engine },
    { label: "Horsepower", v: `${c.horsepower} HP` },
    { label: "Torque", v: c.torque },
    { label: "Transmission", v: c.transmission },
    { label: "Fuel Type", v: c.fuelType },
    { label: "Top Speed", v: c.topSpeed },
    { label: "0-60 mph", v: c.acceleration },
    { label: "Mileage", v: c.mileage },
    { label: "Seating", v: `${c.seating}` },
    { label: "Year", v: `${c.year}` },
    { label: "Rating", v: c.rating > 0 ? `${c.rating}/5` : "N/A" },
  ];

  const bikeSpecs = (b: typeof bikes[0]) => [
    { label: "Brand", v: b.brand },
    { label: "Category", v: b.category },
    { label: "Price", v: `$${b.price.toLocaleString()}` },
    { label: "Engine", v: b.engine },
    { label: "Displacement", v: b.cc > 0 ? `${b.cc}cc` : "Electric" },
    { label: "Horsepower", v: `${b.horsepower} HP` },
    { label: "Torque", v: b.torque },
    { label: "Transmission", v: b.transmission },
    { label: "Top Speed", v: b.topSpeed },
    { label: "Mileage", v: b.mileage },
    { label: "Weight", v: b.weight },
    { label: "Year", v: `${b.year}` },
    { label: "Rating", v: b.rating > 0 ? `${b.rating}/5` : "N/A" },
  ];

  const getSpecs = (item: typeof cars[0] | typeof bikes[0]) => {
    if (mode === "cars") return carSpecs(item as typeof cars[0]);
    return bikeSpecs(item as typeof bikes[0]);
  };

  const specs1 = item1 ? getSpecs(item1) : null;
  const specs2 = item2 ? getSpecs(item2) : null;

  return (
    <>
      <SectionHeading
        badge="Compare"
        title="Compare Vehicles"
        subtitle="Select two vehicles to compare their specifications side by side"
      />

      <div className="flex justify-center gap-2 mb-10">
        <button
          onClick={() => { setMode("cars"); setSelection1(""); setSelection2(""); }}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
            mode === "cars" ? "bg-red-600 text-white" : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
          }`}
        >
          🚗 Compare Cars
        </button>
        <button
          onClick={() => { setMode("bikes"); setSelection1(""); setSelection2(""); }}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
            mode === "bikes" ? "bg-red-600 text-white" : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
          }`}
        >
          🏍️ Compare Bikes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Vehicle 1</h3>
          <select
            value={selection1}
            onChange={e => setSelection1(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-red-500"
          >
            <option value="" className="bg-white dark:bg-gray-800">Select {mode === "cars" ? "a car" : "a bike"}</option>
            {items.map(v => (
              <option key={v.id} value={v.id} className="bg-white dark:bg-gray-800">
                {v.brand} {v.name}
              </option>
            ))}
          </select>
          {item1 && (
            <div className="mt-4">
              <img src={item1.image} alt={item1.name} className="w-full h-40 object-cover rounded-xl" />
              <h4 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">{item1.name}</h4>
              <p className="text-red-500 font-semibold">${item1.price.toLocaleString()}</p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Vehicle 2</h3>
          <select
            value={selection2}
            onChange={e => setSelection2(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-red-500"
          >
            <option value="" className="bg-white dark:bg-gray-800">Select {mode === "cars" ? "a car" : "a bike"}</option>
            {items.map(v => (
              <option key={v.id} value={v.id} className="bg-white dark:bg-gray-800">
                {v.brand} {v.name}
              </option>
            ))}
          </select>
          {item2 && (
            <div className="mt-4">
              <img src={item2.image} alt={item2.name} className="w-full h-40 object-cover rounded-xl" />
              <h4 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">{item2.name}</h4>
              <p className="text-red-500 font-semibold">${item2.price.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>

      {specs1 && specs2 ? (
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-100 dark:bg-white/10 px-6 py-4">
            <p className="font-semibold text-gray-700 dark:text-gray-300">Specification</p>
            <p className="font-semibold text-gray-900 dark:text-white text-center">{item1!.name}</p>
            <p className="font-semibold text-gray-900 dark:text-white text-center">{item2!.name}</p>
          </div>
          {specs1.map((spec, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-6 py-4 border-t border-gray-200 dark:border-white/5 ${
                i % 2 === 0 ? "" : "bg-gray-50 dark:bg-white/[0.02]"
              }`}
            >
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{spec.label}</p>
              <p className="text-sm text-gray-900 dark:text-white text-center">{spec.v}</p>
              <p className="text-sm text-gray-900 dark:text-white text-center">{specs2[i].v}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
          <p className="text-5xl mb-4">⚖️</p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Select two vehicles to compare
          </h3>
          <p className="text-gray-500">Choose one vehicle from each dropdown above to see the comparison.</p>
        </div>
      )}
    </>
  );
}

export default function ComparePage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-20"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" /></div>}>
          <CompareContent />
        </Suspense>
      </div>
    </div>
  );
}
