
var timeoutHW;
var actualObjHW;

function launchHandWriting(id){
	
	var obj = CObjets[id];
	
	actualObjHW = id;
	
	var sid = ".bloc" + id +",.alterbloc" + id;
	$(sid).css({ opacity : 0});
	$(sid).css("margin-top", "0px");
	
	window.clearTimeout(timeoutHW); 
	
	var i = 0;
	
	addHandWritingImg();
	
	var xObj = parseInt(obj.getX() * zoom);
	var yObj = parseInt(obj.getY() * zoom);

	var fontSizeObj = parseInt(obj.fontsize * zoom);
	
	var lgtObj = ($('#innerbloc' + id + " p").length);
	
	if(lgtObj>0){
		processHW($('#innerbloc' + id + " p"),$('#innerbloc' + id + " p").html(),'',xObj,yObj,fontSizeObj,300,id);
	}else{
		processHW($('#innerbloc' + id),$('#innerbloc' + id).html(),'',xObj,yObj,fontSizeObj,300,id);
	}
	
}

function processHW(selfObj,textObj,content,xObj,yObj,fontSizeObj,timeup,id) {
		
	if(textObj.length > 0){
		
		var timeSteps = 70;
		
		var next = textObj.match(/(\s*(<[^>]*>)?)*(&.*?;|.?)/)[0];
		textObj = textObj.substr(next.length);
		$(selfObj).html(content + next + "<span id='cursorhandpencil" + id + "' >&nbsp;</span>");
		
		if(timeup==0){
			var sid = ".bloc" + id +",.alterbloc" + id;
			$(sid).css({ opacity : 1});
		}
		
		$("#handpencil").css("margin-top","-100px");

		var p = $("#cursorhandpencil" + id);
		
		var of1 = p.position();
		var of2 = $(selfObj).position();
		
		var rdm = Math.floor(Math.random() * fontSizeObj)
		
		if(actualObjHW==id){
			$("#handpencil").animate({
				"left" : parseInt(of1.left + xObj) + "px",
				"top"  : parseInt( of1.top + yObj + rdm) + "px"
			},20 + timeup);
		}else{
			timeSteps = 30;
		}
		
		setTimeout(function(){
			processHW(selfObj, textObj , content + next,xObj,yObj,fontSizeObj,0,id);
		},timeSteps + timeup);
					
	}else{
		
		$("#cursorhandpencil" + id).css("display","none");
		
		$("#handpencil").animate({
			"top"  : (yObj + 30) + "px"
		},
		300,
		function(){
					
			if(actualObjHW==id){
				window.clearTimeout(timeoutHW); 
				timeoutHW = window.setTimeout(exitWH,300);
			}
			
		});
		
	}
	
}

function exitWH(){
	
	$("#handpencil").animate({
		"left" : "1500px",
		"top"  : "1500px"
	},500);
	
}

function installHandProcess(obj){
	installHandWriting(obj);
	installHandArrow(obj);
}

function installHandWriting(obj){
	
	if(obj.type=='handcircle'){
		
		var h = '<img ';
		h += ' id="bloc' + obj.id + '" ';
		h += ' class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
		h += ' src="images/hand-circle0.png" ';
		h += ' />';
		
		addToM(h);
		
	}
	
}

function installHandArrow(obj){
	
	if(obj.type=='handarrow'){
		
		var h = '<img ';
		h += ' id="bloc' + obj.id + '" ';
		h += ' class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
		h += ' src="images/hand-arrow-right0.png" ';
		h += ' />';
		
		addToM(h);
		
	}
	if(obj.type=='handarrowbottom'){
		
		var h = '<img ';
		h += ' id="bloc' + obj.id + '" ';
		h += ' class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
		h += ' src="images/hand-arrow-bottom0.png" ';
		h += ' />';
		
		addToM(h);
		
	}
	
}

function launchHandArrowAnim(id,step,nam){
	
	var obj = CObjets[id];
	
	var timeH = 200;
	var xP = 0.1;
	var yP = 0.45;

	var sid = ".bloc" + id +",.alterbloc" + id;
	var imgF = "images/hand-arrow-" + nam + "0.png";
	if(step==0){
		actualObjHW = id;
		xP = 0.1;
		timeH = 500;
		$(sid).css({opacity : 0});
		$(sid).css("margin-top", "0px");
	}
	if(step==1){
		xP = 0.5;
		$(sid).css({opacity : 1});
		imgF = "images/hand-arrow-" + nam + "0.png";
	}
	if(step==2){
		xP = 0.95;
		imgF = "images/hand-arrow-" + nam + "1.png";
	}
	if(step==3){
		xP = 0.6;
		yP = 0.05;
		imgF = "images/hand-arrow-" + nam + "2.png";
	}
	if(step==4){
		xP = 0.95;
		imgF = "images/hand-arrow-" + nam + "2.png";
	}
	if(step==5){
		xP = 0.6;
		yP = 0.95;
		imgF = "images/hand-arrow-" + nam + "3.png";
	}
	if(step==6){
		if(actualObjHW==id){
			setTimeout(function(){
				exitWHdec(id);
			},500);
		}
		return false;
	}

	if(actualObjHW==id){

		if(nam=="bottom"){
			var mx = xP;
			xP = yP;
			yP = mx;
		}

		var xObj = parseInt(obj.getX() + ((obj.getW())*xP)) * zoom;
		var yObj = parseInt(obj.getY() + ((obj.getH())*yP)) * zoom;
		
		addHandWritingImg();
		
		$("#handpencil").css("margin-top", "-100px");

		$("#handpencil").animate({
			"left" : parseInt(xObj) + "px",
			"top"  : parseInt(yObj) + "px"
		},
		timeH,
		function(){
				$(sid).css({opacity:1});
				$(".bloc" + id).attr("src",imgF);
				launchHandArrowAnim(id,step+1,nam);
			}
		);
	}else{
		$(".bloc" + id).attr("src","images/hand-arrow-" + nam + "3.png");
	}
}

