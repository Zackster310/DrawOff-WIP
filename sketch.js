var prev = [];
var current = [];

var clear;

//var colur;
var player;
var gameState = 0;
var playerCount = 0;

var form, canvas;

var selectedTopic = null;

var no1;
var no2;
var no3;

var vote1 = 0;
var vote2 = 0;
var vote3 = 0;

var Tselected = 0;

//var color = 'black';

var database;

var topics = [];

function setup(){
    canvas = createCanvas(displayWidth - 20 ,displayHeight - 30);

    database = firebase.database();

    if (gameState === 0){
        form = new Form();
        form.display();
        Player.getCount();
    }



    topics = ["zoo","mountain range","computer","sports","school/college","movies","mythical creature"];

    topic1 = Math.round(random(0,6));
    topic2 =  Math.round(random(0,6));

    if(topic2 === topic1){
        topic2 = Math.round(random(0,6));
    }

    else{
        topic3 = Math.round(random(0,6));

        if(topic3 === topic1 || topic3 === topic2){
            topic3 = Math.round(random(0,6));
        }
    }

    database.ref('topics/topic1').update({
        name : topic1
    })
    database.ref('topics/topic2').update({
        name : topic2
    })
    database.ref('topics/topic3').update({
        name : topic3
    })

}

function draw(){
    background(200);

    if(playerCount === 4){
        gameState = 1;
    }

    //console.log(gameState)
    if (gameState === 1) {
        if(selectTopic()){
            drawOff();
        }
        else{
            text("Select The Topic" , displayWidth/2 , 75);
        }
    }
}
    
function selectTopic(){

    //console.log(topic1);
    //console.log(topics[topic1]);

    database.ref('topics/topic1/name').on("value",(data) => {
        no1 = data.val()
    })

    database.ref('topics/topic2/name').on("value",(data) => {
        no2 = data.val()
    })

    database.ref('topics/topic3/name').on("value",(data) => {
        no3 = data.val()
    });

    if(selectedTopic === null){
        player.vote();
    }
    //console.log(no1);
    //console.log(topics[no1]);

}


function drawOff(){
    form.hide();

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