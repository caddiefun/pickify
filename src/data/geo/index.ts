// Geo data utilities for ISP availability lookup

export interface USState {
  code: string;
  name: string;
  slug: string;
}

export interface USCity {
  name: string;
  slug: string;
  stateCode: string;
  zipCodes: string[];
}

export interface ZipCodeData {
  zipCode: string;
  city: string;
  stateCode: string;
  providers: string[]; // Array of provider slugs available in this zip
}

// All US states
export const usStates: USState[] = [
  { code: "AL", name: "Alabama", slug: "alabama" },
  { code: "AK", name: "Alaska", slug: "alaska" },
  { code: "AZ", name: "Arizona", slug: "arizona" },
  { code: "AR", name: "Arkansas", slug: "arkansas" },
  { code: "CA", name: "California", slug: "california" },
  { code: "CO", name: "Colorado", slug: "colorado" },
  { code: "CT", name: "Connecticut", slug: "connecticut" },
  { code: "DE", name: "Delaware", slug: "delaware" },
  { code: "DC", name: "District of Columbia", slug: "washington-dc" },
  { code: "FL", name: "Florida", slug: "florida" },
  { code: "GA", name: "Georgia", slug: "georgia" },
  { code: "HI", name: "Hawaii", slug: "hawaii" },
  { code: "ID", name: "Idaho", slug: "idaho" },
  { code: "IL", name: "Illinois", slug: "illinois" },
  { code: "IN", name: "Indiana", slug: "indiana" },
  { code: "IA", name: "Iowa", slug: "iowa" },
  { code: "KS", name: "Kansas", slug: "kansas" },
  { code: "KY", name: "Kentucky", slug: "kentucky" },
  { code: "LA", name: "Louisiana", slug: "louisiana" },
  { code: "ME", name: "Maine", slug: "maine" },
  { code: "MD", name: "Maryland", slug: "maryland" },
  { code: "MA", name: "Massachusetts", slug: "massachusetts" },
  { code: "MI", name: "Michigan", slug: "michigan" },
  { code: "MN", name: "Minnesota", slug: "minnesota" },
  { code: "MS", name: "Mississippi", slug: "mississippi" },
  { code: "MO", name: "Missouri", slug: "missouri" },
  { code: "MT", name: "Montana", slug: "montana" },
  { code: "NE", name: "Nebraska", slug: "nebraska" },
  { code: "NV", name: "Nevada", slug: "nevada" },
  { code: "NH", name: "New Hampshire", slug: "new-hampshire" },
  { code: "NJ", name: "New Jersey", slug: "new-jersey" },
  { code: "NM", name: "New Mexico", slug: "new-mexico" },
  { code: "NY", name: "New York", slug: "new-york" },
  { code: "NC", name: "North Carolina", slug: "north-carolina" },
  { code: "ND", name: "North Dakota", slug: "north-dakota" },
  { code: "OH", name: "Ohio", slug: "ohio" },
  { code: "OK", name: "Oklahoma", slug: "oklahoma" },
  { code: "OR", name: "Oregon", slug: "oregon" },
  { code: "PA", name: "Pennsylvania", slug: "pennsylvania" },
  { code: "RI", name: "Rhode Island", slug: "rhode-island" },
  { code: "SC", name: "South Carolina", slug: "south-carolina" },
  { code: "SD", name: "South Dakota", slug: "south-dakota" },
  { code: "TN", name: "Tennessee", slug: "tennessee" },
  { code: "TX", name: "Texas", slug: "texas" },
  { code: "UT", name: "Utah", slug: "utah" },
  { code: "VT", name: "Vermont", slug: "vermont" },
  { code: "VA", name: "Virginia", slug: "virginia" },
  { code: "WA", name: "Washington", slug: "washington" },
  { code: "WV", name: "West Virginia", slug: "west-virginia" },
  { code: "WI", name: "Wisconsin", slug: "wisconsin" },
  { code: "WY", name: "Wyoming", slug: "wyoming" },
];

