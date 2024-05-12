// JavaScript Document

$(function(){
/********************
 初期化用変数
 ********************/
 	let n = 1;   //セルに割り振るパネル番号
	let class_name;   // パネルのクラス
	let top_num;   //パネルの位置
	let left_num;
	const cell = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];    // 配列初期化

/********************
 シャッフル用変数
 ********************/
	let m;  // シャッフル対象のパネル番号
	let timer;    // シャッフルの間隔時間
	let p = 0;   // 現在のシャッフル回数
	let snum = 30;   // シャッフル回数
	let fcellX = 3;  // シャッフル前の空白セルの座標
	let fcellY = 3;
	let acellX;   // シャッフル後の空白セルの座標
	let acellY;
	let check_m = 0;  // 元のセルに移動しないようにチェック
	const interval = 300;   // パネルの移動時間
	const arr = [0,1,2,3];    // c_checkを呼び出す変数
	const c_check = [[-1,0],[1,0],[0,-1],[0,1]];    // 上下左右のパネルチェック

/********************
 ゲーム用変数
 ********************/
	let mm;    // クリックしたパネルの番号
	let pos;   // クリックしたパネルの位置
	let cellX;    // クリックしたパネルのX座標
	let cellY;    // クリックしたパネルのY座標

/********************
 初期化
 ********************/
	for(let i=0; i<=3; i++){
		for(let j=0; j<=3; j++){
			if(n === 16){ break; }
			class_name = ".main div:nth-of-type(" + n + ")";
			top_num = 100 * i + "px";
			left_num = 100 * j + "px";
			$(class_name).css({'top':top_num, 'left':left_num});
			cell[j][i] = n;
			n++;
		}
	}
	$('.text_msg').html("シャッフルボタンを押してください (" + snum + "回)");

/********************
 シャッフル
 ********************/
	/*----- タイマー -----*/
	function startTimer(){ timer = setInterval(shuffle_cell, 500); }
	function stopTimer(){ clearInterval(timer); }
	
	$('.shuffle').on('click', function(){
		startTimer();
	});
	$('.shuffle_stop').on('click', function(){
		stopTimer();
	});
	
	/*----- シャッフル開始 -----*/
	function shuffle_cell(){
		p += 1;
		$('.text_msg').html(p + " / " + snum);
		if( p >= snum ){  // シャッフル回数設定
			stopTimer();
			$('.text_msg').html("ゲームスタートです");
			$('span.cover, input.shuffle, input.shuffle_stop').css('display','none');
		}
		
		/*----- 重複なし乱数 -----*/
		var arr = [];
   		var min = 0, max = 3;
		
		for(i = min; i <= max; i++){
			while(true){
				var tmp = intRandom(min, max);
				if(!arr.includes(tmp)){
					arr.push(tmp);
					break;
				}
			}
		}
		
		function intRandom(min, max){
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		
		/*----- シャッフル起動中 -----*/
		$.each(arr, function(index, val){
			try {
				acellX = fcellX + c_check[val][0];
				acellY = fcellY + c_check[val][1];
				m = cell[acellX][acellY];
				if(m !== undefined && m !== check_m){
					class_name = ".main div:nth-of-type(" + m + ")";
					$(class_name).animate({ left: (fcellX * 100), top: (fcellY * 100) }, interval, "swing");
					cell[acellX][acellY] = 0;
					cell[fcellX][fcellY] = m;
					fcellX = acellX;
					fcellY = acellY;
					check_m = m;
					return false;
				}
			}catch(e){
			}
		});
	}

/********************
 ゲーム中
 ********************/
	$('.main').on('click','div', function(){
		mm = $('.main div').index(this) + 1;
		class_name = ".main div:nth-of-type(" + mm + ")";
		pos = $(class_name).position();
		cellX = pos.left / 100;
		cellY = pos.top / 100;
		
		$.each(c_check, function(index, val){
			try {
				if(cell[cellX + val[0]][cellY + val[1]] === 0){
					$(class_name).animate({ left: ((cellX + val[0]) * 100), top: ((cellY + val[1]) * 100) }, interval, "swing");
					cell[cellX][cellY] = 0;
					cell[cellX + val[0]][cellY + val[1]] = mm;
					//console.log(cellX+ "-" + cellY + " : " + (cellX + val[0]) + "-" + (cellY + val[1]));
				}
			}catch(e){
			}
		});
	});
});