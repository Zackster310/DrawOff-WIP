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

var vote1;
var vote2;
var vote3;

var Tselected;

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

    console.log(no1);
    console.log(topics[no1]);

    if(selectedTopic === null){
        option1 = createButton(topics[no1]);
        option2 = createButton(topics[no2]);
        option3 = createButton(topics[no3]);

        option1.position(displayWidth/2 - 200 , displayHeight/2 - 100)
        option2.position(displayWidth/2 - 25 , displayHeight/2 - 100)
        option3.position(displayWidth/2 + 150 , displayHeight/2 - 100)


        option1.mousePressed(() => {

            console.log("hi");

            database.ref('topics/topic1/votes').on("value",(data) => {
                vote1 = data.val()
            })

            vote1 += 1

            database.ref('topics/topic1').update({
                votes : vote1
            })

            selected();

        })

        option2.mousePressed(() => {

            database.ref('topics/topic2/votes').on("value",(data) => {
                vote2 = data.val()
            })

            vote2 += 1

            database.ref('topics/topic2').update({
                votes : vote2
            })

            selected();

        })

        option3.mousePressed(() => {

            database.ref('topics/topic3/votes').on("value",(data) => {
                vote3 = data.val()
            })

            vote3 += 1

            database.ref('topics/topic3').update({
                votes : vote3
            })

            selected();

        })

        return false;
    }

}

function selected(){
    database.ref('topics/voted').on("value",(data) => {
        Tselected = data.val();
    })

    Tselected += 1;

    database.ref('topics').update({
        voted : Tselected
    })
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
