import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { CountryDto } from "../types/country.dto";
import Button from "./Button";
import useModal from "@/hooks/useModal";
import CountryCard from "./CountryCard";

interface CountryCatalogProps {
  data: CountryDto[];
  rowsPerPage?: number;
}

function CountryCatalog({ data, rowsPerPage = 12 }: CountryCatalogProps) {
  const { showModal, setData } = useModal();
  const [filteredCountries, setFilteredData] = useState<CountryDto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState<number>(0);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(true);

  useEffect(() => {
    const fuseOptions = {
      keys: ["name.official"],
      threshold: 0.3, // Adjust for more or less strict matches
    };
    const fuse = new Fuse(data, fuseOptions);
    const filtered = searchTerm
      ? fuse.search(searchTerm).map((result) => result.item)
      : data;

    // Sort filtered results based on the current sort order
    filtered.sort((a, b) => {
      return isSortedAsc
        ? a.name.official.localeCompare(b.name.official)
        : b.name.official.localeCompare(a.name.official);
    });

    setFilteredData(filtered.slice(offset, offset + rowsPerPage));
    setTotalLength(filtered.length);
  }, [data, searchTerm, offset, rowsPerPage, isSortedAsc]);

  const handleNextClick = () => {
    if (offset + rowsPerPage < totalLength) {
      setOffset((prev) => prev + rowsPerPage);
    }
  };

  const handlePrevClick = () => {
    if (offset > 0) {
      setOffset((prev) => Math.max(prev - rowsPerPage, 0));
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setOffset(0);
  };

  const toggleSortOrder = () => {
    setIsSortedAsc((prev) => !prev);
  };

  const handleCountryCardClick = (country: CountryDto) => {
    setData(country);
    showModal(true);
  };

  return (
    <div className="relative p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by Official Name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button
          onClick={toggleSortOrder}
          variants="outline"
          className="text-nowrap"
        >
          Sort {isSortedAsc ? "DESC" : "ASC"}
        </Button>
        <div className="flex justify-end gap-4 items-center">
          <p className="text-nowrap">{`${
            offset + rowsPerPage
          }/${totalLength}`}</p>
          <Button
            variants="outline"
            onClick={handlePrevClick}
            className="hover:bg-slate-500 hover:text-white transition-all"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextClick}
            className="border hover:border-slate-500 hover:text-slate-500 hover:bg-transparent transition-all"
          >
            Next
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filteredCountries.map((country, index) => (
          <CountryCard
            key={index}
            country={country}
            onClick={handleCountryCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default CountryCatalog;
