import "./App.css";
import CountryCatalogs from "./components/CountryCatalogs";
import Developer from "./components/Developer";

import { useGetCountries } from "./hooks/useGetCountries";
function App() {
  const { data: countries, error } = useGetCountries();

  if (error) {
    throw new Error(error);
  }

  return (
    <div>
      <Developer/>
      <CountryCatalogs data={countries ?? []} rowsPerPage={25} />
    </div>
  );
}

export default App;
