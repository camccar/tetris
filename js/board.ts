class Board{

    canvas:any;
    width:number;
    height:number;
    left:number;
    ctx:any;
    backgroundColor:string;
    boardmap:Speace[][];
    t:Tpiece;
    gameInProgress:boolean;
    
    constructor(){
        this.canvas = document.querySelector('.myCanvas');
        this.backgroundColor = 'rgb(38, 37, 37)';//black
        this.boardmap = [];
        this.zeroBoard();
        this.initBoard();
        this.gameInProgress =  true;
        this.t = new Tpiece();
        var center = this.getCenter();
         this.left = center - 200;
    }
    getPiece(){
        return this.t;
    }

    getCenter(){
        return Math.floor(this.width/2)
    }

    keyPress(e:any){
        if (e.keyCode == '38') {
            // up arrow
        }
        else if (e.keyCode == '40') {
            // down arrow
        }
        else if (e.keyCode == '37') {
           // left arrow
           this.t.leftPress(this.boardmap,this.left);
        }
        else if (e.keyCode == '39') {
           // right arrow
           this.t.rightPress(this.boardmap,this.left);
        }
          
  
    }

    decrTime(){
        if(this.gameInProgress){
        this.t.decr();
        var success = this.t.draw(this.boardmap,this.left);

        if(!success){
            this.gameInProgress = false;
        }

        }
    }

    zeroBoard(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
    }
    initBoard(){
        var center = this.getCenter();
        var left = center -200;
        this.left = left;
        var top = 60;
        var localcolor = "rgb(66, 66, 66)";
        for(var i = 0; i < 20; i++){
            //i = rows
            var middleList = [];
            for(var j = 0; j < 10; ++j){
                //columns
                var pushmePeace = new Speace(localcolor,(j*40),(i*40));
                pushmePeace.empty = true;
                middleList.push(pushmePeace);
                //this.boardmap[i-1][j-1] = new Speace(localcolor,left+(j*40),top+(i*40));
            }
            this.boardmap.push(middleList);
            middleList = [];
        }

   

    }

    drawBoard(){
       
        this.zeroBoard();
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);


        var center = this.getCenter();
        var left = center - 200;
        this.left = left;

        this.ctx.strokeStyle = 'rgb(255, 255, 255)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(left, 60, 400, 800);

        this.drawLines(left);

        for(let topentry of this.boardmap){
           for(let entry of topentry){
               entry.draw(this.ctx,left);
           }
        }


    }
    drawLines(left:number){
       
        
        this.ctx.strokeStyle = 'rgb(91, 89, 89)';

        var lineBottom = 60;
        var lineTop = 60+800;

        //Draw horizontal lines
        for(var offset = 40; offset <  400; offset = offset +40){
            this.ctx.moveTo(left+offset,lineBottom);
            this.ctx.lineTo(left+offset,lineTop);
            this.ctx.stroke();
        }

        for(var offset = 60; offset < 800 + 60; offset = offset+40){
            this.ctx.moveTo(left,offset);
            this.ctx.lineTo(left+400,offset);
            this.ctx.stroke();
        }

    }



}