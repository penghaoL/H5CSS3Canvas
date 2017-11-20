window.onload = function(){
	//搜索
	search();
	//轮播
	banner();
	//倒计时
	downTime();
}
function search(){
	//滚动越多透明度越大
	var searchBox = document.querySelector('.jd_search_box');
	var banner = document.querySelector('.jd_banner');
	var height = banner.offsetHeight;
	window.onscroll = function(){
		var top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		// console.log(top);
		var opacity = 0;
		if(top < height){
			opacity = top / height * 0.85;
		}else{
			opacity = 0.85;
		}
		searchBox.style.backgroundColor = 'rgba(201,21,35,'+opacity+')';
	}
}
function banner(){
	var banner = document.querySelector('.jd_banner');
	var width = banner.offsetWidth;
	var ul = document.querySelector('.jd_banner ul');
	var ult = document.querySelector('.jd_banner ul:last-child');
	var points = ult.querySelectorAll('li');
	var index = 1;
	var timer = setInterval(function(){
		index++;
		ul.style.transition = 'all 0.5s';
		ul.style.transform = 'translateX('+(-index*10)+'%)';
	},2000);
	ul.addEventListener('transitionend',function(){
		if(index >=9){
			index = 1;
			ul.style.transition = 'none';
			ul.style.transform = 'translateX('+(-index*10)+'%)';
		}else if(index < 0){
			index = 8;
			ul.style.transition = 'none';
			ul.style.transform = 'translateX('+(-index*10)+'%)';
		}
		setPoint();
	});
	function setPoint(){
	for(var i=0;i<8;i++){
		 var obj = points[i];
         obj.classList.remove('now');
	}
	points[index - 1].classList.add('now');
    }
    // 设置触摸事件
    var startX = 0;
    var distanceX = 0;
    ul.addEventListener('touchstart',function(e){
    	e = e || event;
    	startX = e.touches[0].clientX;
    	clearInterval(timer);
    });
    ul.addEventListener('touchmove',function(e){
    	e = e || event;
    	var moveX = e.touches[0].clientX;
    	distanceX = moveX - startX;
    	ul.style.transition = 'none';
    	// console.log(width);
    	// console.log(index);
    	// console.log(distanceX);
    	var translateX = -index * width  + distanceX;
    	ul.style.transform = 'translateX('+translateX+'px)';
    });
    ul.addEventListener('touchend',function(e){
    	e = e || event;
    	// console.log(distanceX);
    	if(Math.abs(distanceX) < width/3){
    		ul.style.transition = 'all 0.5s';
    		ul.style.transform = 'translateX('+-index * width+'px)';
    	}else{
    		if(distanceX > 0){
    			index--;
    		}else{
    			index++;
    		}
			// index++;
			ul.style.transition = 'all 0.5s';
    		ul.style.transform = 'translateX('+-index * width+'px)';    		
    	}
    	timer = setInterval(function(){
    	    // console.log(distanceX);
    		if(distanceX > 0){
    			index--;
    		}else{
    			index++;
    		}
    	// 	index++;
    		ul.style.transition = 'all 0.5s';
    		ul.style.transform = 'translateX('+-index*width+'px)';
    	},2000);
    	startX = 0;
    	distanceX = 0;
    });
}
function downTime(){
	var time = 3 * 60 * 60;
	var spans = document.querySelectorAll('.jd_pro_sk .title ul li');
	var timer = setInterval(function(){
		time--;
		var h = Math.floor(time/3600);	
		var m = Math.floor(time%3600/60);	
		var s = Math.floor(time%60);	
		spans[0].innerHTML 	= Math.floor(h / 10);
		spans[1].innerHTML 	= h % 10;
		spans[3].innerHTML 	= Math.floor(m / 10);
		spans[4].innerHTML 	= m % 10;
		spans[6].innerHTML 	= Math.floor(s / 10);
		spans[7].innerHTML 	= s % 10;
	},1000);
}