import "./App.css";
import CountryCatalogs from "./components/CountryCatalogs";

import { useGetCountries } from "./hooks/useGetCountries";
function App() {
  const { data: countries, error } = useGetCountries();

  if (error) {
    throw new Error(error);
  }

  return (
    <div>
      <CountryCatalogs data={countries ?? []} rowsPerPage={25} />
    </div>
  );
}

export default App;
