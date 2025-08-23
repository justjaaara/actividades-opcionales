import { Component, signal } from '@angular/core';

type BonificationType = {
  name: string;
  description: string;
  effect: 'heal' | 'critical' | 'shield';
};

type Bonnification = {
  active: boolean;
  type: BonificationType | null;
};

type ActiveEffect = {
  critical: boolean;
  shield: boolean;
};

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('juego-angular');

  playerOneHealth = signal(100);
  playerTwoHealth = signal(100);

  currentTurn = signal(1);
  isGameOver = signal(false);

  gameMessage = signal('');

  bonnifications = signal<Record<number, Bonnification>>({
    1: { active: false, type: null },
    2: { active: false, type: null },
  });

  bonificationsType: BonificationType[] = [
    {
      name: '❤️ Healing',
      description: 'Restores 30 HP',
      effect: 'heal',
    },
    {
      name: '⚡ Critical attack',
      description: 'Next attack produces +15 damage',
      effect: 'critical',
    },
    {
      name: '🛡️ Shield',
      description: 'Reduce next incoming damange to half',
      effect: 'shield',
    },
  ];

  activeEffects = signal<Record<number, ActiveEffect>>({
    1: { critical: false, shield: false },
    2: { critical: false, shield: false },
  });

  changeTurn() {
    this.currentTurn.set(this.currentTurn() === 1 ? 2 : 1);
  }

  finishGame(message: string) {
    this.isGameOver.set(true);
    this.gameMessage.set(message);
  }

  restartGame() {
    this.playerOneHealth.set(100);
    this.playerTwoHealth.set(100);

    this.currentTurn.set(1);
    this.isGameOver.set(false);

    this.bonnifications.set({
      1: { active: false, type: null },
      2: { active: false, type: null },
    });

    this.activeEffects.set({
      1: { critical: false, shield: false },
      2: { critical: false, shield: false },
    });

    this.gameMessage.set('');
  }

  attackPlayer(currentPlayer: number) {
    if (this.isGameOver()) return;

    if (currentPlayer !== this.currentTurn()) return;

    let damage = Math.floor(Math.random() * 16) + 10;

    if (this.activeEffects()[currentPlayer].critical) {
      damage += 15;
      this.activeEffects()[currentPlayer].critical = false;

      this.gameMessage.set(
        `Critical Attack! Player ${currentPlayer} inflicts ${damage} damage (+15 by critical)!`
      );
    } else {
      this.gameMessage.set(`Player ${currentPlayer} attacks and inflicts ${damage} damage!`);
    }

    if (currentPlayer === 1) {
      let finalDamage = damage;

      if (this.activeEffects()[2].shield) {
        finalDamage = Math.floor(damage / 2);
        this.activeEffects()[2].shield = false;
        this.gameMessage.set(
          `🛡️ Shield activated! Damage reduced from ${damage} a ${finalDamage}!`
        );
      }

      this.playerTwoHealth.update((currentHealth) => currentHealth - finalDamage);
      if (this.playerTwoHealth() < 0) {
        this.playerTwoHealth.set(0);
      }

      if (this.playerTwoHealth() <= 0) {
        this.finishGame('¡Player 1 wins!');
        return;
      }
    } else {
      let finalDamage = damage;

      if (this.activeEffects()[1].shield) {
        finalDamage = Math.floor(damage / 2);
        this.activeEffects()[1].shield = false;
        this.gameMessage.set(
          `🛡️ Shield activated! Damage reduced from ${damage} a ${finalDamage}!`
        );
      }

      this.playerOneHealth.update((currentHealth) => currentHealth - finalDamage);
      if (this.playerOneHealth() < 0) this.playerOneHealth.set(0);

      if (this.playerOneHealth() <= 0) {
        this.finishGame('¡Player 2 wins!');
        return;
      }
    }

    this.changeTurn();

    if (Math.random() < 0.2) {
      this.generateBonification(this.currentTurn());
    }
  }

  generateBonification(currentPlayer: number) {
    if (this.bonnifications()[currentPlayer].active) return;

    const randomType =
      this.bonificationsType[Math.floor(Math.random() * this.bonificationsType.length)];
    this.bonnifications()[currentPlayer] = { active: true, type: randomType };

    setTimeout(() => {
      this.gameMessage.set(`¡Jugador ${currentPlayer} obtuvo un comodín: ${randomType.name}!`);
    }, 500);
  }

  useBonification(currentPlayer: number) {
    if (!this.bonnifications()[currentPlayer].active || currentPlayer !== this.currentTurn())
      return;

    const bonification = this.bonnifications()[currentPlayer].type;

    switch (bonification?.effect) {
      case 'heal':
        if (currentPlayer === 1) {
          this.playerOneHealth.update((currentHealth) => Math.min(currentHealth + 30, 100));
        } else {
          this.playerTwoHealth.update((currentHealth) => Math.min(currentHealth + 30, 100));
        }
        this.gameMessage.set(`¡Jugador ${currentPlayer} se cura 30 HP!`);
        break;

      case 'critical':
        this.activeEffects()[currentPlayer].critical = true;
        this.gameMessage.set(
          `¡Jugador ${currentPlayer} carga un ataque crítico para su próximo turno!`
        );
        break;

      case 'shield':
        this.activeEffects()[currentPlayer].shield = true;
        this.gameMessage.set(`¡Jugador ${currentPlayer} activa un escudo protector!`);
        break;
    }

    this.bonnifications()[currentPlayer] = { active: false, type: null };
    setTimeout(() => {
      this.changeTurn();
    }, 1000);
  }
}
