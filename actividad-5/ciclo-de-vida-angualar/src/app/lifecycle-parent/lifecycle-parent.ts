import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LifecycleDemoComponent } from '../lifecycle-demo/lifecycle-demo';

@Component({
  selector: 'app-lifecycle-parent',
  standalone: true,
  imports: [CommonModule, LifecycleDemoComponent, FormsModule],
  templateUrl: './lifecycle-parent.html',
  styleUrl: './lifecycle-parent.css',
})
export class LifecycleParentComponent {
  // Control de pasos
  currentStep = 0;
  showComponent = false;

  // Datos del componente
  componentName = '';
  tempName = '';
  inputValue = '';
  counter = 0;
  timestamp = new Date().toLocaleTimeString();

  // Fases del ciclo de vida
  phaseSteps = [
    { name: 'No iniciado', description: 'Listo para crear el componente' },
    { name: 'Constructor', description: 'Componente creado, ejecutando constructor' },
    { name: 'ngOnChanges', description: 'Esperando cambios en propiedades @Input' },
    { name: 'ngOnInit', description: 'Listo para inicializar el componente' },
    { name: 'ngDoCheck', description: 'Detectando cambios personalizados' },
    { name: 'ngAfterContentInit', description: 'Contenido proyectado listo' },
    { name: 'ngAfterContentChecked', description: 'Verificando contenido proyectado' },
    { name: 'ngAfterViewInit', description: 'Vista del componente lista' },
    { name: 'ngAfterViewChecked', description: 'Verificando vista del componente' },
  ];

  constructor() {
    console.log('Demostración del Ciclo de Vida Angular iniciada');
    console.log('Abre la consola para ver los logs detallados de cada fase');
  }

  // Métodos para obtener información
  getCurrentPhaseDescription(): string {
    return this.phaseSteps[this.currentStep]?.description || 'Demostración completada';
  }

  getPhaseSteps() {
    return this.phaseSteps;
  }

  getProjectedContent(): string {
    return `Contenido proyectado desde el padre - ${this.timestamp}`;
  }

  // Paso 0: Crear componente
  createComponent(): void {
    console.log('PASO 1: Creando componente - Constructor ejecutado');
    this.showComponent = true;
    this.componentName = 'Mi Componente';
    this.currentStep = 1;
    this.timestamp = new Date().toLocaleTimeString();
  }

  // Paso 1: ngOnChanges
  triggerOnChanges(): void {
    if (this.tempName.trim()) {
      console.log('PASO 2: Ejecutando ngOnChanges');
      console.log(`   Cambio detectado: "${this.componentName}" → "${this.tempName}"`);
      this.componentName = this.tempName;
      this.inputValue = this.tempName; // También actualizar inputValue
      this.currentStep = 2;
    } else {
      alert('Por favor escribe un nombre para ver el cambio');
    }
  }

  // Paso 2: ngOnInit
  triggerOnInit(): void {
    console.log('PASO 3: Ejecutando ngOnInit');
    console.log('   Componente inicializado - Este hook solo se ejecuta una vez');
    this.currentStep = 3;
  }

  // Paso 3: ngDoCheck
  triggerDoCheck(): void {
    console.log('PASO 4: Ejecutando ngDoCheck');
    console.log('   Detección de cambios ejecutada');
    // No avanzamos automáticamente, permitimos múltiples ejecuciones
  }

  incrementCounter(): void {
    this.counter++;
    console.log(`Contador incrementado a: ${this.counter}`);
    console.log('ngDoCheck se ejecutaría nuevamente por este cambio');
  }

  // Paso 4: ngAfterContentInit
  triggerAfterContentInit(): void {
    console.log('PASO 5: Ejecutando ngAfterContentInit');
    console.log('   Contenido proyectado inicializado');
    this.currentStep = 5;
  }

  // Paso 5: ngAfterContentChecked
  triggerAfterContentChecked(): void {
    console.log('PASO 6: Ejecutando ngAfterContentChecked');
    console.log('   Contenido proyectado verificado');
    // No avanzamos automáticamente
  }

  // Paso 6: ngAfterViewInit
  triggerAfterViewInit(): void {
    console.log('PASO 7: Ejecutando ngAfterViewInit');
    console.log('   Vista del componente inicializada - ViewChild disponible');
    this.currentStep = 7;
  }

  // Paso 7: ngAfterViewChecked
  triggerAfterViewChecked(): void {
    console.log('PASO 8: Ejecutando ngAfterViewChecked');
    console.log('   Vista del componente verificada');
    // No avanzamos automáticamente
  }

  // Navegación
  nextStep(): void {
    if (this.currentStep < 8) {
      this.currentStep++;
    }
  }

  // Destruir componente
  destroyComponent(): void {
    console.log('FASE FINAL: Ejecutando ngOnDestroy');
    console.log('   Componente destruido - Limpieza de recursos');
    this.showComponent = false;
    this.currentStep = 8;
  }

  // Reiniciar demostración
  resetDemo(): void {
    console.clear();
    console.log('Demostración reiniciada');
    this.currentStep = 0;
    this.showComponent = false;
    this.componentName = '';
    this.tempName = '';
    this.counter = 0;
    this.timestamp = new Date().toLocaleTimeString();
  }

  // Utilidades
  clearConsole(): void {
    console.clear();
    console.log('Consola limpiada');
    console.log(`Estado actual: Fase ${this.currentStep} - ${this.getCurrentPhaseDescription()}`);
  }
}
