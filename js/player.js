export class Player {
    constructor(img, canvas) {
        this.pos = {
            x: 100,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.speed = 7;
        this.jump = 20;
        this.image = img;
        this.width = img.width;
        this.height = img.height;
  }
  
    draw(ctx) {
       ctx.drawImage(this.image, this.pos.x, this.pos.y)
    }
  
    update(ctx, gravity, height) {
        this.draw(ctx);
        this.pos.y += this.velocity.y;
        this.pos.x += this.velocity.x;
        if (this.pos.y + this.height + this.velocity.y <= height) {
           this.velocity.y += gravity;
        }
    }
  }