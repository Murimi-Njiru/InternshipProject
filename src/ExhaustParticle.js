export class ExhaustParticle {
    constructor(position,hue) {
        this.x = position.x;
        this.y = position.y; 
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 + 1;
        this.hue="hsl("+hue+",100%,50%)"
    }      

    update () {
        this.x +=this.speedX;
        this.y +=this.speedY;
        if(this.size > 0.2) this.size -=0.1;
    }

    draw(ctx) {
        ctx.fillStyle=this.hue;
        ctx.beginPath();   
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        ctx.fill();
    }
}