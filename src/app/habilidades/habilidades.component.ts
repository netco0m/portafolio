import { Component } from '@angular/core';

import { FocusClassDirective } from '../directives/focus-class.directive';
import { VisibilityDirective } from '../directives/visibility.directive';  // Importa la directiva
import {MatIconModule} from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-habilidades',
  standalone: true,
  imports: [FocusClassDirective, VisibilityDirective, MatIconModule,MatProgressBarModule],
  templateUrl: './habilidades.component.html',
  styleUrl: './habilidades.component.css'
})
export class HabilidadesComponent {

}
