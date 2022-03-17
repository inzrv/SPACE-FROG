export class Platform {
    constructor(point_x, point_y, img) {
        this.pos = {
            x: point_x,
            y: point_y
        }
        this.width = img.width;
        this.height = img.height;
        this.image = img;
    };
    draw(ctx) {
        ctx.drawImage(this.image, this.pos.x, this.pos.y);
    }
}