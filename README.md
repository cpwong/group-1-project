# React CRUD with Axios + API

## Create local JSON server
- Create `data.json` and insert data, e.g. from http://mockaroo.com 
- Don't forget to remove last comma (`,`) in the array!
### `data.json` format
```json
{
  "contacts":  // endpoint
  [
    {
      "id": 1, 
      "name": "Shayne Eliasson",
      "email": "seliasson0@fda.gov"
    },
    {
      ...
      // last item has no comma!
    }  
  ]
}
```
Start JSON server with NPX
```
npx json-server --port 3300 --watch data.json
```
- Check JSON server is running by going to http://localhost:3300/contacts
- JSON server data can have multiple endpoints by adding extra keys (e.g. "contacts") in the array
- For example, add a new "recipes" key in `data.json` and access it with http://localhost:3300/recipes 
- TabStock component requires at least a data.json file that contains 2 end-points: "stock-data", "stock-history"
- A template data.json file is available in data_backup.json
- DO NOT commit data.json file into Github as the file can grow quite large (megabytes)

## Create api modules
- Create ./api directory
- Create API.js
- Create axios instance in API.js
- Add `import API from './api/API.js'` to App.js file
- Test axios is able to connect to JSON server

## Start React app
- Add apiGetContacts to fetch data from the app and test it using `console.log()`
- Move apiGetContacts into `App.js`
- Add and useEffect and useState in `App.js` to download data upon App component mount
- Check component inspector to see state variables

## Create your components in src/components sub-folder

- Keep all your source your source files within that folder for ease of integration
- If you need to add/change any other file *outside* your project sub-folder, please inform the repo owner


## Building React + Axios with API Key

- Create a .env.local file with the content:
 `REACT_APP_API_KEY=<your_own_api_key>`
- Add `.env.local` to `.gitignore` to exclude the secret api key file when you commit to Github

> WARNING: 
  - NOT RECOMMENDED for use in production code
  - API key will still be visible in compiled code
  - DO NOT check the .env.local file into Github repository

```js
 export const API2 = axios.create({
   baseURL:'https://mboum-finance.p.rapidapi.com',
   headers: {
     'x-rapidapi-host': 'mboum-finance.p.rapidapi.com',
     'x-rapidapi-key': process.env.REACT_APP_API_KEY
   }    
 })
```

Run `npm start` after adding/changing API key


