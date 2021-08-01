const http = require('http');
const fs = require('fs');
const requests = require('requests');
const hostname = '127.0.0.1';
const port = 80;
const index = fs.readFileSync('index.html','utf-8')
// console.log(index)
const replaceVal1= (tempVal, orgVal) => {
  const tempp = eval(orgVal.main.temp_min )
  const num = Number(273.15)
  const rslt =  (num -tempp )* -1
  console.log(rslt )
  let temperature = tempVal.replace('{% temp %}', (rslt) );
   temperature = temperature.replace('{% min %}',orgVal.main.temp_min  - 273.15 );
   temperature = temperature.replace('{% max %}',orgVal.main.temp_max  - 273.15 );
   temperature = temperature.replace('{% city %}',orgVal.name);
    temperature = temperature.replace('{% IN %}',orgVal.sys.country);
    temperature = temperature.replace('{% statusApi %}',orgVal.weather[0].main);
    return temperature;
};
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  if (req.url == '/'){

    requests('http://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=d45da12ed813451af083ef5b92c31a3c')
    .on('data', function (chunk) {
      const objJason = JSON.parse(chunk)
      const arrayJason =[objJason]
      // console.log(objJason['coord'].lon)
      const mycurrentData = arrayJason.map(val => replaceVal1(index, val)).join('');
      res.write(mycurrentData)
      // console.log(mycurrentData)

    })
    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
      res.end();
    });}
  
  else {
    res.statusCode = 404;
    res.end(`<h1> 404 page not found`)  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});