// Major US cities for initial launch (top metros)
export const usCities: USCity[] = [
  // California
  { name: "Los Angeles", slug: "los-angeles", stateCode: "CA", zipCodes: ["90001", "90002", "90003", "90004", "90005", "90006", "90007", "90008", "90210", "90211"] },
  { name: "San Francisco", slug: "san-francisco", stateCode: "CA", zipCodes: ["94102", "94103", "94104", "94105", "94107", "94108", "94109", "94110", "94111", "94112"] },
  { name: "San Diego", slug: "san-diego", stateCode: "CA", zipCodes: ["92101", "92102", "92103", "92104", "92105", "92106", "92107", "92108", "92109", "92110"] },
  { name: "San Jose", slug: "san-jose", stateCode: "CA", zipCodes: ["95110", "95111", "95112", "95113", "95116", "95117", "95118", "95119", "95120", "95121"] },
  // Texas
  { name: "Houston", slug: "houston", stateCode: "TX", zipCodes: ["77001", "77002", "77003", "77004", "77005", "77006", "77007", "77008", "77009", "77010"] },
  { name: "Dallas", slug: "dallas", stateCode: "TX", zipCodes: ["75201", "75202", "75203", "75204", "75205", "75206", "75207", "75208", "75209", "75210"] },
  { name: "Austin", slug: "austin", stateCode: "TX", zipCodes: ["78701", "78702", "78703", "78704", "78705", "78751", "78752", "78753", "78754", "78756"] },
  { name: "San Antonio", slug: "san-antonio", stateCode: "TX", zipCodes: ["78201", "78202", "78203", "78204", "78205", "78207", "78208", "78209", "78210", "78211"] },
  // New York
  { name: "New York", slug: "new-york-city", stateCode: "NY", zipCodes: ["10001", "10002", "10003", "10004", "10005", "10006", "10007", "10010", "10011", "10012"] },
  { name: "Brooklyn", slug: "brooklyn", stateCode: "NY", zipCodes: ["11201", "11202", "11203", "11204", "11205", "11206", "11207", "11208", "11209", "11210"] },
  // Florida
  { name: "Miami", slug: "miami", stateCode: "FL", zipCodes: ["33101", "33109", "33125", "33126", "33127", "33128", "33129", "33130", "33131", "33132"] },
  { name: "Orlando", slug: "orlando", stateCode: "FL", zipCodes: ["32801", "32802", "32803", "32804", "32805", "32806", "32807", "32808", "32809", "32810"] },
  { name: "Tampa", slug: "tampa", stateCode: "FL", zipCodes: ["33601", "33602", "33603", "33604", "33605", "33606", "33607", "33609", "33610", "33611"] },
  // Illinois
  { name: "Chicago", slug: "chicago", stateCode: "IL", zipCodes: ["60601", "60602", "60603", "60604", "60605", "60606", "60607", "60608", "60609", "60610"] },
  // Pennsylvania
  { name: "Philadelphia", slug: "philadelphia", stateCode: "PA", zipCodes: ["19101", "19102", "19103", "19104", "19106", "19107", "19109", "19111", "19112", "19113"] },
  // Arizona
  { name: "Phoenix", slug: "phoenix", stateCode: "AZ", zipCodes: ["85001", "85002", "85003", "85004", "85006", "85007", "85008", "85009", "85012", "85013"] },
  // Georgia
  { name: "Atlanta", slug: "atlanta", stateCode: "GA", zipCodes: ["30301", "30302", "30303", "30304", "30305", "30306", "30307", "30308", "30309", "30310"] },
  // Washington
  { name: "Seattle", slug: "seattle", stateCode: "WA", zipCodes: ["98101", "98102", "98103", "98104", "98105", "98106", "98107", "98108", "98109", "98112"] },
  // Colorado
  { name: "Denver", slug: "denver", stateCode: "CO", zipCodes: ["80201", "80202", "80203", "80204", "80205", "80206", "80207", "80209", "80210", "80211"] },
  // Massachusetts
  { name: "Boston", slug: "boston", stateCode: "MA", zipCodes: ["02101", "02102", "02103", "02104", "02105", "02106", "02107", "02108", "02109", "02110"] },
  // Nevada
  { name: "Las Vegas", slug: "las-vegas", stateCode: "NV", zipCodes: ["89101", "89102", "89103", "89104", "89106", "89107", "89108", "89109", "89110", "89113"] },
  // North Carolina
  { name: "Charlotte", slug: "charlotte", stateCode: "NC", zipCodes: ["28201", "28202", "28203", "28204", "28205", "28206", "28207", "28208", "28209", "28210"] },
  // Michigan
  { name: "Detroit", slug: "detroit", stateCode: "MI", zipCodes: ["48201", "48202", "48203", "48204", "48205", "48206", "48207", "48208", "48209", "48210"] },
  // Maryland
  { name: "Baltimore", slug: "baltimore", stateCode: "MD", zipCodes: ["21201", "21202", "21203", "21204", "21205", "21206", "21207", "21208", "21209", "21210"] },
  // Oregon
  { name: "Portland", slug: "portland", stateCode: "OR", zipCodes: ["97201", "97202", "97203", "97204", "97205", "97206", "97209", "97210", "97211", "97212"] },
];

// Sample zip code availability data (this would come from FCC BDC in production)
// For MVP, we'll generate based on state coverage from provider data
export const zipCodeAvailability: ZipCodeData[] = generateZipCodeAvailability();

