var canavs;
var database;

var db_drawing = [];
var drawing = [];


function setup() {
    canvas = createCanvas(700, 700);
    background('rgb(0,255,0)');
    canvas.parent('canvascontainer');
    database = firebase.database();
   
  
  var clearButton = select('#clearbutton');
    clearButton.mousePressed(clearDrawing);

}

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
   drawing.push(point);
   var drawingRef = database.ref('drawing');
    drawingRef.set({
        "d": drawing 
    })
}

function draw() {
    readData();
   
    stroke(255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
        }
    
}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        db_drawing = data.val().d;
    })
}

 function clearDrawing() {
     drawing = []
   
 }

