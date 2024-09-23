import React, { useState, useEffect } from "react";
import Fuse from "fuse.js"; // Importing Fuse.js for fuzzy search
import { CountryDto } from "../types/country.dto";
import Button from "./Button";

interface CountryCatalogProps {
  data: CountryDto[];
  rowsPerPage?: number;
}

function CountryCatalog({ data, rowsPerPage = 12 }: CountryCatalogProps) {
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
          <p className="text-nowrap">Total counties: {totalLength}</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {filteredCountries.map((row, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 text-left"
          >
            <img
              src={row.flags.png}
              alt={row.flags.alt}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{row.name.official}</h3>
              <p className="text-gray-600">CCA2: {row.cca2}</p>
              <p className="text-gray-600">CCA3: {row.cca3}</p>
              <p className="text-gray-600">
                Native Names:{" "}
                {Object.entries(row.name?.nativeName || {})
                  .map(([_, name]) => name?.official)
                  .join(", ")}
              </p>
              <p className="text-gray-600">
                Alt Spellings: {row.altSpellings.join(", ")}
              </p>
              <p className="text-gray-600">IDD: {row.idd?.root?.concat(row.idd?.suffixes[0])}</p>
              <div className="text-center mt-4">
                <Button variants="outline" className="rounded-full py-1">
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryCatalog;
