// JavaScript Document

// $(function(){
	
	//let canvas = $('#canvas');
	//let ctx = canvas[0].getContext("2d");
/********************
 初期設定変数
 ********************/
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	let interval;
	let speed_sel;
	let stop_flag = false;
	
/********************
 ボールの変数
 ********************/
	let x = canvas.width / 2;
	let y = 540;
	let angleX = 1;   // ボールの角度のx比率
	let angleY = -1;    // ボールの角度のy比率
	let ballS;    // ボールのスピード
	let dx = 2;    // ボールのx軸の移動量
	let dy = -2;    // ボールのy軸の移動量
	let ballR = 10;    // ボールの半径

/********************
 バーの変数
 ********************/	
	let barW = 100;   // バーの大きさ
	let barH = 20;   // バーの高さ
	let barX = (canvas.width - barW) / 2;
	let barY = 550;
	let right_flag = false;
	let left_flag = false;
	let relativeX;

/********************
 ブロックの変数
 ********************/	
	let blockA = [];
	let blockR = 3;
	let blockC = 5;
	let blockW = 100;
	let blockH = 30;
	
	for(let i = 0; i < blockR * blockC; i++){
		let row = Math.floor( i / blockC );
		let column = i - (blockC * row); 
		blockA.push( {
		x : 30 + 10 * column + blockW * column,
		y : 30 + 10 * row + blockH * row
		});
	}

/********************
 ボタン操作
 ********************/	
	$('.start').on("click", function(){
		speed_change();
		$('.text_msg').html("ゲームスタートです");
		$(this).css('display','none');
		$('.stop').css('display','block');
		
		interval = setInterval(draw, 10);
	});
	
	$('.stop').on("click", function(e){
		if(stop_flag === false){
			//$('.speed_select').css('display','block');
			$(this).attr('value', '再開');
			$('.text_msg').html("一時停止中です");
			clearInterval(interval);
			stop_flag = true;
		}else{
			//speed_change();
			$(this).attr('value', 'ポーズ');
			$('.text_msg').html("ゲームスタートです");
			interval = setInterval(draw, 10);
			stop_flag = false;
		}
	});
	
	function speed_change(){
		speed_sel = $('.speed').val();
		switch (speed_sel) {
			case "fast": 
				ballS = 3;
				break;
			case "slow": 
				ballS = 1;
				break;
			default:
				ballS = 2;
		}
		dx = angleX * ballS;
		dy = angleY * ballS;
		$('.speed_select').css('display','none');
	}
/********************
 ブロックの設定
 ********************/		
	function drawBlock(){
		blockA = blockA.filter( (block, index) => {
			if (x > block.x && x < block.x + blockW && y > block.y && y < block.y + blockH) {
				dy = -dy;
			}else{
				return block;
			}
		});
		
		if(blockA.length === 0){
			$('.text_msg').html("ゲームクリアです");
			clearInterval(interval);
			return;
		}
		blockA.forEach((block) => {
			ctx.beginPath();
			ctx.rect(block.x, block.y, blockW, blockH);
			ctx.fillStyle = "yellow";
			ctx.fill();
			ctx.closePath();
		});
	}

/********************
 バーの設定
 ********************/		
	function drawBar(){
		if (right_flag && barX < canvas.width -barW) {
			barX += 5;
		} else if (left_flag && barX > 0) {
			barX -= 5;
		}
		ctx.beginPath();
		ctx.rect(barX, barY, barW, barH);
		ctx.fillStyle = "blue";
		ctx.fill();
		ctx.closePath();
	}
	
	function keyDown(e) {
		if (e.key == "Right" || e.key == "ArrowRight") {
			right_flag = true;
		} else if (e.key == "Left" || e.key == "ArrowLeft") {
			left_flag = true;
		}
	}

	function keyUp(e) {
		if (e.key == "Right" || e.key == "ArrowRight") {
			right_flag = false;
		} else if (e.key == "Left" || e.key == "ArrowLeft") {
			left_flag = false;
		}
	}
	
	function mouseMoveHandler(e) {
		relativeX = e.clientX - canvas.offsetLeft;
		if(relativeX > (barW / 2) && relativeX < canvas.width - (barW / 2)) {
			barX = relativeX - barW / 2;
		}
	}

/********************
 ボールの設定
 ********************/	
	function drawBall(){
		ctx.beginPath();
		ctx.arc(x, y, ballR, 0, 2 * Math.PI);
		//ctx.arc(300, 300, 10, 0, 2 * Math.PI);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();
		
		x += dx;
		y += dy;
		if(x + dx > canvas.width - ballR || x + dx < ballR) {
			dx = -dx;
		}
		// ボールが天井に当たった時
		if(y + dy < ballR) {
			dy = -dy;
		// ボールがバーに当たった時
		}else if(x > barX && x < barX + barW && y + ballR >= barY && y + ballR <= barY + 3) {
			
			/****************************************
			<ボールの反射角度の変更>
			(1) ボールのx座標 - barのx座標
			(2) barの中心座標を基準として角度変更
			(3) 値をbarの大きさの4分の1の数字で割る
			(4) 小数点2位以下の数字は切り捨て
			****************************************/
			angleX = Math.floor((x - barX -50) / 5) / 5; 
			
			dx = angleX * ballS;
			dy = (Math.abs(angleX) - 2) * ballS;
			//dy = -dy;
		// ボールが地面に落ちた時
		}else if(y + dy > canvas.height - ballR){
			$('.text_msg').html("ゲームオーバーです");
			clearInterval(interval);
		}
	}

/********************
 描写設定
 ********************/	
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBar();
		drawBlock();
		drawBall();
	}
	
	drawBar();
	drawBlock();
	drawBall();
	document.addEventListener("keydown", keyDown);
	document.addEventListener("keyup", keyUp);
	document.addEventListener("mousemove", mouseMoveHandler, false);

	/*
	let move_flag = false;
	let clickX, clickY;
	let pos;
	
	$('#racket').on("mousedown", function(e){
		if(move_flag) return;
		move_flag = true;
		clickX = e.screenX;
		//clickY = e.screenY;
		pos = $("#racket").position();
	});

	$("#canvas").on("mousemove", function(e) {
		if (move_flag === false) return;
		$("#racket").css('left', (pos.left + e.screenX - clickX) + "px");
		//$("#racket").css('top' , (pos.top+ e.screenY - clickY) + "px");
	});

	$("#racket").on("mouseup", function(e) {
		if (move_flag === false) return;
		move_flag = false;
	});
	*/
//});