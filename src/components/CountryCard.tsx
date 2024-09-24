import { CountryDto } from "@/types/country.dto";

interface CountryCardProps {
  onClick: (country: CountryDto) => void;
  country: CountryDto;
}

const CountryCard = ({ country, onClick }: CountryCardProps) => {
  if (!country) {
    return null;
  }

  const handleCardClick = () => {
    onClick(country);
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col w-full rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 text-left cursor-pointer"
    >
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <img
            src={country.flags.png}
            alt={country.flags.alt}
            className="w-full sm:w-[200px] h-[150px] sm:mr-4 object-cover"
          />
          <div className="p-3 sm:p-0">
            <h3 className="text-lg font-semibold line-clamp-1">
              {country.name.official}
            </h3>
            <div className="details gap-2">
              <p className="text-gray-600 line-clamp-1">
                <span className="font-semibold">CCA2:</span> {country.cca2}
              </p>
              <p className="text-gray-600 line-clamp-1">
                <span className="font-semibold">CCA3:</span> {country.cca3}
              </p>
              <p className="text-gray-600 line-clamp-2">
                <span className="font-semibold">Native Names: </span>
                {Object.entries(country.name?.nativeName || {})
                  .map(([_, name]) => name?.official)
                  .join(", ")}
              </p>
              <p className="text-gray-600 line-clamp-1">
                <span className="font-semibold">Alt Spellings:</span>{" "}
                {country.altSpellings.join(", ")}
              </p>
              <p className="text-gray-600 line-clamp-1">
                <span className="font-semibold">IDD: </span>
                {country.idd?.root?.concat(country.idd?.suffixes[0]) ?? "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
