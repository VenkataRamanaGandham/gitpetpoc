var fs = require('fs');
const soap = require('soap');
var parseString = require('xml2js').parseString;

var xmlOut = '';

function getQuotes(req) {
    try{        
        const jsonData = JSON.parse(JSON.stringify(req.body));
        var url = 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl';
        var args = { zipCodeList: jsonData.zipcode };

        (async function() {
            var client = await soap.createClientAsync(url);
            (async function() {
                var result = await client.LatLonListZipCodeAsync(args);
                parseString(result[0].listLatLonOut.$value, function (err, xmlresult) {                    
                    xmlOut =  xmlresult.dwml.latLonList;
                });
            })();
          })();

          
        // soap.createClient(url, function(err, client) {
        //       client.LatLonListZipCode(args, function(err, xmlresult) {
        //           parseString(xmlresult.listLatLonOut.$value, function (err, result) {                    
        //             xmlOut =  result.dwml.latLonList;
        //         });
        //       });
        //   });

      } catch(error) {
          console.log(error);
      }
      return xmlOut;
}

exports.getQuotes = getQuotes;