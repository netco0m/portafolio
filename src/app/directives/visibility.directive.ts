import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appVisibility]',
  standalone: true,
})
export class VisibilityDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])  // Asegúrate de estar escuchando el evento de scroll en la ventana
  onScroll() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Si el elemento está visible en la ventana, aplicamos la clase 'visible'
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      //this.renderer.addClass(this.el.nativeElement, 'visible'); //se agrega clase solo cuando quiero agregar ademas estilos de clases en el css del mismo componente
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.el.nativeElement, 'transition', '1.5s ease');
    } else {
      //this.renderer.removeClass(this.el.nativeElement, 'visible');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
      this.renderer.setStyle(this.el.nativeElement, 'transition', '1.5s ease');
    }
  }
  /*
  agregar a los componentes el siguiente css
  .column {

  transition: opacity 1s ease;

}

.visible {
  transition: opacity 1s ease;
}
  */
}
