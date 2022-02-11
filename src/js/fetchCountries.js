const BASE_URL = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = name => {
  const searchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });
  return fetch(`${BASE_URL}${name}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
// export function fetchCountries(name) {
//   const searchParams = new URLSearchParams({
//     fields: 'name.official,capital,population,flags.svg,languages',
//   });
//   return fetch(`${BASE_URL}${name}?${searchParams}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
//  2-вапіант
//   // return fetch(
//   //   'https://restcountries.com/v3.1/name/{name}?fields=name.official,capital,population,flags.svg,languages',
//   // ).then(response => {
//   //   if (!response.ok) {
//   //     throw new Error(response.status);
//   //   }
//   //   return response.json();
//   // });
// }

// https://restcountries.com/v2/all?fields=name,capital,currencies
