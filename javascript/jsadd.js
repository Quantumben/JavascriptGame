//

//Plugin LudiScore vendredi 13 novembre 2015
var MyScoreDisplay=0;
//A l'initialisation
function ludiscoreOnPaint(obj){
var hcode='';
hcode=hcode + '<div style="position:absolute;" ';
hcode=hcode + ' id="bloc' + obj.id + '" ';
hcode=hcode + ' class="LudiScore' + obj.id + "t" + lastPage0 + ' bloc' + obj.id + '"  >';
hcode=hcode + '<img style="position:relative;" class="Ludi1S' + obj.id + '" src="data/lu0.png" />';
hcode=hcode + '<img style="position:relative;" class="sco Ludi2S' + obj.id + '" src="data/lu0.png" />';
hcode=hcode + '<img style="position:relative;" class="sco Ludi3S' + obj.id + '" src="data/lu0.png" />';
hcode=hcode + '<img style="position:relative;" class="sco Ludi4S' + obj.id + '" src="data/lu0.png" />';
hcode=hcode + '<img style="position:relative;" class="sco Ludi5S' + obj.id + '" src="data/lu0.png" />';
hcode=hcode + '</div>';
setTimeout('displayMyScore("' + obj.id + '")',200);
return hcode;
}
//A l'initialisation et lors du redimensionnement de l'écran
function ludiscoreOnZoom(obj){
var hb=parseInt(obj.h * zoom) - 1;
$("#bloc"+ obj.id + " img").css("height",hb + "px").css("width",hb + "px");
$("#bloc"+ obj.id + " .sco").css("margin-left","-" + parseInt(8 * zoom) + "px");
}
function displayMyScore(id){
var lgh=parseInt($(".LudiScore" + id  + "t" + lastPage0).length);
if(lgh>0){
if(LUDIscore<MyScoreDisplay - 1000){
MyScoreDisplay=MyScoreDisplay - 1000;
}
if(LUDIscore<MyScoreDisplay - 100){
MyScoreDisplay=MyScoreDisplay - 100;
}
if(LUDIscore<MyScoreDisplay - 10){
MyScoreDisplay=MyScoreDisplay - 10;
}
if(LUDIscore<MyScoreDisplay){
MyScoreDisplay=MyScoreDisplay - 1;
}
if(LUDIscore>MyScoreDisplay){
MyScoreDisplay=MyScoreDisplay + 1;
}
if(LUDIscore>MyScoreDisplay + 10){
MyScoreDisplay=MyScoreDisplay + 10;
}
if(LUDIscore>MyScoreDisplay + 100){
MyScoreDisplay=MyScoreDisplay + 100;
}
if(LUDIscore>MyScoreDisplay + 1000){
MyScoreDisplay=MyScoreDisplay + 1000;
}
var strScore=MyScoreDisplay.toString();
if(strScore.length==4){
strScore="0" + strScore;
}
if(strScore.length==3){
strScore="00" + strScore;
}
if(strScore.length==2){
strScore="000" + strScore;
}
if(strScore.length==1){
strScore="0000" + strScore;
}
var res5=strScore.substring(4,5);
$(".Ludi5S"+ id).attr("src", "data/lu" + res5 + ".png" );
var res4=strScore.substring(3, 4);
$(".Ludi4S"+ id).attr("src", "data/lu" + res4 + ".png" );
var res3=strScore.substring(2, 3);
$(".Ludi3S"+ id).attr("src", "data/lu" + res3 + ".png" );
var res2=strScore.substring(1, 2);
$(".Ludi2S"+ id).attr("src", "data/lu" + res2 + ".png" );
var res1=strScore.substring(0, 1);
$(".Ludi1S"+ id).attr("src", "data/lu" + res1 + ".png" );
if(LUDIscore>MyScoreDisplay){
scoreBipSound();
setTimeout('displayMyScore("' + id + '")',350);
}else{
setTimeout('displayMyScore("' + id + '")',500);
}
}
}
//Objet conditionnel Ok/Ko
function ludiscoreIsOK(obj){
return true;
}
//Après un déplacement
function ludiscoreOnEndMove(obj){}
function scoreBipSound(){
var sndid="scoreBipSound";
if(document.getElementById(sndid)){
var audioElement;
try{
audioElement=document.getElementById(sndid);
}catch(err){}
try{
audioElement.pause();
audioElement.currentTime=0;
audioElement.load();
}catch(err){}
try{
audioElement.play();
}catch(err){}
}else{
try{
var audioElement=document.createElement('audio');
audioElement.setAttribute('src', 'data/ludibip.mp3');
audioElement.setAttribute("id", sndid);
document.body.appendChild(audioElement);
audioElement.play();
}catch(err){}
}
}



LUDIguid='dcicvju519324202111';