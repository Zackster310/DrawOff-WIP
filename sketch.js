var prev = [];
var current = [];

var clear;

//var colur;

var gameState = 0;

var form;

//var color = 'black';

//var database;

function setup(){
    var canvas = createCanvas(displayWidth - 20 ,displayHeight - 30);

    canvas.mousePressed(startPath);

    //database = firebase.database();
    if(gameState === 1){
        clear = createButton('Clear Screen');
        clear.position(50,50);
        clear.mousePressed(clearDrawing);
    }

    //black = createButton("Black");
    //black.position(0,650);

    //black = createSprite(150,650,50,50);
    //black.shapeColor = "black";



    //blue = createButton("Blue");
    //blue.position(50,650);
    //blue.mousePressed(StrBlu);

    //blue = createSprite(100,650,50,50);
    //blue.shapeColor = "blue";

    //red = createSprite(150,650,50,50);
    //red.shapeColor = "red";

    //yellow = createSprite(200,650,50,50);
    //yellow.shapeColor = "yellow";

    //colur = "black";

    //stroke("black");

    if(gameState === 0 ){
        form = new Form();
    }
}

function startPath(){
    current = [];
    prev.push(current);
}

function draw(){
   

    //getScreen();
    if(gameState === 1){

        background(200);

        if(mouseIsPressed){
            var point = {
                x : mouseX,
                y : mouseY
            }

            current.push(point);

            //putScreen();
        }

        /*if(mousePressedOver(red)){
            colur = "red";
        }

        if(mousePressedOver(yellow)){
            colur = "yellow";
        }*/


        /*blue.mousePressed(StrBlu);

        black.mousePressed(stroke("black"));*/

        /*if(colur === "black"){
            stroke("black");
        }

        if(colur === "blue"){
            stroke("blue");
        }

        if(colur === "red"){
            stroke("red");
        }

        if(colur === "yellow"){
            stroke("yellow");
        }*/


        //stroke('green');
        strokeWeight(3);
        noFill();

        for(var i = 0; i < prev.length ; i++){
            var path = prev[i];

            beginShape();
            for(var a = 0; a <path.length ; a++){
                vertex(path[a].x,path[a].y);
            }
            endShape();

        }

        drawSprites();
    }

}


    


function StrBlu(){
    console.log("blue");
    stroke("blue");
}

/*function putScreen(){

    console.log("hi");

    database.ref('/').update({
        drawing : prev
    })
}*/

/*function getScreen(){

    var dDraw = [];

    var drawRef = database.ref('drawing');
    drawRef.on("value",(data) => {
        dDraw = data.val();
    })

    stroke(0);
    strokeWeight(5);
    noFill();

    for(var i = 0; i < dDraw.length ; i++){
        var path = dDraw[i];

        beginShape();
        for(var a = 0; a <path.length ; a++){
            vertex(path[a].x,path[a].y);
        }
        endShape();

    }

}*/

function clearDrawing(){
    current = [];
    prev = [];
}