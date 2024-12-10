import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { HeaderimgComponent } from '../headerimg/headerimg.component';
import { SnakeGameComponent } from '../snake-game/snake-game.component';
import { InicioMovilComponent } from '../inicio-movil/inicio-movil.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, HeaderimgComponent, SnakeGameComponent, InicioMovilComponent, CommonModule],
  template: `
    <main class="color-general">
      <header class="brand-name">
        <section class="content"></section>
      </header>
      <section class="content">
        <!-- Mostrar SnakeGame o el componente simple según el dispositivo -->
        <app-snake-game *ngIf="!isMobile"></app-snake-game>
        <app-inicio-movil *ngIf="isMobile"></app-inicio-movil> <!-- Componente para móviles -->
      </section>
    </main>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isMobile: boolean = false; // Variable para controlar la vista

  ngOnInit(): void {
    // Detectar si el dispositivo es móvil
    const userAgent = window.navigator.userAgent;
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  }
}

