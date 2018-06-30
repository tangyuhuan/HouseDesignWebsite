var width=document.documentElement.clientWidth;
var styleStr='html{font-size:'+width/10+'px;}';
var style=document.createElement('style');
style.innerHTML=styleStr;
document.head.appendChild(style);

var $imgCt = $('.img-ct')
var $imgs = $('.carousel .img-ct>li')
var $imgw = $('.carousel .img-ct>li img')
var $bullets = $('.carousel .bullet li')

var pageIndex = 0
var isAnimate = false

var imgCount = $imgs.length
var imgWidth = $imgs.width()


$imgw.width(document.documentElement.clientWidth)
$imgCt.append($imgs.first().clone())
$imgCt.prepend($imgs.last().clone())
$imgCt.width((imgCount+2) * imgWidth)
$imgCt.css({left: -imgWidth})


$bullets.click(function(){
	var index = $(this).index()
	if(index > pageIndex){
		playNext(index - pageIndex)
	}else if(index < pageIndex){
		playPre(pageIndex - index)
	}

})
setInterval(function(){
	playNext(1)
},2000)
function playNext(len){
	if(isAnimate) return;
	isAnimate = true
	$imgCt.animate({
		left: '-='+len*imgWidth
	},function(){
		pageIndex += len
		if(pageIndex === imgCount){
			pageIndex = 0
			$imgCt.css({left: -imgWidth})
		}
		setBullet()
		isAnimate = false
	})
}
function playPre(len){
	if(isAnimate) return;
	isAnimate = true
	$imgCt.animate({
		left: '+='+len*imgWidth
	},function(){
		pageIndex -= len
		if(pageIndex < 0){
			pageIndex = imgCount - 1
			$imgCt.css({left: -imgCount*imgWidth})
		}
		setBullet()
		isAnimate = false
	})
}
function setBullet(){
	$bullets.removeClass('active')
			.eq(pageIndex)
			.addClass('active')
}