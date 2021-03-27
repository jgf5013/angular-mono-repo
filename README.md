

# demo-org
This is a mono-repo app build using Angular and Nx. In place of a back-end service, the project relies on hard-coded json initialization data and then saves changes to localStorage. Currently the only project is `amcas-staff`

## Running the app locally
1. `npm install`
2. `ng serve amcas-staff`

## Testing the app
* Unit: `ng test amcas-staff`
* End-to-end: `ng e2e amcas-staff`

## Deploying the app
Note(s):
* Uses `angular-cli-ghpages` dependency

`ng deploy {app-name} --base-href '{app-name}'`