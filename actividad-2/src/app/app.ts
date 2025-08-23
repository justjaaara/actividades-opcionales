import { Component, inject, signal } from '@angular/core';
import { GameHeader } from './components/game-header/game-header';
import { PlayerCard } from './components/player-card/player-card';
import { GameControls } from './components/game-controls/game-controls';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  imports: [GameHeader, PlayerCard, GameControls],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  gameService = inject(GameService);
  protected readonly title = signal('juego-angular');
}
