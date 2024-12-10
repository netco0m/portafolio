import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { ToolbarComponent} from './toolbar/toolbar.component';
//import { SnakeGameComponent } from './snake-game/snake-game.component'; // Importar el componente del juego

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, ToolbarComponent],
  template: `
    <main class="color-general">
      <header class="brand-name">
      <app-toolbar></app-toolbar>
      </header>
      <section class="content color-general">
        <router-outlet>
          </router-outlet>  <!-- Aquí se cargan los componentes según la ruta activa -->
      </section>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Nick';
}
