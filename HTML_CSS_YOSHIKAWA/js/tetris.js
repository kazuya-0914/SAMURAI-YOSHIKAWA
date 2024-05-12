// JavaScript Document

//let x0, x1, s1, s2, t;
let x1, x2, x3, x4, y1, y2, y3, y4, t;
let blockI1 = new Array();
let blockI2 = new Array();
let blockI3 = new Array();
let blockI4 = new Array();
let blockJ1 = new Array();
let blockJ2 = new Array();
let blockJ3 = new Array();
let blockJ4 = new Array();
let blockS1 = new Array();
let blockS2 = new Array();
let blockS3 = new Array();
let blockS4 = new Array();

let blockIA = new Array();
let blockOA = new Array();
let blockTA = new Array();
let blockJA = new Array();
let blockLA = new Array();
let blockSA = new Array();
let blockZA = new Array();

let blockCA = new Array();
let blockCAA = new Array();
let stockA = new Array();
let s = new Array();
let l = 4;
let h = -1;
let n = 0;
let no = 0;
let hh;
let h_flag = false;
let h_flag2 = false;
let interval1;
let interval2;
const block_img = [
        "img/block-0.png",
        "img/block-1.png",
        "img/block-2.png",
        "img/block-3.png",
        "img/block-4.png",
        "img/block-5.png",
        "img/block-6.png"
    ]

const main_canvas = document.getElementById("main_canvas");
const main_ctx = main_canvas.getContext("2d");

main_canvas.width = 320;
main_canvas.height = 640;
main_canvas.style.border = "4px solid #555";

const sub_canvas = document.getElementById("sub_canvas");
const sub_ctx = sub_canvas.getContext("2d");

sub_canvas.width = 160;
sub_canvas.height = 160;
sub_canvas.style.border = "4px solid #555";

h = 8; hh = h + 1; no = 0;
/*-----No.0 (I)-----*/
blockI1 = [[0,0],[-1,0],[1,0],[2,0]];
blockI2 = [[0,0],[0,-1],[0,1],[0,2]];
blockI3 = [[0,0],[-2,0],[-1,0],[1,0]];
blockI4 = [[0,0],[0,-2],[0,-1],[0,1]];
/*-----No.1 (O)-----*/
blockO1 = [[0,0],[1,0],[0,-1],[1,-1]];
/*-----No.2 (T)-----*/
blockT1 = [[0,0],[-1,0],[0,-1],[1,0]];
blockT2 = [[0,0],[0,-1],[1,0],[0,1]];
blockT3 = [[0,0],[1,0],[0,1],[-1,0]];
blockT4 = [[0,0],[0,1],[-1,0],[0,-1]];
/*-----No.3 (J)-----*/
blockJ1 = [[0,0],[-1,-1],[-1,0],[1,0]];
blockJ2 = [[0,0],[1,-1],[0,-1],[0,1]];
blockJ3 = [[0,0],[1,1],[1,0],[-1,0]];
blockJ4 = [[0,0],[-1,1],[0,1],[0,-1]];
/*-----No.4 (L)-----*/
blockL1 = [[0,0],[-1,0],[1,0],[1,-1]];
blockL2 = [[0,0],[0,-1],[0,1],[1,1]];
blockL3 = [[0,0],[1,0],[-1,0],[-1,1]];
blockL4 = [[0,0],[0,1],[0,-1],[-1,-1]];
/*-----No.5 (S)-----*/
blockS1 = [[0,0],[-1,0],[0,-1],[1,-1]];
blockS2 = [[0,0],[0,-1],[1,0],[1,1]];
blockS3 = [[0,0],[1,0],[0,1],[-1,1]];
blockS4 = [[0,0],[0,1],[-1,0],[-1,-1]];
/*-----No.6 (Z)-----*/
blockZ1 = [[0,0],[-1,-1],[0,-1],[1,0]];
blockZ2 = [[0,0],[1,-1],[1,0],[0,1]];
blockZ3 = [[0,0],[1,1],[0,1],[-1,0]];
blockZ4 = [[0,0],[-1,1],[-1,0],[0,-1]];

