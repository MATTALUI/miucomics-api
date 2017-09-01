const request = require('request');




module.exports.createSquareItemFromIssue = function(newIssue){
    console.log(newIssue);
}
module.exports.createSquareCategoryFromSeries = function(newSeries){
  let categoryObject = {
    "id": `series-${newSeries.id}`,
    "name": `${newSeries.title} Volume ${newSeries.volume}`
  }
  let options = {
    url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/categories`,
    method: `POST`,
    body: JSON.stringify(categoryObject),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
    }
  }
  request(options,(error, response, body)=>{});
}
