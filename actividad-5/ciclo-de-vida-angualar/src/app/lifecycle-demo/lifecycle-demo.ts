import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  SimpleChanges,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lifecycle-demo.html',
  styleUrl: './lifecycle-demo.css',
})
export class LifecycleDemoComponent
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  @Input() name: string = '';
  @Input() externalCounter: number = 0;
  @ViewChild('viewChild', { static: false }) viewChild!: ElementRef;

  counter = 0;
  logCount = 0;
  elementId = Math.random().toString(36);

  constructor() {
    this.log('Constructor - Componente creado');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.log('ngOnChanges - Propiedades cambiaron', changes);
    for (const propName in changes) {
      const change = changes[propName];
      const current = JSON.stringify(change.currentValue);
      const previous = JSON.stringify(change.previousValue);
      console.log(`  ${propName}: ${previous} → ${current}`);
    }
  }

  ngOnInit(): void {
    this.log('ngOnInit - Componente inicializado');
  }

  ngDoCheck(): void {
    this.log('ngDoCheck - Detección de cambios ejecutada');
  }

  ngAfterContentInit(): void {
    this.log('ngAfterContentInit - Contenido proyectado inicializado');
  }

  ngAfterContentChecked(): void {
    this.log('ngAfterContentChecked - Contenido proyectado verificado');
  }

  ngAfterViewInit(): void {
    this.log('ngAfterViewInit - Vista inicializada');
    console.log('ViewChild disponible:', this.viewChild);
  }

  ngAfterViewChecked(): void {
    this.log('ngAfterViewChecked - Vista verificada');
  }

  ngOnDestroy(): void {
    this.log('ngOnDestroy - Componente destruido');
  }

  incrementCounter(): void {
    this.counter++;
    console.log('Contador incrementado a:', this.counter);
  }

  private log(message: string, data?: any): void {
    this.logCount++;
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`, data || '');
  }
}
