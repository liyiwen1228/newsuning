/*
* @Author: Administrator
* @Date:   2018-09-11 14:54:48
* @Last Modified by:   Administrator
* @Last Modified time: 2018-09-13 19:14:19
*/
//
/**
 * 透明度轮播
 * 参数1 要轮播的图片
 * 参数2 轮播点
 * 参数3 判断是否终止时间函数的范围
 * 参数4 上一个的按钮
 * 参数5 下一个的按钮
 */
function Banner_op(oImg,oDot,oBanner,ban_prev,ban_next,className){
//设置自动轮播的计数器
	let num=0;
	let timer;
	showTimer();
	//设置自动轮播的定时器
	
	//默认第一张图片显示
	// oImg[0].style.zIndex=2;
	oImg[0].style.opacity=1;
	//默认第一个轮播点为选中状态
	oDot[0].classList.add(className);
	//循环操作
	for(let i=0;i<oImg.length;i++){
		//点击当前轮播点的时候对应的图片
		oDot[i].onclick=function(){
			//循环 出当前元素的其他元素初始化
			init();
			//显示当前元素的状态
			// oImg[i].style.zIndex=2;
			oImg[i].style.opacity=1;
			oDot[i].classList.add(className);
			//控制 当 点击轮播点之后,自动轮播之后的图片
			num=i;
		}
	}
	// console.log(oImg,oDot);
	
	oBanner.onmouseover=function(){
		clearInterval(timer);
	}
	oBanner.onmouseout=function(){
		showTimer();
	}
	//next按钮点击时
	ban_next.onclick=function(){
		move();
	}
	//prev按钮点击时
	ban_prev.onclick=function(){
		move_prev();
	}

	//失去焦点 停止时间函数
	window.onblur=function(){
		clearInterval(timer);
	}
	//获取焦点 运行时间函数
	window.onfocus=function(){
		showTimer();
	}
	//自动轮播
	function move(){
		num++;
		if(num==oImg.length){
			num=0;
		}
		//调用函数
		init();
		// oImg[num].style.zIndex=2;
		oImg[num].style.opacity=1;
		oDot[num].classList.add(className);
	}
	function move_prev(){
		num--;
		if(num<0){
			num=oImg.length-1;
		}
		//调用函数
		init();
		// oImg[num].style.zIndex=2;
		oImg[num].style.opacity=1;
		oDot[num].classList.add(className);
	}
	//初始函数
	function init(){
		for(let j=0;j<oImg.length;j++){
			// oImg[j].style.zIndex=1;
			oImg[j].style.opacity=0;
			oDot[j].classList.remove(className);
		}
	}
	//自动轮播函数
	function showTimer(){
		timer=setInterval(move,1500);
	}
}

//倒计时函数
function Down_time(hour_span,down_time){
	let d=new Date();
	let hour=d.getHours();
	let minute=d.getMinutes();
	let time=0;
	// let time=hour+":"+minute;
	setInterval(function(){
		let d=new Date();
		let hour=d.getHours();
		// let minute=d.getMinutes();
		switch(hour){
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 22:
			case 23:
				time="00"+":"+"00";
				break;
			case 8:
			case 9:
				time=10+":"+"00";
				break;
			case 10:
			case 11:
				time=12+":"+"00";
				break;
			case 12:
			case 13:
				time=14+":"+"00";
				break;
			case 14:
			case 15:
				time=16+":"+"00";
				break;
			case 16:
			case 17:
				time=18+":"+"00";
				break;
			case 18:
			case 19:
				time=20+":"+"00";
				break;
			case 20:
			case 21:
				time=22+":"+"00";
				break;

		}
		hour_span.innerHTML=time;
		time=parseInt(time.substr(0,2))||24;
		let target_time=parseInt(time)*60*60;
		let now_time=d.getHours()*60*60+d.getMinutes()*60+d.getSeconds();
		let offset=target_time-now_time;
		// console.log(d.getHours());
		let down_hour=Math.floor(offset/60/60%24).toString().padStart(2,"0");
		let down_minute=Math.floor(offset/60%60).toString().padStart(2,"0");
		let down_sec=(offset%60).toString().padStart(2,"0");
		down_time[0].innerHTML=down_hour;
		down_time[1].innerHTML=down_minute;
		down_time[2].innerHTML=down_sec;
	},1000);
}

