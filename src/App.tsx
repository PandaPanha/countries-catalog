import './App.css';
import CountryCatalog from './components/CountryCatalog';
import { useGetCountries } from './hooks/useGetCountries';
function App() {
  const {data: countries, error, loading} = useGetCountries()
  
  if(error){
    throw new Error(error)
  }

  return (
    <>
      <div>
        <CountryCatalog
          data={countries ?? []} 
          rowsPerPage={25}
        />
      </div>
    </>
  );
}

export default App;
