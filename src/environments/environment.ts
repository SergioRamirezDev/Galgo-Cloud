// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import gql from 'graphql-tag';
export const environment = {
  BASE_URL: 'localhost:5000',
  API_URL: 'api/v1',
  login: gql`mutation  
  login($username : String!, $password : String!){
    login(username : $username, password : $password){
      id
      username
      firstname
      lastname
      photo
      token
      gender
      position
      position_id
    }
}
`,
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
