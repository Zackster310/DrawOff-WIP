var prev = [];
var current = [];

var clear;

//var colur;
var player;
var gameState = 0;
var playerCount = 0;

var form, canvas;

//var color = 'black';

var database;

function setup(){
    canvas = createCanvas(displayWidth - 20 ,displayHeight - 30);

    database = firebase.database();

    if (gameState === 0){
        form = new Form();
        form.display();
        Player.getCount();
    }

}

function draw(){
    background(200);

    if(playerCount === 4){
        gameState = 1;
    }

    //console.log(gameState)
    if (gameState === 1) {
        drawOff()
    }
}
    
function drawOff(){
    form.hide()
    canvas.mousePressed(startPath);

    clear = createButton('Clear Screen');
    clear.position(50,50);
    clear.mousePressed(clearDrawing);

    if(mouseIsPressed){
        var point = {
            x : mouseX,
            y : mouseY
        }

        current.push(point);

        //putScreen();
    }

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

        drawingRef = "players/player" + player.index;
        database.ref(drawingRef).update({
            drawing : prev
        })

        drawSprites();
    }

function startPath(){
    current = [];
    prev.push(current);
}

function clearDrawing(){
    current = [];
    prev = [];
}