var socket;
var price="";
var prevewis="";
var rev="";
var rating="";
var shipping="";
var title ="";
var url;
var send;
var bg;
var site;
var tails =  [];
var orders;

function preload(){
	bg= loadImage('assets/bg2.jpg')
}


function setup() {
	createCanvas(windowWidth, windowHeight+200);
	console.log("waiting")
	socket = io();
	//socket = io.connect('http://localhost:4000/')

	 socket.on('msg',message);

	 function message(data){
		 if(data.shipping != undefined){
		 price = data.price;
		 prevewis= data.pr;
		 rev= data.r
		 rating = data.rating
     title = data.title
		 	console.log(data)
orders = rev.substring(13,rev.length-1)
rev = rev.substring(0,6)

let nl = title.length/30;
nl = int(nl);
console.log(nl)
for(let i = 1;i< nl;i++){
tails[i-1]=title.substring((i-1)*30,i*30)
			console.log(tails[0])
			console.log(tails[1])
}
	//	yourString.replace(/(.{1,80})/g, '$1<br/>')
	}

site = createSelect('')
site.option('aliexpress')
site.option('alibaba')
site.option('amazon')
site.style('position','absoulte')
site.style('left','32%')
site.style('top','30%')
site.style('width','15%')
site.style('height','7%')
site.style('background-color','rgba(5,5,5,0.8)')
site.style('color','orange')
site.style('font-size','1.2em')




	url = createInput('url')
	url.style('position','absoulte')
	url.style('left','5%')
	url.style('top','30%')
	url.style('width','25%')
	url.style('height','7%')
	url.style('background-color','rgba(5,5,5,0.8)')
	url.style('color','orange')
	url.style('font-size','1.2em')

	let s = createButton('send')
	s.style('position','absoulte')
	s.style('left','5%')
	s.style('top','40%')
	s.style('width','42.5%')
	s.style('height','8%')
	s.style('font-size','1.3em')
	s.style('background-color','rgba(0,0,50,0.8)')
	s.style('color','orange')
	s.style('border-radius','5px')
	s.mouseOver(change)
	s.mouseOut(base)
	s.mouseClicked(send)

	function change(){
s.style('-webkit-transition','0.6s')
s.style('color','white')
//s.style('box-shadow','2px 2px 2px 2px #888888')
s.style('font-size','1.4em')

}

function base(){
s.style('transition','0.6s')
s.style('color','orange')
s.style('font-size','1.3em')

}

function send(){
let data = url.value()
console.log(url.value())
	socket.emit('msg',data);
}
}
var header = createDiv('webScraper')
header.style('position','absoulte')
header.style('left','0%')
header.style('top','0%')
header.style('width','100%')
header.style('height','25%')
header.style('background-color','rgba(250,0,0,0.5)')
header.style('color','orange')
header.style('font-size','3.5em')
header.style('text-align','center')
header.style('line-height','140px')
}

function draw() {
background(55);
image(bg,0,160,width,height-160)
fill(0,0,50,170)
rect(width*0.05,height*0.4,width*0.42,height*0.6)
fill(55,165,250);textSize(20)
if(tails.length> 1){
for(let i = 0; i< tails.length;i++){
text(tails[i],width*0.06,height*0.46+(i*35))
}
}
fill(255,165,0);
text("price:  "+price,width*0.06,height*0.62)
text("prevewis:  "+prevewis,width*0.06,height*0.67)
text("reveiws:  "+rev,width*0.06,height*0.72)
text("rating:  "+rating,width*0.06,height*0.77)
text("orders:  "+orders,width*0.06,height*0.82)

}
