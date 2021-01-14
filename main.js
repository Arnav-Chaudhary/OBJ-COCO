
object=[];
status="";
function preload(){
}
function setup(){
canvas= createCanvas(380,380);
canvas.center();
Video= createCapture(VIDEO);
Video.size(380,380);
Video.hide()
objectDetector= ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML="Status: Dectecting Objects";
}
 function modelLoaded(){
console.log("Model Loaded");
status= true;
}

function gotResult(error,results){
if(error){
    console.error(error);
}
else{  
    object=results; 
    console.log(results);
} 

}

function draw(){
    image(Video,0,0,380,380);
    if(status != "" ){
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(Video,gotResult);
        for(i=0; i < object.length;  i++ ){
            document.getElementById("status").innerHTML="Status: Object Detected ";
            document.getElementById("object_length").innerHTML= "Number Of Objects Detected Are : " + object.length;
            percent= floor(object[i].confidence * 100);
            fill(r,g,b);
          text(object[i].label + " " + percent + "%" ,   object[i].x , object[i].y);
         noFill();
         stroke(r,g,b);
         rect(object[i].x , object[i].y, object[i].width, object[i].height);
        }
    }
}