import { Component} from '@angular/core';
import { FocusClassDirective } from '../directives/focus-class.directive';
import { VisibilityDirective } from '../directives/visibility.directive';  // Importa la directiva
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  imports: [FocusClassDirective, VisibilityDirective, MatIconModule],
  templateUrl: './sobre-mi.component.html',
  styleUrl: './sobre-mi.component.css'
})
export class SobreMiComponent{


}
