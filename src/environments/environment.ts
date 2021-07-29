// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiRootUrl: 'https://api.hel.fi/servicemap/v2/unit',
  listApiParams: '?service_node=2006&only=location,name,street_address&page=1&page_size=1000',
  singleUnitApiParams: '?include=municipality'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// list units
// https://api.hel.fi/servicemap/v2/unit/?service_node=2006&only=location,name,street_address&page=1&page_size=2

// single unit
// https://api.hel.fi/servicemap/v2/unit/59944/?include=municipality&geometry=true
