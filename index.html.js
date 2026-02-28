<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kartu Ulang Tahun AI</title>

<style>
body{
margin:0;
font-family:Arial, sans-serif;
background:linear-gradient(135deg,#ff758c,#ff7eb3);
display:flex;
justify-content:center;
align-items:center;
height:100vh;
overflow:hidden;
}

.card{
width:350px;
height:220px;
background:white;
border-radius:20px;
box-shadow:0 20px 40px rgba(0,0,0,0.3);
display:flex;
justify-content:center;
align-items:center;
cursor:pointer;
position:relative;
animation:floating 3s ease-in-out infinite;
transition:0.5s;
}

@keyframes floating{
0%{transform:translateY(0)}
50%{transform:translateY(-15px)}
100%{transform:translateY(0)}
}

.content{
position:absolute;
width:90%;
top:10px;
left:5%;
display:none;
flex-direction:column;
align-items:center;
text-align:center;
background:white;
border-radius:15px;
padding:15px;
}

.content img{
width:100px;
height:100px;
border-radius:50%;
object-fit:cover;
margin-bottom:10px;
}

textarea,input{
width:90%;
margin:5px;
padding:8px;
border-radius:8px;
border:1px solid #ccc;
}

button{
margin-top:5px;
padding:8px 12px;
border:none;
border-radius:8px;
background:#ff4e50;
color:white;
cursor:pointer;
}

canvas{
position:absolute;
top:0;
left:0;
pointer-events:none;
}
</style>
</head>

<body>

<canvas id="confetti"></canvas>

<div class="card" onclick="openCard()">
<h2>Klik Untuk Buka 🎉</h2>

<div class="content" id="content">
<img id="photo" src="https://i.imgur.com/4AiXzf8.jpeg">

<textarea id="textUcapan" placeholder="Tulis ucapan di sini..."></textarea>
<input type="text" id="namaPengirim" placeholder="Nama pengirim">
<input type="file" id="musicUpload" accept="audio/*">
<input type="file" id="photoUpload" accept="image/*">

<button onclick="playAI()">Putar Suara AI 🤖</button>
<button onclick="updateCard()">Tampilkan Ucapan</button>

<p id="hasilUcapan"></p>
<p id="hasilNama"></p>
</div>
</div>

<audio id="bgMusic" loop></audio>

<script>
// buka kartu
function openCard(){
let c=document.getElementById("content");
c.style.display="flex";
startConfetti();
}

// update isi
function updateCard(){
let text=document.getElementById("textUcapan").value;
let nama=document.getElementById("namaPengirim").value;
document.getElementById("hasilUcapan").innerText=text;
document.getElementById("hasilNama").innerText="Dari: "+nama;
}

// text to speech AI (browser voice)
function playAI(){
let text=document.getElementById("textUcapan").value;
let speech=new SpeechSynthesisUtterance(text);
speech.lang="id-ID";
speech.rate=1;
speech.pitch=1;
window.speechSynthesis.speak(speech);
}

// upload musik
document.getElementById("musicUpload").addEventListener("change",function(e){
let file=e.target.files[0];
let audio=document.getElementById("bgMusic");
audio.src=URL.createObjectURL(file);
audio.play();
});

// upload foto
document.getElementById("photoUpload").addEventListener("change",function(e){
let file=e.target.files[0];
let img=document.getElementById("photo");
img.src=URL.createObjectURL(file);
});

// confetti sederhana
let canvas=document.getElementById("confetti");
let ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let pieces=[];
for(let i=0;i<100;i++){
pieces.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*6+2,
d:Math.random()*100
});
}

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="white";
ctx.beginPath();
for(let i=0;i<pieces.length;i++){
let p=pieces[i];
ctx.moveTo(p.x,p.y);
ctx.arc(p.x,p.y,p.r,0,Math.PI*2,true);
}
ctx.fill();
update();
}

function update(){
for(let i=0;i<pieces.length;i++){
let p=pieces[i];
p.y+=Math.cos(p.d)+1+ p.r/2;
if(p.y>canvas.height){
p.y=0;
p.x=Math.random()*canvas.width;
}
}
}

function startConfetti(){
setInterval(draw,20);
}
</script>

</body>
</html>
