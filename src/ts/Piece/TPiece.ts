import {Piece} from '../Piece/Piece';
export class TPiece{
    kind: string;
    color: string;
    speiceList:Piece[];
    started:boolean;
    row:number;
    col:number;
    flipped:boolean;
    firstTime:Boolean;
    originalColor:string;
    constructor(){
        //this.kind = kind;
       this.initP();
    }
    initP(){
       this.color = "rgb(19, 237, 11)";
       this.originalColor = "rgb(66, 66, 66)";
       this.flipped = Math.random() >= 0.5;
       this.started = false;
       this.speiceList = [];
       this.row = -1;
       this.firstTime = true;
       
       this.generateType();
       this.setcolor();
       if(this.kind === "I" && !this.flipped){
       this.col = Math.floor((Math.random() * 6) + 0);
       }else {
          this.col = Math.floor((Math.random() * 6) + 0);
       }
    }

    leftPress(boardmap:Piece[][],left:number){
        console.log("Calling left press");
        if(this.flipped){//Delete all elements to right
           for(var i = 0; i < 4; i++){
               boardmap[this.row +i ][this.col].color = this.originalColor;
               boardmap[this.row + i  ][this.col].empty = true;
           }
        }else{
           for(var i = 0; i < 4; i++){
               boardmap[this.row ][this.col+i].color =   this.originalColor;
               boardmap[this.row ][this.col +i].empty = true;
           }
        }
        if(this.col >0){
            --this.col; 
        }
       
        this.draw(boardmap,left);
    }
    rightPress(boardmap:Piece[][],left:number){

       if(this.flipped){
           //Delete all elements to right
           if(this.col < 9){
           for(var i = 0; i < 4; i++){
               boardmap[this.row +i ][this.col].color = this.originalColor;
               boardmap[this.row + i  ][this.col].empty = true;
           }
           ++this.col;
        }
        }else{
            if(this.col < 6){
           for(var i = 0; i < 4; i++){
               boardmap[this.row ][this.col+i].color =   this.originalColor;
               boardmap[this.row ][this.col +i].empty = true;
           }
           ++this.col;
        }
        }
       
        this.draw(boardmap,left);
    }


    generateType(){
        var type = Math.floor((Math.random() * 7) + 1);
       //  switch(type){
       //      case 0:
       //          this.kind = "0";
       //          break;
       //      case 1:
       //          this.kind = "T";
       //          break;
       //      case 2:
       //          this.kind = "I";
       //          break;
       //      case 3:
       //          this.kind = "S";
       //          break;
       //      case 4:
       //          this.kind = "Z";
       //          break;
       //      case 5:
       //          this.kind = "J";
       //          break;
       //      case 6:
       //          this.kind = "L";
       //          break;
       //  }
       this.kind = "I";
    }

    draw(boardmap:Piece[][],left:number){

       if(this.kind === "I"){
           if(this.flipped){
             return  this.drawIFlipped(boardmap,left);
           }else if(!this.flipped){
              return  this.drawINotFlipped(boardmap,left);
           }
       }
    }

    drawIFlipped(boardmap:Piece[][],left:number){//verticle
         
           if(this.row === 0){
               
                for(var i = 0; i < 4; i++){
                    if(!boardmap[this.row+i][this.col].empty){
                        for(var j = 0; j < i; ++j){
                           boardmap[this.row + j  ][this.col].color = this.color;
                           boardmap[this.row + j ][this.col].empty = false;
                        }
                        return false;//game over
                    }
                }
                
            }
       
           if(boardmap[this.row]
           && boardmap[this.row+1] 
           && boardmap[this.row+2] 
           && boardmap[this.row+3] )
           {
             

   
               if(boardmap[this.row-1]){
                   boardmap[this.row -1][this.col].color = this.originalColor;
                   boardmap[this.row -1][this.col].empty = true;
               }

               
              
   
               for(var i = 0; i < 4; i++){
                   boardmap[this.row +i ][this.col].color = this.color;
                   boardmap[this.row + i  ][this.col].empty = false;
               }
              


               if(this.row < 15 && !boardmap[this.row+4][this.col].empty){
                   // Must check board and clear.
                   this.checkBoardForRows(boardmap); 
                   this.initP();
                   return true;
                   
               }
               return true;


           }else if(!boardmap[this.row+3]){
               this.row = 0;
               this.col = Math.floor((Math.random() * 10) + 0);

               //We have stopped must calculate if we need to clear.
               this.checkBoardForRows(boardmap);
               this.initP();
               return true
           }
    }

    drawINotFlipped(boardmap:Piece[][],left:number){ //horizontal

       if(this.row === 0){
               
           if(!boardmap[this.row][this.col].empty){
             
           }
           for(var i = 0; i < 4; i++){
               if(!boardmap[this.row][this.col+i].empty){
                   for(var j = 0; j < i; ++j){
                       boardmap[this.row  ][this.col+j].color = this.color;
                       boardmap[this.row  ][this.col+j].empty = false;
                   }
                   return false;//game over
               }
           }
           
       }


    
       if(boardmap[this.row] && boardmap[this.row][this.col]
           && boardmap[this.row][this.col+1] 
           && boardmap[this.row][this.col+2]  
           && boardmap[this.row][this.col+3]  )
           {

               if(boardmap[this.row-1]){

                   for(var i = 0; i < 4; i++){
                       boardmap[this.row -1][this.col+i].color =   this.originalColor;
                       boardmap[this.row -1][this.col +i].empty = true;
                   }

               }

   
           for(var i = 0; i < 4; i++){
               boardmap[this.row  ][this.col+i].color = this.color;
               boardmap[this.row  ][this.col+i].empty = false;
           }


            for(var i = 0; i <4; ++i){
               if(this.row < 19 && !boardmap[this.row+1][this.col + i].empty){
                   this.row = 0;
               this.col = 0;
               this.checkBoardForRows(boardmap);
                   this.initP();
                   return true;
               }
            }
            return true;
 
           } if(!boardmap[this.row+1]){  
               this.checkBoardForRows(boardmap);    
               this.initP();
               return true;
           }
    }


    decr(){
        console.log("Calling decr here");
        this.row = this.row + 1;
    }

    setcolor(){
       var color = Math.floor((Math.random() * 6) + 1);
       
        switch(color){
           case 0:
               this.color = "rgb(11, 98, 237)";
               break;
           case 1:
               this.color = "rgb(19, 237, 11)";
               break;
           case 2:
               this.color = "rgb(249, 72, 90)";
               break;
           case 3:
               this.color = "rgb(245, 255, 66)";
               break;
           case 4:
               this.color = "rgb(66, 255, 248)";
               break;
           case 5:
               this.color = "rgb(255, 66, 176)";
               break;
           case 6:
               this.color = "rgb(255, 154, 66)";
               break;
        }
    }

    checkBoardForRows(boardmap:Piece[][]){

       boardmap.forEach(element => {
           var NeedToDelete = true;;
           element.forEach(elementChild => {
               if(elementChild.empty){
                   NeedToDelete = false;
               }
           });
           if(NeedToDelete){
               console.log("Need to delete this row");
           }
       });

    }


}