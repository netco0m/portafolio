// direction.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  direction = { x: 0, y: 0 };

  updateDirection(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
      case 'w': // Tecla 'w' para arriba
        this.direction = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
      case 's': // Tecla 's' para abajo
        this.direction = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
      case 'a': // Tecla 'a' para izquierda
        this.direction = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
      case 'd': // Tecla 'd' para derecha
        this.direction = { x: 1, y: 0 };
        break;
    }
  }
}
