// Root Interface
export interface CountryDto {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currencies;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion?: string;
  languages: Languages;
  translations: Translations;
  latlng: [number, number];
  landlocked: boolean;
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  [code: string]: NativeNameDetail;
}

export interface NativeNameDetail {
  official: string;
  common: string;
}

export interface Currencies {
  [code: string]: CurrencyDetail
}

export interface CurrencyDetail {
  name: string;
  symbol: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Languages {
  [code: string]: string;
}

export interface Translations {
  ara: Translation;
  bre: Translation;
  ces: Translation;
  cym: Translation;
  deu: Translation;
  est: Translation;
  fin: Translation;
  fra: Translation;
  hrv: Translation;
  hun: Translation;
  ita: Translation;
  jpn: Translation;
  kor: Translation;
  nld: Translation;
  per: Translation;
  pol: Translation;
  por: Translation;
  rus: Translation;
  slk: Translation;
  spa: Translation;
  srp: Translation;
  swe: Translation;
  tur: Translation;
  urd: Translation;
  zho: Translation;
}

export interface Translation {
  official: string;
  common: string;
}

export interface Demonyms {
  eng: DemonymDetail;
}

export interface DemonymDetail {
  f: string;
  m: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Car {
  signs: string[];
  side: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface CapitalInfo {
  latlng: [number, number];
}
