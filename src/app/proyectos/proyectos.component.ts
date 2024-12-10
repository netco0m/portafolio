import { Component, OnInit, ViewChild } from '@angular/core';
import { FocusClassDirective } from '../directives/focus-class.directive';
import { VisibilityDirective } from '../directives/visibility.directive';
import { Gallery, GalleryRef, GalleryModule, ImageItem } from 'ng-gallery';
import { GalleryEcommerceComponent } from './gallerys/gallery-ecommerce/gallery-ecommerce.component';
import { GalleryHideskComponent } from './gallerys/gallery-hidesk/gallery-hidesk.component';

@Component({

  selector: 'app-proyectos',
  standalone: true,
  imports: [FocusClassDirective, VisibilityDirective, GalleryModule, GalleryEcommerceComponent, GalleryHideskComponent],
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'] // Descomenta si tienes un archivo CSS asociado
})
export class ProyectosComponent {

  CodigoSnake: string = `
import { Component, OnInit, OnDestroy , HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DirectionService } from './service/direction.service'; // Asegúrate de importar el servicio
import { SnakeGameService } from './service/snake-game.service'; // Asegúrate de importar el servicio
import { Point } from './class/point';

@Component({
  selector: 'app-snake-game',
  standalone: true,
  template: <canvas id="gameCanvas"></canvas>,
  styleUrls: ['./snake-game.component.css'],
})
export class SnakeGameComponent implements OnInit, OnDestroy {


  @ViewChild('gameContainer') gameContainer!: ElementRef;
  ratImage: HTMLImageElement;  // Guardamos la imagen de la rata
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  isPaused = false; // Estado de pausa
  requestId: number | null = null;
  gameOver = false;
  tileSize = 30;
  snakeSize = 30;
  gridSizeX = 0;
  gridSizeY = 0;
  constructor(
    private router: Router,
    private directionService: DirectionService,  // Inyecta el servicio de dirección
    private snakeGameService: SnakeGameService   // Inyecta el servicio de juego de serpiente
  ) {
    this.ratImage = new Image();
    this.ratImage.src = 'assets/images/rata.png';
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.setCanvasSize();

    // Escuchar el evento de teclado
    window.addEventListener('keydown', this.onKeydown.bind(this));
    if(this.isPaused){
    window.addEventListener('keydown', this.onKeydown.bind(this));}

    // Inicializar puntos y comenzar el juego
    this.snakeGameService.initializePoints(this.gridSizeX, this.gridSizeY);  // Inicializa los puntos
    //requestAnimationFrame(this.gameLoop.bind(this)); // Inicia el ciclo de juego
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  ngOnDestroy(): void {
    this.endGame();
  }

  endGame(): void {
    if (this.requestId !== null) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
    window.removeEventListener('keydown', this.onKeydown.bind(this));
    //console.log('Recursos del juego liberados.');
  }

setCanvasSize() {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;

  // Calcular el número total de "tiles" horizontal y verticalmente
  this.gridSizeX = Math.floor(this.canvas.width / this.tileSize);
  this.gridSizeY = Math.floor(this.canvas.height / this.tileSize);
}


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setCanvasSize();
  }

  // Método que se ejecuta continuamente para mover la serpiente, los puntos, etc.
  gameLoop(timestamp: number) {

    if (this.isPaused) return; // Si el juego está pausado, no hacer nada
    const deltaTime = timestamp - this.snakeGameService.lastFrameTime;

    if (deltaTime > 1000 / (this.snakeGameService.speed * (this.tileSize / 30))) {

      this.snakeGameService.lastFrameTime = timestamp;

      this.moveSnake();
      this.movePoints();
      this.detectCollisions();
      this.draw();
    }

    this.requestId = requestAnimationFrame(this.gameLoop.bind(this));
  }


  // Mover la serpiente según la dirección actual
  moveSnake() {
    // Mover la serpiente en base a la dirección
    this.snakeGameService.moveSnake(this.directionService.direction);
    const head = this.snakeGameService.getSnake()[0];

    // Verificar si la cabeza está dentro de los límites de la cuadrícula
    const gridSizeXLimit = Math.floor(this.canvas.width / this.tileSize);
    const gridSizeYLimit = Math.floor(this.canvas.height / this.tileSize);

    if (head.x < 0 || head.x >= gridSizeXLimit || head.y < 0 || head.y >= gridSizeYLimit) {
      this.handleLoss();  // Llamar a handleLoss si la serpiente está fuera de los límites
    }
  }

  handleLoss() {
    this.gameOver = true;
    this.isPaused = true;
    // Detener cualquier animación en curso
  if (this.requestId !== null) {
    cancelAnimationFrame(this.requestId);
    this.requestId = null;
  }
  // Reinicia o detiene completamente el juego aquí
  console.log('¡Juego terminado!');

   //this.snakeGameService.handleLoss(); // Reiniciar el juego a través del servicio
   //this.directionService.direction = { x: 0, y: 0 };  // Detener el movimiento de la serpiente
  }



  // Mover los puntos aleatorios
// Mover los puntos aleatorios
movePoints() {
  const speedFactor = 0.2; // 60% de la velocidad original (para hacerlas más lentas en un 40%)

  this.snakeGameService.getPoints().forEach((point) => {
    point.x += point.dx * speedFactor;  // Reducir la velocidad de movimiento de la rata en el eje X
    point.y += point.dy * speedFactor;  // Reducir la velocidad de movimiento de la rata en el eje Y

    // Asegúrate de que las ratas reboten correctamente en los bordes
    if (point.x < 0 || point.x * this.tileSize >= this.canvas.width) point.dx *= -1;
    if (point.y < 0 || point.y * this.tileSize >= this.canvas.height) point.dy *= -1;
  });

  this.changeRatDirectionOnCollision();
}



  // Detectar colisiones entre la serpiente y los puntos
  detectCollisions() {
    const head = this.snakeGameService.getSnake()[0];
    const headX = head.x * this.tileSize;
    const headY = head.y * this.tileSize;

    // Incremento del área de colisión
    const collisionPadding = 30; // Aumenta este valor para incrementar el área de colisión

    this.snakeGameService.getPoints().forEach((point, index) => {
      const pointX = point.x * this.tileSize;
      const pointY = point.y * this.tileSize;

      // Ajustar el área de colisión
      const isCollision =
        headX < pointX + this.tileSize + collisionPadding &&
        headX + this.snakeSize > pointX - collisionPadding &&
        headY < pointY + this.tileSize + collisionPadding &&
        headY + this.snakeSize > pointY - collisionPadding;

      if (isCollision) {
        // Reproducir el sonido de la colisión
        this.isPaused = true;
        this.playCollisionSound();

        this.navigateToSection(point.name);
        this.ngOnDestroy();
        return;

        // Eliminar la rata de los puntos (o crear una nueva rata aleatoria)
        // this.snakeGameService.removePoint(index); // Este método debería eliminar el punto (rata) de la lista
      }
    });
  }


  changeRatDirectionOnCollision() {
    // Obtener los puntos (ratas) del servicio
    const points = this.snakeGameService.getPoints();

    // Iterar sobre cada punto para comprobar las colisiones
    for (let i = 0; i < points.length; i++) {
      const point: Point = new Point(0, 0, 'point1', 1, 1);
      const otherPoint: Point = new Point(5, 5, 'point2', -1, -1);
      // Comprobar colisiones con otros puntos
      for (let j = i + 1; j < points.length; j++) {
        //const otherPoint = points[j];

        // Calcular la distancia entre las ratas
        const distance = this.calculateDistance(point, otherPoint);
        const collisionThreshold = this.tileSize * 1.5; // Distancia mínima de colisión

        // Si las ratas están demasiado cerca, invertir las direcciones
        if (distance < collisionThreshold) {
          point.dx *= -1;
          point.dy *= -1;
          otherPoint.dx *= -1;
          otherPoint.dy *= -1;
        }
      }
    }
  }

  // Función para calcular la distancia entre dos puntos (ratas)
  calculateDistance(point1: Point, point2: Point): number {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }


  playCollisionSound() {
    const collisionSound = new Audio('assets/sounds/collision-sound.mp3');
    collisionSound.play();
  }



  navigateToSection(section: string) {
    this.startRetroTransition(() => {
      this.router.navigate([/{section}]);
    });
  }

  startRetroTransition(callback: () => void) {
    let flashes = 0;
    const maxFlashes = 6; // Cantidad de parpadeos
    const flashDuration = 100; // Duración de cada parpadeo (ms)

    const interval = setInterval(() => {
      if (flashes >= maxFlashes) {
        clearInterval(interval);
        callback(); // Ejecutar la navegación después de los parpadeos
      } else {
        this.ctx.fillStyle = flashes % 2 === 0 ? 'white' : 'black'; // Alternar colores
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        flashes++;
      }
    }, flashDuration);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Primero, dibuja la serpiente
    this.snakeGameService.getSnake().forEach((segment, index) => {
      const gradient = this.ctx.createRadialGradient(
        segment.x * this.snakeSize + this.snakeSize / 2,
        segment.y * this.snakeSize + this.snakeSize / 2,
        this.snakeSize / 4,
        segment.x * this.snakeSize + this.snakeSize / 2,
        segment.y * this.snakeSize + this.snakeSize / 2,
        this.snakeSize / 2
      );
      gradient.addColorStop(0, 'green');
      gradient.addColorStop(1, index === 0 ? 'darkgreen' : 'lightgreen');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(
        segment.x * this.snakeSize + this.snakeSize / 2,
        segment.y * this.snakeSize + this.snakeSize / 2,
        this.snakeSize / 2,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
    });
    const ratSize = Math.min(this.canvas.width, this.canvas.height) * 0.03; // 3% del tamaño menor del lienzo
    this.snakeGameService.getPoints().forEach((point) => {
      this.ctx.drawImage(
        this.ratImage,
        point.x * this.tileSize - (ratSize - this.tileSize) / 2,  // Centrar la rata
        point.y * this.tileSize - (ratSize - this.tileSize) / 2,  // Centrar la rata
        ratSize,  // Nuevo tamaño
        ratSize   // Nuevo tamaño
      );
    });
    // Después, dibuja las ratas
    this.snakeGameService.getPoints().forEach((point) => {
      // Dibuja el texto de la rata
      this.ctx.fillStyle = 'white';
      this.ctx.font = '16px Arial bold';
      this.ctx.fillText(
        point.name.toUpperCase(),
        point.x * this.tileSize + 3,
        point.y * this.tileSize + this.tileSize / 2
      );
    });

  // Mostrar mensaje de "¡Perdiste!" si gameOver es true
    if (this.gameOver) {
      this.ctx.fillStyle = 'red';
      this.ctx.font = '50vh BadMofo';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(
        '¡PERDISTE!',
        this.canvas.width / 2,
        this.canvas.height / 2
      );

       // Mostrar mensaje de "press ENTER"
    this.ctx.fillStyle = 'white';
    this.ctx.font = '30px Arial'; // Ajusta el tamaño del texto
    this.ctx.fillText(
      'press ENTER',
      this.canvas.width / 2,
      this.canvas.height / 2 + 30 // Ajusta la posición para que esté debajo de "PERDISTE"
    );

    // Mostrar mensaje "(saldras en direccion aleatoria)"
    this.ctx.font = '20px Arial'; // Ajusta el tamaño del texto
    this.ctx.fillText(
      '(saldrás en dirección aleatoria)',
      this.canvas.width / 2,
      this.canvas.height / 2 + 70 // Ajusta la posición para que esté debajo de "press ENTER"
    );
    }
  }

  // Método para escuchar las teclas y actualizar la dirección de la serpiente
  onKeydown(event: KeyboardEvent) {
    if (this.gameOver  && event.key === "Enter") {
      this.resetGame();
      //this.gameOver = false; // Ocultar mensaje de "¡Perdiste!"
      return;
    }
    this.directionService.updateDirection(event);  // Usar el servicio para actualizar la dirección
  }

  resetGame() {
    this.gameOver = false;
    this.isPaused = false;  // Reanudar el juego
    this.snakeGameService.resetSnake();  // Reinicia la serpiente y los puntos
    this.snakeGameService.initializePoints(this.gridSizeX, this.gridSizeY); // Re-inicializar los puntos
    this.snakeGameService.lastFrameTime = performance.now(); // Resetear el tiempo de la última animación
    window.requestAnimationFrame(this.gameLoop.bind(this)); // Iniciar el ciclo de animación
  }


}
`;



}

