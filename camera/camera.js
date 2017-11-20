'use strict';

// Import the interface to Tessel hardware
const tessel = require('tessel');

// Turn one of the LEDs on to start.
// tessel.led[2].on();

// // Blink!
// setInterval(() => {
//   tessel.led[2].toggle();
//   tessel.led[3].toggle();
// }, 100);

// console.log("I'm blinking! (Press CTRL + C to stop)");


var av = require('tessel-av');
var os = require('os');
var http = require('http');
var port = 8000;
var camera = new av.Camera();



http.createServer((req, res) => {

  if(req.url === '/tessel'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`
    <div>
    <script src ="https://rawgit.com/lokesh/color-thief/master/dist/color-thief.min.js">
    </script>
    <img id="image" src="/" alt="">
    <script>
    var colorThief = new ColorThief();
    var arrOfImageColor = [];
    arrOfImageColor = colorThief.getColor(image);
    var counter = 0;

    var savedBottles = function(){
      counter+=1
      console.log('YOU HAVE SAVED '+ counter +' WATER BOTTLES TODAY ! :)')
      // return counter;
    }
    if(arrOfImageColor){
      var r = arrOfImageColor[0];
      var g = arrOfImageColor[1];
      var b = arrOfImageColor[2];

      if(r <= 100 && g >= 140 && b >= 150){
        savedBottles();
      }
    }
    </script>
    </div>
    `);
    res.end()
  }else{
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    camera.capture().pipe(res);

  }

}).listen(port, (err) =>{
  if(err){
    console.log(err)
  }else{
    console.log(`http://${os.hostname()}.local:${port}`);
  }
})
