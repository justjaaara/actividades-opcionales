import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-header',
  imports: [],
  templateUrl: './game-header.html',
  styleUrl: './game-header.css',
})
export class GameHeader {
  gameService = inject(GameService);
}
