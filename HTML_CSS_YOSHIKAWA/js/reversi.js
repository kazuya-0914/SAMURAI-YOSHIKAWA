// JavaScript Document

$(function(){
/********************
 初期化用変数
 ********************/
	let html = "";    // html記述
	const arr = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,2,1,0,0,0],[0,0,0,1,2,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
	const r_top = [0, "●","〇"];    //  コマ番号(黒は1、白は2)

/********************
 判定用変数
 ********************/
 	let b_num;    // 黒のコマの数
	let w_num;    // 白のコマの数

/********************
 ゲーム開始時の変数
 ********************/	
	let no;
	let n;
	let f_top = 1;    //  自分のコマ番号(先手は黒(1))
	let s_top = 2;    //  相手のコマ番号(後手は白(2))
	let cellX;
	let cellY;
	let class_name;
	
/********************
 ゲーム中の変数
 ********************/
	let checkX;
	let checkY;
	let moveX;
	let moveY;
	let m;
	let no2;
	let class_name2;
	let test_ans = 0;
	let check_flag = 0;  //    コマ配置用フラグ
	const r_msg = [0, "● 黒の番です ●","〇 白の番です 〇"];
	const c_check = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];    // 八方向チェック

/********************
 チェック用変数
 ********************/
	let no3;
	let class_name3;
	let mm;
	let checkXX;
	let checkYY;
	let ans;

/********************
 初期化
 ********************/
	$.each(arr, function(index, val){
		for (let x = 0; x < 8; x++){
			html += "<div></div>";
		}
	});
	$('.board').append(html);
	$('.board div:nth-of-type(29), .board div:nth-of-type(36)').html(r_top[1]);
	$('.board div:nth-of-type(28), .board div:nth-of-type(37)').html(r_top[2]);
	
/********************
 パス
 ********************/	
	$('input.pass').on('click', function(){
		[f_top, s_top] = [s_top, f_top];
		$('.text_msg').html(r_msg[f_top]);
	});

/********************
 判定
 ********************/
	$('input.judgement').on('click', function(){
		b_num = 0;
		w_num = 0;
		$.each(arr, function(index, val){
			for (let y = 0; y < 8; y++){
				switch (val[y]) {
					case 1:
						b_num++;
						break;
					case 2:
						w_num++;
						break;
				}
			}
		});
		$('.text_msg').html("<p>黒は【" + b_num + "個】・白は【" + w_num + "個】です</p>");
	});

/********************
 ゲーム中
 ********************/
	$('.board').on('click','div', function(){
		no = $('.board div').index(this);   //  クリックしたdivが何番目か
		class_name = ".board div:nth-of-type(" + (no + 1) + ")"; 
		cellX = no % 8; 
		cellY = Math.floor(no / 8);
		n = arr[cellX][cellY];
		
		/*----- コマが置かれていないセルをクリック -----*/
		if( n === 0) {
			$.each(c_check, function(index, val){
				try {
					/*----- (例)黒番で八方向チェックの際に〇が見つかる -----*/
					if(arr[cellX + val[0]][cellY + val[1]] === s_top){
						// check_cell関数に与える値を設定
						checkX = cellX + val[0];
						checkY = cellY + val[1];
						moveX = val[0];
						moveY = val[1];
						m = arr[checkX + moveX][checkY + moveY];
						no2 = (checkY * 8) +checkX + 1;
						class_name2 = ".board div:nth-of-type(" + no2 + ")";
						
						/*----- コマが置けるかどうかのチェック -----*/
						test_ans = check_cell(checkX, checkY, moveX, moveY, f_top, s_top, m, class_name2);
						if(test_ans === 1){ check_flag = 1; }  //    コマが置けたらフラグを立てる
					}
				}catch(e){
				}
			});
		}
		
		/*----- コマが置ける場合の処理 -----*/
		if(check_flag === 1){
			arr[cellX][cellY] = f_top;    //  配列にコマ番号を入力
			$(class_name).html(r_top[f_top]);    //  コマを配置
			[f_top, s_top] = [s_top, f_top];    //  コマ番号入れ替え
			$('.text_msg').html(r_msg[f_top]);    //  メッセージ入れ替え
			test_ans = 0;
			check_flag = 0;
		}
	});
	
	/*----- コマが置けるかどうかのチェック -----*/
	function check_cell(checkX, checkY, moveX, moveY, f_top, s_top, m, class_name2){

		/*----- (例)黒番で●〇●の並び -----*/
		if(m === f_top){
			arr[checkX][checkY] = f_top;  //    配列にコマ番号を入力
			$(class_name2).html(r_top[f_top]);   //  コマを返す
			return 1;    //  コマが置ける場合は1を返す
			
		/*----- (例)黒番で●〇〇の並び -----*/
		}else if(m === s_top){
			// check_cell関数に与える値を設定
			checkXX = checkX + moveX;
			checkYY = checkY + moveY;
			mm = arr[checkXX + moveX][checkYY + moveY];
			no3 = (checkYY * 8) +checkXX + 1;
			class_name3 = ".board div:nth-of-type(" + no3 + ")";
			
			/*----- (例)黒番で●〇〇●の並びかどうかをチェックする循環関数 -----*/
			ans = check_cell(checkXX, checkYY, moveX, moveY, f_top, s_top, mm, class_name3);
			
			if(ans === 1){
				arr[checkX][checkY] = f_top;  //    配列にコマ番号を入力
				$(class_name2).html(r_top[f_top]);    //  コマを返す
				return 1;    //  コマが置ける場合は1を返す
			}else{
				return 0;    //  コマが置けない場合は0を返す
			}
		}else{
			return 0;    //  コマが置けない場合は0を返す
		}
	}
});