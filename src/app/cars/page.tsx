"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import SearchFilter from "@/components/SearchFilter";
import VehicleCard from "@/components/VehicleCard";
import { cars, carBrands, carCategories, fuelTypes } from "@/data/cars";

const priceRanges = ["Under $50K", "$50K - $100K", "$100K - $200K", "Over $200K"];

function filterByPrice(price: number, range: string): boolean {
  switch (range) {
    case "Under $50K": return price < 50000;
    case "$50K - $100K": return price >= 50000 && price < 100000;
    case "$100K - $200K": return price >= 100000 && price < 200000;
    case "Over $200K": return price >= 200000;
    default: return true;
  }
}

function CarsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [fuel, setFuel] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const available = cars.filter(c => !c.isUpcoming);

  const filtered = useMemo(() => {
    return available.filter(car => {
      const matchSearch = car.name.toLowerCase().includes(search.toLowerCase()) ||
                         car.brand.toLowerCase().includes(search.toLowerCase());
      const matchBrand = !brand || car.brand === brand;
      const matchCategory = !category || car.category === category;
      const matchFuel = !fuel || car.fuelType === fuel;
      const matchPrice = !priceRange || filterByPrice(car.price, priceRange);
      return matchSearch && matchBrand && matchCategory && matchFuel && matchPrice;
    });
  }, [available, search, brand, category, fuel, priceRange]);

  return (
    <>
      <div className="mb-8">
        <SectionHeading
          badge="Explore"
          title="All Cars"
          subtitle={`Showing ${filtered.length} of ${available.length} cars`}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setCategory("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !category
              ? "bg-red-600 text-white"
              : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-red-500/10 hover:text-red-500"
          }`}
        >
          All
        </button>
        {carCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(category === cat ? "" : cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? "bg-red-600 text-white"
                : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-red-500/10 hover:text-red-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <SearchFilter
        searchTerm={search}
        onSearchChange={setSearch}
        placeholder="Search cars by name or brand..."
        filters={[
          { label: "All Brands", value: brand, onChange: setBrand, options: carBrands },
          { label: "All Prices", value: priceRange, onChange: setPriceRange, options: priceRanges },
          { label: "All Fuels", value: fuel, onChange: setFuel, options: fuelTypes },
        ]}
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(car => (
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
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No cars found</h3>
          <p className="text-gray-500">Try adjusting your filters or search term.</p>
        </div>
      )}
    </>
  );
}

export default function CarsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-20"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" /></div>}>
          <CarsContent />
        </Suspense>
      </div>
    </div>
  );
}
