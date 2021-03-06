import {Piece} from '../Piece/Piece';
import {Coordinate} from './Coordinate';
import {MatrixSet} from "../MatrixSet";
import {GameService} from "../Services/GameService";


export class Player {

    done:boolean;
    row:number;
    col:number;
    originalColor:string = "rgb(66, 66, 66)";
    color:string;
    coordinates:Coordinate[];
    state:number;
    matrixes:MatrixSet;
    scoreManager:GameService;

    constructor(set:MatrixSet,color:string){
        this.matrixes = set;
    this.coordinates = [];
        this.color = color;
        this.done = false;
        this.col = Math.floor((Math.random() * 6) + 2);
        this.state = 1;//Math.floor((Math.random()*4) +1);
        this.scoreManager = GameService.getInstance();

    };

        leftPress(boardmap:Piece[][],left:number){
            if(this.checkBelowWrapper(boardmap,this.row,this.col-1)){
                this.col--;
            }
        }
        rightPress(boardmap:Piece[][],left:number){
            if(this.checkBelowWrapper(boardmap,this.row,this.col+1)){
                this.col++;
            }else{
               
            }
        }
        upPress(boardmap:Piece[][],left:number){
            var deletedPoints = this.deleteCoordinates(boardmap);
            var oldstate = this.state;
            this.incrementState();
            if(this.checkBelowWrapper(boardmap,this.row,this.col)){
               
            }else{
                this.state = oldstate;
                deletedPoints.forEach(point => {
                    this.drawToPoint(boardmap,point)
                });
    
            }
    
        }
    
        downPress(boardmap:Piece[][]){
           
            if(this.checkBelowWrapper(boardmap,this.row+1,this.col)){
                this.row++;
                this.scoreManager.setScore(this.scoreManager.getScore()+10);
            }
        }
        draw(boardmap:Piece[][],left:number){
            // if(this.row >17){
            //     this.done = true;
            //     return true;
            // }
           
                if(!this.checkBelowWrapper(boardmap,this.row,this.col)){
                    this.done = true;
                    if(this.row === 0){
                        return false;
                    }else return true;
                }else{
                    this.deleteCoordinates(boardmap);
                    this.drawMatrixWrapper(boardmap);
                    return true;
    
    
                }
            }
        
        checkBelowWrapper(boardmap:Piece[][],row:number,col:number){
            switch(this.state){
                case 1:
                return this.checkBelow(boardmap,this.matrixes.matrix1,row,col);
                break;
    
                case 2:
                return this.checkBelow(boardmap,this.matrixes.matrix2,row,col);
                break;
    
                case 3:
                return this.checkBelow(boardmap,this.matrixes.matrix3,row,col);
                break;
    
                case 4:
                return this.checkBelow(boardmap,this.matrixes.matrix4,row,col);
                break;
    
            }
        }
    
        drawMatrix(boardmap:Piece[][],matrix:number[][]){
            for(var i = 0; i < matrix.length; ++i){
                for(var j = 0; j < matrix[i].length; ++j){
                    if(matrix[i][j] === 1){
                    this.drawToPoint(boardmap,new Coordinate(this.row+i, this.col +j))
                    }
                }
            }
        }
        drawMatrixWrapper(boardmap:Piece[][]){
            switch(this.state){
                case 1:
                 this.drawMatrix(boardmap,this.matrixes.matrix1);
                break;
    
                case 2:
                 this.drawMatrix(boardmap,this.matrixes.matrix2);
                break;
    
                case 3:
                 this.drawMatrix(boardmap,this.matrixes.matrix3);
                break;
    
                case 4:
                 this.drawMatrix(boardmap,this.matrixes.matrix4);
                break;
    
            }
        }
        checkBelow(boardmap:Piece[][],matrix:number[][],row:number,col:number){
    
            var deletedPoints = this.deleteCoordinates(boardmap);
            if(this.checkIfFits(row,col,boardmap,matrix)){
                return true;
            }else{
                deletedPoints.forEach(point => {
                    this.drawToPoint(boardmap,point)
                });
                return false;
            }
    
        }
        checkIfFits(row:number,col:number,boardmap:Piece[][],matrix:number[][]){
            for(var i = 0; i <matrix.length; ++i){
                for(var j = 0; j < matrix[i].length; ++j){
                    if(matrix[i][j] === 1){
                        if(!boardmap[row+i] || !boardmap[row+i][col+j]){
                            return false;
                        }
                        if(!boardmap[row+i][col+j].empty){
                            return false;
                        }
                    }
                }
            }
            return true;
        }
      
        decr(){
            this.row = this.row + 1;
        }

    
         drawToPoint(boardmap:Piece[][],Cord:Coordinate){
    
            
            if(boardmap[Cord.row] && boardmap[Cord.row][Cord.col]){
            boardmap[Cord.row][Cord.col].color = this.color;
            boardmap[Cord.row][Cord.col].empty = false;
            this.coordinates.push(new Coordinate(Cord.row,Cord.col));
            }else{
                console.log("Trying to draw something that doesn't exists at boardmap["+Cord.row+"]["+Cord.col+"]");
            }
        }
        deleteToPoint(boardmap:Piece[][],x:number,y:number){
            if(boardmap[x] && boardmap[x][y]){
               boardmap[x][y].color = this.originalColor;
               boardmap[x][y].empty = true;
            }else{
                console.log("Trying to delete something that doesn't exists at boardmap["+x+"]["+y+"]");
            }
        }
        deleteCoordinates(boardmap){
            var temp:Coordinate[] = [];
            while (this.coordinates.length >0){
                var current = this.coordinates.pop();
                temp.push(current);
                this.deleteToPoint(boardmap,current.row,current.col);
            }
            return temp;
        }
    
         incrementState(){
            if(this.state <4){
                ++this.state;
            }else{
                this.state = 1;
            }
        }
    
    
    }