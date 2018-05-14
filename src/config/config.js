console.log("Running App version " + ENV);

const baseUrl = ENV === 'dev' ? 'http://dev.api.example.com' : ENV === 'uat' ? 'http://uat.api.example.com' : 'http://dev.api.example.com';

console.log(baseUrl)