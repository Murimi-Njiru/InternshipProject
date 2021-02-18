
// Default Position
const xDefault=200;
const yDefault=450;

export class Rocket {
    constructor(ctx){
        this.x=xDefault;
        this.y=yDefault;
        this.speed=10;
        this.ctx=ctx;
    }

    draw(){
        this.ctx.fillStyle="white";
        this.ctx.moveTo(this.x,this.y);
        this.ctx.lineTo(this.x+50,this.y-111.08);
        this.ctx.lineTo(this.x+100,this.y);
        this.ctx.fill();
    }

    //mid point of rocket
    exhausterPosition(){
        return {
            x:this.x+50,
            y:this.y
        }
    }

    move(key){
        // put a condition to prevent rocket from leaving canvas
        switch(key){
            case "ArrowRight":
                this.x+100 <= 490 && (this.x+=this.speed);
                break;
            case "ArrowLeft": 
                this.x >=10 && (this.x-=this.speed);
                break;
            case "ArrowUp": 
                this.y-100 >= 10 && (this.y-=this.speed);
                break;
            case "ArrowDown": 
                this.y <= 500 && (this.y+=this.speed);
                break;
            default:
            
            break;
        }
        this.draw();
    };

    default(){
        this.x=xDefault;
        this.y=yDefault;
        this.draw();
    };
}