function addHandWritingImg(){
	
	if(!document.getElementById("handpencil")){
		var h = "<img id='handpencil' ";
		h = h + "style='position:absolute;left:1500px;top:1500px;width:750px,height:750px;z-index:4;' ";
		h = h + "src='images/hand-cartoon.png' />";
		$('#main').append(h);
	}

}

function launchHandWritingCircle(id){
	
	var obj = CObjets[id];
	
	actualObjHW = id;
	
	var xObj = parseInt(obj.getX() + ((obj.getW()/2)*0.2)) * zoom;
	var yObj = parseInt(obj.getY() + ((obj.getH()/2)*0.9)) * zoom;
	
	addHandWritingImg();
	
	var sid = ".bloc" + id +",.alterbloc" + id;
	$(sid).css({opacity : 0});
	$(sid).css("margin-top", "0px");
	
	$("#handpencil").css("margin-top", "-100px");

	$("#handpencil").animate({
		"left" : parseInt(xObj) + "px",
		"top"  : parseInt(yObj) + "px"
	},300,
		function(){			
			launchHandWritingCircleS2(id);
		}
	);
	
}

function launchHandWritingCircleS2(id){
	
	var obj = CObjets[id];
	
	var xObj = parseInt(obj.getX() + ((obj.getW()/2)*0.85)) * zoom;
	var yObj = parseInt(obj.getY() + ((obj.getH()/2)*0.1)) * zoom;
	
	var sid = ".bloc" + id +",.alterbloc" + id;
	
	if(actualObjHW==id){
		
		$("#handpencil").animate({
			"left" : parseInt(xObj) + "px",
			"top"  : parseInt(yObj) + "px"
		},
		200,
			function(){
				$(sid).css({opacity:1});
				launchHandWritingCircleS3(id);
			}
		);
	
	}else{
		$(".bloc" + id).attr("src","images/hand-circle4.png");
	}
	
}

function launchHandWritingCircleS3(id){
	
	var obj = CObjets[id];
	
	var xObj = parseInt(obj.getX() + ((obj.getW())*0.90)) * zoom;
	var yObj = parseInt(obj.getY() + ((obj.getH()/2)*0.6)) * zoom;

	if(actualObjHW==id){
		
		$("#handpencil").animate({
			"left" : parseInt(xObj) + "px",
			"top"  : parseInt(yObj) + "px"
		},
		200,
			function(){
				$(".bloc" + id).attr("src","images/hand-circle1.png");
				launchHandWritingCircleS4(id);
			}
		);
	
	}else{
		$(".bloc" + id).attr("src","images/hand-circle4.png");
	}
	
}

function launchHandWritingCircleS4(id){
	
	var obj = CObjets[id];
	
	var xObj = parseInt(obj.getX() + ((obj.getW())*0.75)) * zoom;
	var yObj = parseInt(obj.getY() + ((obj.getH())*0.82)) * zoom;

	if(actualObjHW==id){
		
		$("#handpencil").animate({
			"left" : parseInt(xObj) + "px",
			"top"  : parseInt(yObj) + "px"
		},
		200,
			function(){
				$(".bloc" + id).attr("src","images/hand-circle2.png");
				launchHandWritingCircleS5(id);
			}
		);
	
	}else{
		$(".bloc" + id).attr("src","images/hand-circle4.png");
	}
	
}

function launchHandWritingCircleS5(id){
	
	var obj = CObjets[id];
	
	var xObj = parseInt(obj.getX() + ((obj.getW())*0.16)) * zoom;
	var yObj = parseInt(obj.getY() + ((obj.getH())*0.75)) * zoom;

	if(actualObjHW==id){
		
		$("#handpencil").animate({
			"left" : parseInt(xObj) + "px",
			"top"  : parseInt(yObj) + "px"
		},
		200,
			function(){
				$(".bloc" + id).attr("src","images/hand-circle3.png");
				launchHandWritingCircleS6(id);
			}
		);
	
	}else{
		$(".bloc" + id).attr("src","images/hand-circle4.png");
	}
	
}

function launchHandWritingCircleS6(id){
	
	var obj = CObjets[id];
	
	var xObj = parseInt(obj.getX() + ((obj.getW())*0.16)) * zoom;
	var yObj = parseInt(obj.getY() + ((obj.getH())*0.17)) * zoom;

	if(actualObjHW==id){
		
		$("#handpencil").animate({
			"left" : parseInt(xObj) + "px",
			"top"  : parseInt(yObj) + "px"
		},
		200,
			function(){
				
				$(".bloc" + id).attr("src","images/hand-circle4.png");
				
				var cyObj = parseInt((obj.getY() + (obj.getH()/2)) * zoom);
				
				$("#handpencil").animate({
					"top"  : cyObj + "px"
				},
				300,
				function(){
				
					if(actualObjHW==id){
						setTimeout(function(){
							exitWHdec(id);
						},500);
					}
				
				});
				
			}
		);
	
	}else{
		$(".bloc" + id).attr("src","images/hand-circle4.png");
	}
	
}

function exitWHdec(id){

	if(actualObjHW==id){
		window.clearTimeout(timeoutHW); 
		timeoutHW = window.setTimeout(exitWH,300);
	}

}
