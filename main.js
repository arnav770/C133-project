img = "";
status = "";
objects = [];
function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocosst", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results) { 
if(error) {
    console.log(error);
}
console.log(results);
objects = results;
}


function draw() {
    image(img, 0, 0, 640, 420);
    if(status!= "") {
        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : objects detected";  
            fill("blue");
            noFill();
            percent = floor(objects[i].confidence * 100);
            stroke("black");
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
        }
    }
   
}