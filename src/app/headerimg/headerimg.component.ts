import { Component, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SnakeGameComponent } from '../snake-game/snake-game.component';

@Component({
  selector: 'app-headerimg',
  standalone: true,
  imports: [MatCardModule ],
  templateUrl: './headerimg.component.html',
  styleUrl: './headerimg.component.css'
})
export class HeaderimgComponent {

}
