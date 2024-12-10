import { Component } from '@angular/core';
import { FocusClassDirective } from '../directives/focus-class.directive';
import { VisibilityDirective } from '../directives/visibility.directive';

@Component({
  selector: 'app-inicio-movil',
  standalone: true,
  imports: [FocusClassDirective, VisibilityDirective],
  templateUrl: './inicio-movil.component.html',
  styleUrl: './inicio-movil.component.css'
})
export class InicioMovilComponent {

}
