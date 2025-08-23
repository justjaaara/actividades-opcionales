import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-controls',
  imports: [],
  templateUrl: './game-controls.html',
  styleUrl: './game-controls.css',
})
export class GameControls {
  gameService = inject(GameService);
}
