export class Point {
  x: number;
  y: number;
  name: string;
  dx: number;
  dy: number;

  constructor(x: number, y: number, name: string, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.dx = dx;
    this.dy = dy;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

