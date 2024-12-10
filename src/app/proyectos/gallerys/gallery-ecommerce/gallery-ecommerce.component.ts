import { Component,OnInit, ViewChild } from '@angular/core';
import { Gallery, GalleryRef,GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';


@Component({
  selector: 'app-gallery-ecommerce',
  standalone: true,
  imports: [GalleryModule],
  templateUrl: './gallery-ecommerce.component.html',
  styleUrl: './gallery-ecommerce.component.css'
})
export class GalleryEcommerceComponent implements OnInit {
  imagesEcommer : GalleryItem[] = []; // Inicializamos la propiedad
  private ecommerceGalleryRef: GalleryRef;
  constructor(private gallery: Gallery) {
    // Crear una referencia única para esta galería
    this.ecommerceGalleryRef = this.gallery.ref('ecommerceGallery');
  }

  ngOnInit() {
    this.imagesEcommer = [
      new ImageItem({ src: 'assets/images/projects/ecomerce/01.png', thumb: 'assets/images/projects/ecomerce/01.png' }),
      new ImageItem({ src: 'assets/images/projects/ecomerce/02.png', thumb: 'assets/images/projects/ecomerce/02.png' }),
      new ImageItem({ src: 'assets/images/projects/ecomerce/03.png', thumb: 'assets/images/projects/ecomerce/03.png' }),
      new ImageItem({ src: 'assets/images/projects/ecomerce/04.png', thumb: 'assets/images/projects/ecomerce/04.png' }),
      new ImageItem({ src: 'assets/images/projects/ecomerce/05.png', thumb: 'assets/images/projects/ecomerce/05.png' }),
      new ImageItem({ src: 'assets/images/projects/ecomerce/06.png', thumb: 'assets/images/projects/ecomerce/06.png' }),
      new ImageItem({ src: 'assets/images/projects/ecomerce/07.png', thumb: 'assets/images/projects/ecomerce/07.png' }),
      new ImageItem({ src: 'assets/images/projects/ecomerce/08.png', thumb: 'assets/images/projects/ecomerce/08.png' }),
      new ImageItem({ src: 'assets/images/projects/ecomerce/09.png', thumb: 'assets/images/projects/ecomerce/09.png' }),
      new ImageItem({ src: 'assets/images/projects/ecomerce/10.png', thumb: 'assets/images/projects/ecomerce/10.png' }),
      new ImageItem({ src: 'assets/images/projects/ecomerce/11.png', thumb: 'assets/images/projects/ecomerce/11.png' }),
    ];
    // Configurar la galería con las imágenes
    this.ecommerceGalleryRef.load(this.imagesEcommer);
  }
}
