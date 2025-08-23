import { Component, inject, input } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-player-card',
  imports: [],
  templateUrl: './player-card.html',
  styleUrl: './player-card.css',
})
export class PlayerCard {
  playerId = input.required<1 | 2>();
  gameService = inject(GameService);

  health = () => {
    return this.playerId() === 1
      ? this.gameService.playerOneHealth()
      : this.gameService.playerTwoHealth();
  };

  bonification = () => {
    return this.gameService.bonnifications()[this.playerId()];
  };

  onAttack() {
    this.gameService.attackPlayer(this.playerId());
  }

  onUseBonification() {
    this.gameService.useBonification(this.playerId());
  }
}