function Banner_l_r(con_prev,con_next,item_list,btns,btns_span){
	let key=0;
	

	con_next.onclick=function(ev){
		
		

		key++;
		if(key==btns.length){
			key=btns.length-1;
		}
		
		console.log(key);
		item_list.style.transform="translateX("+key*(-296)+"px)";
		for(let j=0;j<btns.length;j++){
				btns_span[j].classList.remove("span_active");
		}
		btns_span[key].classList.add("span_active");
	}
	con_prev.onclick=function(ev){
		key--;
		if(key<0){
			key=0;
		}
		console.log(key);
		item_list.style.transform="translateX("+key*(-296)+"px)";
		for(let j=0;j<btns.length;j++){
				btns_span[j].classList.remove("span_active");
		}
		btns_span[key].classList.add("span_active");
	}

	for(let i=0;i<btns.length;i++){
		btns[i].onclick=function(){
			item_list.style.transform="translateX("+i*(-296)+"px)";
			for(let j=0;j<btns.length;j++){
				btns_span[j].classList.remove("span_active");
			}
			btns_span[i].classList.add("span_active");
			key=i;
		}
	}
}

function banner_lr(oImg,banner,widths,dots,prev,next1){
	//防止左右箭头多次点击
		let flag=true;
		// console.log(dots);
		let timer;
		//代表banner显示的图片
		let now=0;
		//下一张
		let next=0;
		oImg[0].style.left=0;
		dots[0].classList.add("active");
		timer=setInterval(move, 1500);
		for(let i=0;i<dots.length;i++){
			dots[i].onclick=function(){
				for(let j=0;j<oImg.length;j++){
					dots[j].classList.remove("active");
					oImg[j].style.left=widths+"px";
				}
				oImg[i].style.left=0;
				dots[i].classList.add("active");
				next=i;
				now=i;
			}
			
		}
		next1.onclick=function(){
			if(!flag){
				return;
			}
			move();
			//当点过一次 flag为false,return终止函数,直到执行完再点击
			flag=false;
		}

		prev.onclick=function(){
			if(!flag){
				return;
			}
			movel();
			flag=false;
		}
		banner.onmouseover=function(){
			clearInterval(timer);
		}
		banner.onmouseout=function(){
			timer=setInterval(move,1500);
		}
		function move(){
			next++;
			if(next==oImg.length){
				next=0;
			}
			oImg[next].style.left=widths+"px";
			animate(oImg[next],{left:0},function(){});
			animate(oImg[now],{left:-widths},function(){
				for(let i=0;i<oImg.length;i++){
					dots[i].classList.remove("active");
				}
				dots[next].classList.add("active");
				flag=true;
			});
			now=next;
		}
		function movel(){
			next--;
			if(next<0){
				next=oImg.length-1;
			}
			oImg[next].style.left=-widths+"px";
			animate(oImg[next],{left:0},function(){});
			animate(oImg[now],{left:widths},function(){
				for(let i=0;i<oImg.length;i++){
					dots[i].classList.remove("active");
				}
				dots[next].classList.add("active");
				flag=true;//执行完毕,可以点击
			});
			now=next;
		}
}
function show(){
	alert(1);
}
function banner_on(f_box,flash,m_next,m_prev,f_width,len){
	let f_num=0;

	m_next.onclick=function(){
		m_prev.style.color="#999";
		f_num++;
		if(f_num==len-1){
				m_next.style.color="#e0e0e2";
		}
		if(f_num==len){

			
			f_num=len-1;
		}
		flash.style.transform="translateX("+(-f_width*f_num)+"px)";
		
	}
	m_prev.onclick=function(){
		m_next.style.color="#999";
		if(f_num==1){
				m_prev.style.color="#e0e0e2";
		}
		f_num--;
		if(f_num==-1){
			f_num=0;
		}
		flash.style.transform="translateX("+(-f_width*f_num)+"px)";
	}
}