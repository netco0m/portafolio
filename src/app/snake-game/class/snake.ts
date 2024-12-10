// src/app/class/snake.ts
export class Snake {
  segments: { x: number, y: number }[] = [];
  direction: { x: number, y: number } = { x: 0, y: 0 };
  growthSpurts: number = 0;

  constructor(initialX: number, initialY: number, initialSize: number) {
    this.segments.push({ x: initialX, y: initialY });
  }

  // Método para mover la serpiente
  move() {
    const head = this.segments[0];
    const newHead = { x: head.x + this.direction.x, y: head.y + this.direction.y };
    this.segments.unshift(newHead);
    if (this.growthSpurts > 0) {
      this.growthSpurts--;
    } else {
      this.segments.pop();
    }
  }

  // Método para agregar un segmento extra a la serpiente
  grow() {
    this.growthSpurts++;
  }
}
