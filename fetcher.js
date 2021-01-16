// Use the request library to make the HTTP request
// Use Node's fs module to write the file
// Use the callback based approach we've been learning so far
// Do not use the pipe function
// Do not use synchronous functions (see warning below)

// Implement a small command line node app called fetcher.js which should take a URL as
//  command-line argument as well as a local file path and download the resource to the specified path.


const request = require('request');
const fs = require('fs');

const input = process.argv.slice(2);

const website = input[0];

const filePath = input[1];

// What should happen if the given URL results in an error or non-200 result?


console.log(`Website: ${website}`);
console.log(`File path: ${filePath}`);

request(`http://${website}`, function (err, response, body) {
  // console.log('statusCode:', response && response.statusCode);
  // console.log('body:', body); 

  if (response && response.statusCode > 199 && response && response.statusCode <= 299) {
    const data = body;
    if (filePath === "./index.html") {
      // if the file path exists
      fs.writeFile(`${filePath}`, data, (err) => {
        fs.stat(filePath, (err, data) => {

          // console.log(`the total lenght of body is ${body.length}`)
          console.log(`Downloaded and saved ${data.size} bytes to ${filePath}`);
        });

        if (err) console.log(err); {
          console.log("Successfully Written to File.");
        }

      });
    } else { console.log("Invalid file path."); }
  } else { console.log("Error: Status code", response && response.statusCode)}
});

// What should happen if the local file path given is invalid?