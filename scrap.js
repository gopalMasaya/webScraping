var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 4000,res);
const puppeteer = require('puppeteer');

var path = require('path');
var socket = require('socket.io');
var io = socket(server);
var send = false;
var url ='https://www.aliexpress.com/item/32745893414.html?spm=a2g0o.productlist.0.0.552a4bceb025RP&algo_pvid=6d6042a6-aa7d-456f-ad9b-d9c1a17636a9&algo_expid=6d6042a6-aa7d-456f-ad9b-d9c1a17636a9-8&btsid=17732f69-d349-4b08-8057-ed127132bd75&ws_ab_test=searchweb0_0,searchweb201602_1,searchweb201603_53'



app.use(express.static('public'));


function res(){
  var host = server.address().address;
   var port = server.address().port;
  console.log("starting.....")
  console.log(__dirname)
}

io.sockets.on('connection',onConnection);


function onConnection(socket){
  console.log("new connection"+socket.id);
 io.sockets.emit('msg', "connected");
console.log("connected")

  socket.on('msg',message);

 function message(data){
   console.log(data);

  // socket.broadcast.emit('msg',data);
   url = data;
if(send == 'true'){console.log("done")}

(async  () => {

console.log("working")
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url,{waitUntil: 'load', timeout: 0});
//  await page.screenshot({path:'example.png'});

  var shipping = await page.evaluate(() => document.querySelector('div.product-shipping').textContent);
  var shippingCost = await page.evaluate(() => document.querySelector('div.product-shipping-price').textContent);
  var price = await page.evaluate(() => document.querySelector('div.product-price').textContent);
  var cPrice = await page.evaluate(() => document.querySelector('div.product-price-current').textContent);
  var r = await page.evaluate(() => document.querySelector('div.product-reviewer').textContent);
  var rating = await page.evaluate(() => document.querySelector('div.overview-rating').textContent);
  var p_rev = await page.evaluate(() => document.querySelector('span.fdbc-num').innerText);
  var title = await page.evaluate(() => document.querySelector('div.product-title').innerText);



   console.log("shipping: "+ shipping);
   console.log("shipping cost: "+ shippingCost);
   console.log("price: "+ price);
   console.log("current price: "+ cPrice);
   console.log("rev: "+ r);
   console.log("rate: "+ rating);
   console.log("overview: "+ p_rev);
   console.log("title: "+ title);
//   console.log(innerText);
var d ={
  title: title,
  shipping:shippingCost,
  cprice:cPrice,
  r:r,
  rating:rating,
  pr:p_rev,
  price:price
}
//socket.broadcast.emit('msg',"working");
io.sockets.emit('msg', d);

  await browser.close();
})();




}
}


app.get('/', function(req, res) {
  //res.send("done")
  res.sendFile(path.join(__dirname +'/public/index.html'));

});




// const request = require('request');
// const cheerio = require('cheerio');
// const fs = require('fs');
// const url ='https://best.aliexpress.com/?lan=en&spm=2114.best.1000001.12.76b6kP20kP20z8'
//
// var title;
//
// console.log(process.cwd())
//
// request(url, (error, response, html) => {
//   if (!error  && response.statusCode == 200) {
//
//
//     //console.log(a)
//     var $ = cheerio.load(html);
//     //for(let i = 0; i<20;i++){
//     const root = process.cwd();
//     var d = $('.product-price-current')//.eq(i);c
//    console.log("d:  "+ d)//.replace(/\s\s+/g, ''));
//
//   //}
//     const id = $('> div ').each((i,d)=>{
//        title = $(d).find('.product-price-current')
//
//       //console.log(i)
//     });
//     console.log("id: "+id.text())
//
// //console.log(price)
// //});
//
//   }
//
//     console.log('Scraping Done...');
// });
