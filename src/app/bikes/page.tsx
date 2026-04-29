"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import SearchFilter from "@/components/SearchFilter";
import VehicleCard from "@/components/VehicleCard";
import { bikes, bikeBrands, bikeCategories } from "@/data/bikes";

const ccRanges = ["Under 500cc", "500cc - 1000cc", "Over 1000cc"];

function filterByCC(cc: number, range: string): boolean {
  switch (range) {
    case "Under 500cc": return cc < 500;
    case "500cc - 1000cc": return cc >= 500 && cc <= 1000;
    case "Over 1000cc": return cc > 1000;
    default: return true;
  }
}

function BikesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [ccRange, setCCRange] = useState("");

  const available = bikes.filter(b => !b.isUpcoming);

  const filtered = useMemo(() => {
    return available.filter(bike => {
      const matchSearch = bike.name.toLowerCase().includes(search.toLowerCase()) ||
                         bike.brand.toLowerCase().includes(search.toLowerCase());
      const matchBrand = !brand || bike.brand === brand;
      const matchCategory = !category || bike.category === category;
      const matchCC = !ccRange || filterByCC(bike.cc, ccRange);
      return matchSearch && matchBrand && matchCategory && matchCC;
    });
  }, [available, search, brand, category, ccRange]);

  return (
    <>
      <div className="mb-8">
        <SectionHeading
          badge="Explore"
          title="All Bikes"
          subtitle={`Showing ${filtered.length} of ${available.length} bikes`}
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
        {bikeCategories.map(cat => (
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
        placeholder="Search bikes by name or brand..."
        filters={[
          { label: "All Brands", value: brand, onChange: setBrand, options: bikeBrands },
          { label: "All CC", value: ccRange, onChange: setCCRange, options: ccRanges },
        ]}
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(bike => (
            <VehicleCard
              key={bike.id}
              id={bike.id}
              name={bike.name}
              brand={bike.brand}
              category={bike.category}
              price={bike.price}
              image={bike.image}
              rating={bike.rating}
              fuelType={bike.cc > 0 ? `${bike.cc}cc` : "Electric"}
              transmission={bike.transmission}
              horsepower={bike.horsepower}
              type="bike"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No bikes found</h3>
          <p className="text-gray-500">Try adjusting your filters or search term.</p>
        </div>
      )}
    </>
  );
}

export default function BikesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-20"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" /></div>}>
          <BikesContent />
        </Suspense>
      </div>
    </div>
  );
}
