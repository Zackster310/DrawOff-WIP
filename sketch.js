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



    topics = ["zoo","mountain range","computer","sports","school/college","movies","mythical creature"];

    topic1 = Math.round(random(1,7));
    topic2 =  Math.round(random(1,7));

    if(topic2 === topic1){
        topic2 = Math.round(random(1,7));
    }

    else{
        topic3 = Math.round(random(1,7));

        if(topic3 === topic1 || topic3 === topic2){
            topic3 = Math.round(random(1,7));
        }
    }

    database.ref('topics').update({
        topic1 : topic1
    })
    database.ref('topics').update({
        topic2 : topic2
    })
    database.ref('topics').update({
        topic3 : topic3
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
    var no1;
    var no2;
    var no3;

    console.log(topic1);
    console.log(topics[topic1]);

    database.ref('topics/topic1').on("value",(data) => {
        no1 : database.val()
    })

    database.ref('topics/topic1').on("value",(data) => {
        no2 : database.val()
    })

    database.ref('topics/topic1').on("value",(data) => {
        no3 : database.val()
    });

    option1 = createButton(topics[no1]);
    option2 = createButton(topics[no2]);
    option3 = createButton(topics[no3]);

    option1.position(displayWidth/2 - 200 , displayHeight/2 - 100)
    option2.position(displayWidth/2 - 50 , displayHeight/2 - 100)
    option3.position(displayWidth/2 + 150 , displayHeight/2 - 100)

    return true;

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