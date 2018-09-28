/*
* @Author: Administrator
* @Date:   2018-05-15 19:32:15
* @Last Modified by:   Administrator
* @Last Modified time: 2018-09-13 19:56:38
*/
window.onload=function(){
	//轮播
	let oImg=document.querySelectorAll(".banner>ul a");
	let dots=document.querySelectorAll(".l_btn>ul>li");
	let banner=document.querySelector(".banner_center");
	let next=document.querySelector(".banner_center .next");
	let prev=document.querySelector(".banner_center .prev");
	console.log(oImg);
	console.log(dots);
	console.log(banner);
	Banner_op(oImg,dots,banner,prev,next,"active");

	//楼层跳转
	let pros=document.querySelectorAll(".pro");
	let buyTop=document.querySelector(".orderBuy");
	let likeTop=document.querySelector(".like");
	let floor=document.querySelector(".floor");
	let floor_li=document.querySelectorAll(".floor>ul>li");
	let backTop=document.querySelector(".backTop");
	let arr=[];
	pros.forEach((val,index)=>{
		val.querySelectorAll("img").forEach((val2,index2)=>{
			val2.setAttribute("src","img/blankbg.gif");
		});
	});
	backTop.onclick=function(){
		animate(document.body,{scrollTop:0});
		animate(document.documentElement,{scrollTop:0});
	}
	pros.forEach((val,index)=>{
		arr.push(val.offsetTop);
	});
	arr.push(buyTop.offsetTop);
	arr.push(likeTop.offsetTop);
	window.onscroll=function(){
		let bodyTop=document.body.scrollTop||document.documentElement.scrollTop;
		if(bodyTop+window.innerHeight/2>arr[0]){
			floor.style.left="5px";
		}
		if(bodyTop+window.innerHeight/2<arr[0]){
			floor.style.left="-68px";
		}
		arr.forEach((val,index)=>{
			if(bodyTop+window.innerHeight/2>=val){
				if(index<8){
                    let imgs=pros[index].querySelectorAll("img");
                    imgs.forEach((val2,index2)=>{
                        let nsrc=val2.getAttribute("nsrc");
                        val2.setAttribute("src",nsrc);

                    });
				}

				for(let i=1;i<floor_li.length-1;i++){
					floor_li[i].classList.remove("active");
				}
				floor_li[index+1].classList.add("active");
			}
			// if(bodyTop<val){
			// 	floor_li[index].classList.remove("active");
			// }
		});
		for(let i=1;i<floor_li.length-1;i++){
			floor_li[i].onclick=function(){
				for(let j=1;j<floor_li.length-1;j++){
					floor_li[j].classList.remove("active");
				}
				floor_li[i].classList.add("active");
				animate(document.body,{scrollTop:arr[i-1]});
				animate(document.documentElement,{scrollTop:arr[i-1]});
			}
		}
	}
	//点击关闭下拉框
	let close=document.querySelector(".close");
	let lidown=document.querySelectorAll(".lidown");
	let li_down=document.querySelectorAll(".h_center>ul>li");
	for(let i=0;i<li_down.length-1;i++){
		li_down[i].onmouseover=function(){
            lidown[0].classList.remove("close");
            lidown[i].classList.add("li-down-active"+i);
        }
        li_down[i].onmouseout=function(){
            lidown[i].classList.remove("li-down-active"+i);
        }

	}

    close.onclick=function(){
        // alert(1);
        lidown[0].classList.add("close");
    }
	console.log(floor_li);
}