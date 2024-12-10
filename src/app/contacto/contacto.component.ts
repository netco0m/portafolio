import { Component } from '@angular/core';
import { FocusClassDirective } from '../directives/focus-class.directive';
import { VisibilityDirective } from '../directives/visibility.directive';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { HttpClientModule } from '@angular/common/http';  // HttpClientModule


@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FocusClassDirective, VisibilityDirective, FormsModule, HttpClientModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  email: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    const payload = { email: this.email, message: this.message };
    this.http.post('http://localhost:3000/send-email', payload, { responseType: 'text' }).subscribe({
      next: (response) => {
        alert(response); // Mostrar la respuesta como texto
        this.email = ''; // Limpiar los campos después de enviar
        this.message = '';
      },
      error: (err) => {
        console.error('Error enviando el mensaje:', err);
        alert('Hubo un problema al enviar el mensaje.');
      },
    });
  }
}
