import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  isMenuOpen = false;
  isFavorite = false;  // Estado del botón de favorito (corazón)

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menu = document.querySelector('.menu-items');
    if (menu) {
      if (this.isMenuOpen) {
        menu.classList.add('show');
      } else {
        menu.classList.remove('show');
      }
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Método para alternar el estado del favorito
  toggleFavorite() {
    this.isFavorite = !this.isFavorite; // Cambiar el estado del favorito
    console.log(this.isFavorite ? 'Favorito añadido' : 'Favorito eliminado');
  }

  // Método para compartir la URL actual
  share() {
    if (navigator.share) {
      navigator.share({
        title: 'Mi Portafolio',
        text: '¡Echa un vistazo a mi portafolio! Nick Toledo',
        url: window.location.href
      }).then(() => {
        console.log('Contenido compartido exitosamente');
      }).catch((error) => {
        console.error('Error al compartir:', error);
      });
    } else if (navigator.clipboard) {
      // Copiar al portapapeles si la API de compartir no está disponible
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          console.log('URL copiada al portapapeles');
          alert('¡Enlace copiado al portapapeles!');
        })
        .catch((error) => {
          console.error('Error al copiar al portapapeles:', error);
          alert('Error al copiar el enlace. Intenta nuevamente.');
        });
    } else {
      // Última opción: indicar al usuario que copie manualmente
      console.log('Ni la API de compartir ni el portapapeles están disponibles.');
      alert('Tu navegador no admite compartir ni copiar automáticamente. Por favor, copia el enlace manualmente: ' + window.location.href);
    }
  }

}
