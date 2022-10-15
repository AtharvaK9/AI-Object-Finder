function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetection('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects..";
}

function modelLoaded() {
    console.log("CoCoSSD Model Loaded Successfully!");
    status = true;
}
 
function draw() {
    image(video, 0, 0, 400, 300);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are: " + objects.length;

            fill("#FF0000");
            confidence = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + confidence + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}