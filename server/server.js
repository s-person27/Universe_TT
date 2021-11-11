const http = require('http');
const faker = require('faker')

http.createServer((request, response) => {
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });
  setInterval(() => {
    response.write(`data: ${JSON.stringify({
      player: `${faker.name.firstName()} ${faker.name.lastName()}`,
      score: Math.round(Math.random()  * 1000)
      }
    )} \n\n`);
  }, 3000);
}).listen(5000, function(error) {
  if (error) {
    console.log('Something went wrong', error);
  } else {
    console.log('Server is listening on port ' + 5000);
  }
});
