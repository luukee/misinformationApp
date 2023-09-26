{/* <script type="text/javascript" src="States.json"></script> */}
// import data from './States.json';
// let json = require('./Cities.json');
// console.log(json.length)
// let tempStates = [];
// json.map((stateData) => {
//     tempStates.push({
//       label: stateData.name,
//       value: stateData.name,
//     });
//   });


  let tempCities = [];
  selectedState = "New York"
//   state = json
  let json1 = require('./Cities.json');
//   console.log(json1)
   json1.find((state) => state.name == selectedState).cities.map((city) => {
        tempCities.push({
          label: city.name,
          value: city.name,
        });
      });
console.log(tempCities)

//   Object.keys(
//     json1.find((state) => state.name === selectedState)._data
//     ).map((city) => {
//       tempCities.push({
//         label: city.name,
//         value: city.name,
//       });
//     });


  console.log(tempCities)
