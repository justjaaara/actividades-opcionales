# 🔬 Demostración del Ciclo de Vida de Angular

Esta aplicación demuestra de manera interactiva todos los hooks del ciclo de vida de Angular.

## 🚀 Cómo usar la demostración

### 1. Ejecutar la aplicación

```bash
npm start
# o
pnpm start
```

### 2. Abrir las herramientas de desarrollador

- Presiona **F12** o **Ctrl+Shift+I** (Windows/Linux) / **Cmd+Option+I** (Mac)
- Ve a la pestaña **Console**

### 3. Observar los logs del ciclo de vida

En la consola verás logs detallados con timestamps que muestran cuándo se ejecuta cada hook:

- 🏗️ **Constructor** - Cuando se crea el componente
- 🔄 **ngOnChanges** - Cuando cambian las propiedades @Input
- 🚀 **ngOnInit** - Después de la inicialización
- 🔍 **ngDoCheck** - En cada ciclo de detección de cambios
- 📦 **ngAfterContentInit** - Después de inicializar el contenido proyectado
- ✅ **ngAfterContentChecked** - Después de verificar el contenido
- 👁️ **ngAfterViewInit** - Después de inicializar la vista
- 🔎 **ngAfterViewChecked** - Después de verificar la vista
- 💀 **ngOnDestroy** - Cuando se destruye el componente

## 🎮 Interacciones disponibles

### Cambiar nombre (ngOnChanges)

- Escribe en el campo "Cambiar nombre del componente"
- Observa cómo se dispara `ngOnChanges` con los valores anterior y actual

### Incrementar contador (ngDoCheck)

- Haz clic en "Incrementar Contador" dentro del componente hijo
- Observa cómo se dispara `ngDoCheck` en cada cambio

### Destruir y recrear componente

- Haz clic en "🗑️ Destruir Componente" para ver `ngOnDestroy`
- Haz clic en "🔄 Recrear Componente" para ver todo el ciclo desde el inicio

### Limpiar consola

- Usa "🧹 Limpiar Consola" para tener una vista más clara de los nuevos logs

## 📋 Orden de ejecución esperado

### Al cargar la página:

1. Constructor
2. ngOnChanges (si hay propiedades @Input)
3. ngOnInit
4. ngDoCheck
5. ngAfterContentInit
6. ngAfterContentChecked
7. ngAfterViewInit
8. ngAfterViewChecked

### Durante la interacción:

- **Cambio de propiedades**: ngOnChanges → ngDoCheck → ngAfterContentChecked → ngAfterViewChecked
- **Acciones del usuario**: ngDoCheck → ngAfterContentChecked → ngAfterViewChecked
- **Destrucción**: ngOnDestroy

## 🏗️ Estructura del proyecto

```
src/app/
├── lifecycle-demo/
│   └── lifecycle-demo.component.ts    # Componente que implementa todos los hooks
├── lifecycle-parent/
│   └── lifecycle-parent.component.ts  # Componente padre para controlar las interacciones
├── app.ts                            # Componente principal
└── app.html                          # Template principal
```

## 📚 Hooks implementados

### OnChanges

```typescript
ngOnChanges(changes: SimpleChanges): void {
  // Se ejecuta cuando cambian las propiedades @Input
  // Recibe un objeto con los cambios anteriores y actuales
}
```

### OnInit

```typescript
ngOnInit(): void {
  // Se ejecuta una vez después de la inicialización
  // Ideal para lógica de setup inicial
}
```

### DoCheck

```typescript
ngDoCheck(): void {
  // Se ejecuta en cada ciclo de detección de cambios
  // Útil para detectar cambios personalizados
}
```

### AfterContentInit

```typescript
ngAfterContentInit(): void {
  // Se ejecuta después de proyectar contenido externo
  // Solo una vez
}
```

### AfterContentChecked

```typescript
ngAfterContentChecked(): void {
  // Se ejecuta después de verificar el contenido proyectado
  // En cada ciclo de detección
}
```

### AfterViewInit

```typescript
ngAfterViewInit(): void {
  // Se ejecuta después de inicializar las vistas
  // Momento seguro para acceder al DOM
}
```

### AfterViewChecked

```typescript
ngAfterViewChecked(): void {
  // Se ejecuta después de verificar las vistas
  // En cada ciclo de detección
}
```

### OnDestroy

```typescript
ngOnDestroy(): void {
  // Se ejecuta antes de destruir el componente
  // Ideal para limpieza (unsubscribe, clearTimeout, etc.)
}
```

## 💡 Consejos

1. **Observa la consola**: Todos los hooks están loggeados con timestamps para entender el flujo
2. **Experimenta**: Cambia el nombre, incrementa el contador, destruye y recrea el componente
3. **Entiende el orden**: Los hooks tienen un orden específico de ejecución
4. **Usa ngOnInit**: Prefiere `ngOnInit` sobre el constructor para lógica de inicialización
5. **Limpia en ngOnDestroy**: Siempre limpia suscripciones y recursos en este hook

## 🔗 Recursos adicionales

- [Documentación oficial de Angular - Lifecycle Hooks](https://angular.dev/guide/components/lifecycle)
- [Angular University - Lifecycle Hooks](https://blog.angular-university.io/angular-2-lifecycle-hooks/)
