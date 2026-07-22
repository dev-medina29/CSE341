const URI=require("urijs")
let source = "Visit http://google.com or http://bing.com";
let result = URI.withinString(source, (url) => `<a>${url}</a>`);

console.log(result);

// console.log(10)