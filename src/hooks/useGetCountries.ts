import { API } from "../constants/api";
import { CountryDto } from "../types/country.dto";
import useFetch from "./useFetch";

export const useGetCountries = () => {
  return useFetch<CountryDto[]>(API.COUNTRY.ALL, { method: 'GET' });
};