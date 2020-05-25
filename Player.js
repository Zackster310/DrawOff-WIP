class Player {
    constructor(){
        this.name = "";
        this.drawing = [];
        this.index = null;
    }

    static getCount(){
        var countRef = database.ref('playerCount');
        countRef.on("value",(data) => {
            playerCount = data.val();
        })
    }

    updateCount(count){
        database.ref('/').update({
            playerCount : count
        })
    }

    update(){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name : this.name,
            //drawing : this.drawing
        })
    }

}