function generateZipCodeAvailability(): ZipCodeData[] {
  const availability: ZipCodeData[] = [];

  // Provider availability by state (simplified for MVP)
  const providerStateMap: Record<string, string[]> = {
    "xfinity": ["AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "NC", "NH", "NJ", "NM", "NV", "NY", "OH", "OR", "PA", "RI", "SC", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV"],
    "att-fiber": ["AL", "AR", "CA", "FL", "GA", "IL", "IN", "KS", "KY", "LA", "MI", "MO", "MS", "NC", "NV", "OH", "OK", "SC", "TN", "TX", "WI"],
    "verizon-fios": ["CT", "DC", "DE", "MD", "MA", "NJ", "NY", "PA", "RI", "VA"],
    "spectrum": ["AL", "AZ", "CA", "CO", "CT", "FL", "GA", "HI", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OR", "PA", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"],
    "cox": ["AZ", "AR", "CA", "CT", "FL", "GA", "ID", "IA", "KS", "LA", "MA", "NE", "NV", "NC", "OH", "OK", "RI", "VA"],
    "centurylink": ["AL", "AZ", "AR", "CA", "CO", "FL", "GA", "IA", "ID", "IL", "IN", "KS", "LA", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NM", "NV", "OH", "OK", "OR", "PA", "SC", "SD", "TN", "TX", "UT", "VA", "WA", "WI", "WY"],
    "frontier": ["AL", "AZ", "CA", "CT", "FL", "GA", "IL", "IN", "MI", "MN", "MS", "NC", "NV", "NY", "OH", "PA", "SC", "TN", "TX", "UT", "VA", "WA", "WI", "WV"],
    "google-fiber": ["AL", "AZ", "CA", "CO", "GA", "IA", "KS", "MO", "NC", "NE", "NV", "TN", "TX", "UT"],
    "t-mobile-home-internet": ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
    "starlink": ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
    "hughesnet": ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
    "optimum": ["CT", "NJ", "NY", "PA"],
  };

  // Generate availability for each city's zip codes
  for (const city of usCities) {
    for (const zipCode of city.zipCodes) {
      const providers: string[] = [];

      for (const [providerSlug, states] of Object.entries(providerStateMap)) {
        if (states.includes(city.stateCode)) {
          providers.push(providerSlug);
        }
      }

      availability.push({
        zipCode,
        city: city.name,
        stateCode: city.stateCode,
        providers,
      });
    }
  }

  return availability;
}

// Lookup functions
export function getStateBySlug(slug: string): USState | undefined {
  return usStates.find((s) => s.slug === slug);
}

export function getStateByCode(code: string): USState | undefined {
  return usStates.find((s) => s.code === code.toUpperCase());
}

export function getCitiesByState(stateCode: string): USCity[] {
  return usCities.filter((c) => c.stateCode === stateCode.toUpperCase());
}

export function getCityBySlug(stateSlug: string, citySlug: string): USCity | undefined {
  const state = getStateBySlug(stateSlug);
  if (!state) return undefined;
  return usCities.find((c) => c.slug === citySlug && c.stateCode === state.code);
}

export function getZipCodeData(zipCode: string): ZipCodeData | undefined {
  return zipCodeAvailability.find((z) => z.zipCode === zipCode);
}

export function getProvidersByZipCode(zipCode: string): string[] {
  const data = getZipCodeData(zipCode);
  return data?.providers || [];
}

export function isValidZipCode(zipCode: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
}

// Get all unique zip codes for static generation
export function getAllZipCodes(): string[] {
  return zipCodeAvailability.map((z) => z.zipCode);
}

// Get all states with cities for navigation
export function getStatesWithCities(): { state: USState; cities: USCity[] }[] {
  return usStates
    .map((state) => ({
      state,
      cities: getCitiesByState(state.code),
    }))
    .filter((item) => item.cities.length > 0);
}

// Get city data from a zip code
export function getCityByZipCode(zipCode: string): USCity | undefined {
  const zipData = getZipCodeData(zipCode);
  if (!zipData) return undefined;
  return usCities.find(
    (c) => c.name === zipData.city && c.stateCode === zipData.stateCode
  );
}

// Get sibling zip codes (other zips in the same city)
export function getSiblingZipCodes(zipCode: string): string[] {
  const city = getCityByZipCode(zipCode);
  if (!city) return [];
  return city.zipCodes.filter((z) => z !== zipCode);
}

// Get nearby cities (same state, different city)
export function getNearbyCities(stateCode: string, currentCitySlug: string, limit: number = 5): USCity[] {
  return usCities
    .filter((c) => c.stateCode === stateCode && c.slug !== currentCitySlug)
    .slice(0, limit);
}

// Get state slug from state code
export function getStateSlugFromCode(stateCode: string): string | undefined {
  const state = getStateByCode(stateCode);
  return state?.slug;
}
