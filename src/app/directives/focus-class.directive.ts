import { Directive, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appFocusClass]',
  standalone: true, // Hacer la directiva standalone
})
export class FocusClassDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Aplicar estilos predeterminados al elemento al inicio
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
  }

  @HostListener('focus') onFocus() {
    // Estilo aplicado cuando el elemento recibe el foco
    this.renderer.addClass(this.el.nativeElement, 'focused');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f0f8ff');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.05)');
    this.renderer.setStyle(this.el.nativeElement, 'border-color', '#0078d7');
  }

  @HostListener('blur') onBlur() {
    // Eliminar estilos al perder el foco
    this.renderer.removeClass(this.el.nativeElement, 'focused');
    this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
    this.renderer.removeStyle(this.el.nativeElement, 'border-color');
  }
}
