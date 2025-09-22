import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LifecycleParentComponent } from './lifecycle-parent/lifecycle-parent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LifecycleParentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ciclo-de-vida-angualar');
}
