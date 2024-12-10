import { Injectable } from '@angular/core';
import { Point } from '../class/point';
import { Snake } from '../class/snake';
@Injectable({
  providedIn: 'root',
})
export class SnakeGameService {
  private snake: { x: number; y: number }[] = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 },
  ];

  public points: { x: number; y: number; name: string; dx: number; dy: number }[] = [];
  private gameOver = false;
  public lastFrameTime = 0;
  public gridSizeX = 0;
  public gridSizeY = 0;
  public speed = 25; // Velocidad de movimiento de la serpiente
  speedSnake = 20; // Velocidad de movimiento de la serpiente

  setGridSize(x: number, y: number) {
    this.gridSizeX = x;
    this.gridSizeY = y;
  }

  getSnake() {
    return this.snake;
  }

  getPoints() {
    return this.points;
  }

  isGameOver() {
    return this.gameOver;
  }

  handleLoss() {
    this.gameOver = true;
    this.snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
      { x: 7, y: 10 },
    ];
  }

  moveSnake(direction: { x: number; y: number }) {
    for (let i = this.snake.length - 1; i > 0; i--) {
      this.snake[i] = { ...this.snake[i - 1] };
    }
    this.snake[0].x += direction.x;
    this.snake[0].y += direction.y;
  }

  initializePoints(gridSizeX: number, gridSizeY: number) {
    const sections = [ 'sobre-mi', 'proyectos', 'habilidades', 'contacto'];
    this.points = [];
    sections.forEach((name) => {
      const point = new Point(
        Math.floor(Math.random() * gridSizeX),
        Math.floor(Math.random() * gridSizeY),
        name,
        Math.random() > 0.5 ? 1 : -1,
        Math.random() > 0.5 ? 1 : -1
      );
      this.points.push(point);
    });
  }

    // Método para reiniciar la serpiente y los puntos
    resetSnake() {
      // Resetear la serpiente a su posición inicial
      this.snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
        { x: 7, y: 10 },
      ];
      // Reiniciar el estado de los puntos
      this.initializePoints(this.gridSizeX, this.gridSizeY);  // O ajusta el tamaño de la cuadrícula según sea necesario
      this.gameOver = false;  // Reiniciar el estado de fin de juego
    }


}