blockIA = [blockI1, blockI2, blockI3, blockI4];
blockOA = [blockO1, blockO1, blockO1, blockO1];
blockTA = [blockT1, blockT2, blockT3, blockT4];
blockJA = [blockJ1, blockJ2, blockJ3, blockJ4];
blockLA = [blockL1, blockL2, blockL3, blockL4];
blockSA = [blockS1, blockS2, blockS3, blockS4];
blockZA = [blockZ1, blockZ2, blockZ3, blockZ4];

blockCAA = [blockIA, blockOA, blockTA, blockJA, blockLA, blockSA, blockZA];
blockImg(blockCAA[no][n], l, h, no);

$('.start-btn').on('click',function(){
	interval1 = setInterval(down_block, 1000);
});

$('.rotate-btn').on('click',function(){
	n++;
	if(n >= 4){ n = 0;}
	drawBlock();
});

$('.left-btn').on('click',function(){
	if(l >= 2){
		l = l - 1;
		drawBlock();
	}
});
$('.right-btn').on('click',function(){
	if(l <= main_canvas.width / 32 - 3){
		l = l + 1;
		drawBlock();
	}
});
$('.down-btn').on('click',function(){
	down_block();
});

function down_block(){
	if(hh < (main_canvas.height / 32)){
		h++;
		drawBlock();
	}else{
		//clearInterval(interval1);
		stockA.push([no, n, l, h]);
		h = 0; l = 4; hh = h + 1;
		no++;
		if( no === 7){
			no = 0;
		}
		drawBlock();
	}
}

function blockImg(blockCA, l, h, t) {
	let img = new Image();
	img.src = block_img[t];
	img.onload = function(){
		blockCA.forEach(blockC => {
			main_ctx.drawImage(img, (blockC[0] + l) * 32, (blockC[1] + h) * 32, 32, 32);
			if(blockC[1] == 1){ h_flag = true; }
			if(blockC[1] == 2){ h_flag2 = true; }
		});
		hh = h + 1;
		if(h_flag === true){
			hh = h + 2;
			h_flag = false;
		}
		if(h_flag2 === true){
			hh = h + 3;
			h_flag2 = false;
		}
	}
}

function drawBlock(){
	main_ctx.clearRect(0, 0, main_canvas.width,  main_canvas.height);
	stockA.forEach(s => {
		blockImg(blockCAA[s[0]][s[1]], s[2], s[3], s[0]);
	});
	blockImg(blockCAA[no][n], l, h, no);
}
/*
function draw2(){
	if(h <= 4){
		main_ctx.clearRect(0, 0, main_canvas.width, 4 * 32);
		blockImg(1,1,4,4,1);
		console.log(h);
	}else{
		h = 0;
		clearInterval(interval2);
	}
}

blockImg(1,1,4,4,1);
blockImg(0,2,4,3,2);
blockImg(0,2,3,3,3);
blockImg(0,2,5,3,4);
blockImg(1,1,4,3,5);
blockImg(1,1,3,4,6);

function blockImg(x0, x1, s1, s2, t) {
	let img = new Image();
	img.src = block_img[t];
	img.onload = function(){
		for(var i=0; i<=x0; i++){
			a = (i * 32) + (s1 * 32);
			b = h * 32;
			main_ctx.drawImage(img, a, b, 32, 32);
		}
		h++;
		if(x1 !== 0){
			for(var j=0; j<=x1; j++){
				main_ctx.drawImage(img, (j * 32) + s2 * 32, h * 32, 32, 32);
			}
			//h++;
		}
	}
}

const img_next = new Image();
img_next.src = "img/block-0.png";
img_next.onload = function(){
	for(var i=0; i<=3; i++){
		sub_ctx.drawImage(img_next, (i * 32) + (80 - 64), (160 / 2) - (32 / 2), 32, 32);
	}
}

for(let i = 0; i <= 6; i++){
	let img = new Image();
	blockImages = [];
	img.src = block_img[i];
	img.onload = function(){
		blockImages.push(img);
	}
}
*/