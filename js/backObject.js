export class BackObject {
    constructor(p_x, p_y, img) {
        this.pos = {
            x: p_x,
            y: p_y
        }
        this.width = img.width;
        this.height = img.height;
        this.image = img;
    }
  
    draw(ctx) {
        ctx.drawImage(this.image, this.pos.x, this.pos.y);
    }
  }