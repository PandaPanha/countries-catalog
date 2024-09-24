import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import useModal from "@/hooks/useModal";
import { CountryDto } from "@/types/country.dto";
import { DialogTitle } from "@radix-ui/react-dialog";

const CountryModal = () => {
  const { isOpen, showModal, data } = useModal();
  const country = data as CountryDto;

  if (!country) return null; // Handle case where no country data is available
  
  const countryCurrency = country.currencies
    ? country.currencies[Object.keys(country.currencies)[0]].name.concat(
        `(${country.currencies[Object.keys(country.currencies)[0]].symbol})`
      )
    : "N/A";
  const language = country.languages
    ? country.languages[Object.keys(country.languages)[0]]
    : "N/A";
  const capital = country.capital ? country?.capital[0] : "N/A";
  const IDD = country.idd?.root?.concat(country.idd?.suffixes[0]) ?? "N/A";
  const officialNames = Object.entries(country.name?.nativeName || {}).map(([_, name]) => name?.official).join(", ");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => showModal(open)}>
      <DialogContent className="flex flex-col space-y-4 px-4 py-8">
        <DialogHeader >
          <DialogTitle className="text-center font-bold text-slate-600 text-4xl">{country.name.official}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center">
          <img
            src={country.flags.png}
            alt={country.flags.alt}
            className="w-24 h-24 rounded-full object-cover mr-4"
          />
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Capital: </span> {capital}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Region:</span> {country.region} (
              {country.subregion})
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Languages: </span>
              {language}
            </p>
          </div>
        </div>
        <div className="text-gray-600">
          <p className="text-gray-600 line-clamp-2">
            <span className="font-semibold">Native Names: </span>
            {officialNames || 'N/A'}
          </p>
          <p className="line-clamp-2">
            <span className="font-semibold">Alt Spelling: </span>{" "}
            {country.altSpellings.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Currency: </span>
            {countryCurrency}
          </p>
          <p>
            <span className="font-semibold">CCA2:</span> {country.cca2}
          </p>
          <p>
            <span className="font-semibold">CCA3:</span> {country.cca3}
          </p>
          <p>
            <span className="font-semibold">IDD:</span> {IDD}
          </p>
          <p>
            <span className="font-semibold">Time Zone:</span>{" "}
            {country.timezones[0]}
          </p>
        </div>
        <a
          href={country.maps.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View on Google Maps
        </a>
      </DialogContent>
    </Dialog>
  );
};

export default CountryModal;
