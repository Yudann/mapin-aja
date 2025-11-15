// src\components\section\recommendation\FilterSections.tsx

import React from "react";
import FilterSection from "./FilterSection";
import { RECOMMENDATION_FILTERS } from "@/data/recommendation";

interface FilterSectionsProps {
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  scrollRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  scrollLeft: (filterId: string) => void;
  scrollRight: (filterId: string) => void;
}

export default function FilterSections({
  favorites,
  toggleFavorite,
  scrollRefs,
  scrollLeft,
  scrollRight,
}: FilterSectionsProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 pb-8">
      {RECOMMENDATION_FILTERS.map((filter, idx) => (
        <FilterSection
          key={filter.id}
          filter={filter}
          index={idx}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          scrollRefs={scrollRefs}
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
        />
      ))}
    </main>
  );
}
