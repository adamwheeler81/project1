// Zomato API variables
var zAPI_KEY = "be956a902b4eeb31668a781cdcde7fb5";
//--header "Accept: application/json"
//--header "user-key: be956a902b4eeb31668a781cdcde7fb5" "https://developers.zomato.com/api/v2.1/geocode?lat=45.43&lon=-122.64"

var zQueryStr = "https://developers.zomato.com/api/v2.1/";

var zQueryObj = {
  lat: "",
  lon: ""
  //queryCuisine = "";
};

// Default settings object with empty queryStr
var zSettings = {
  async: true,
  crossDomain: true,
  url: zQueryStr,
  method: "GET",
  headers: {
    Accept: "application/json",
    "user-key": zAPI_KEY
  }
};
