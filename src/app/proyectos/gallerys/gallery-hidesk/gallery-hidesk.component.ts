import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef,GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-gallery-hidesk',
  standalone: true,
  imports: [GalleryModule],
  templateUrl: './gallery-hidesk.component.html',
  styleUrl: './gallery-hidesk.component.css'
})
export class GalleryHideskComponent implements OnInit {
  imagesHidesk !: GalleryItem[]; // Inicializamos la propiedad

  private hideskGalleryRef: GalleryRef;

  constructor(private gallery: Gallery) {
    // Crear una referencia única para esta galería
    this.hideskGalleryRef = this.gallery.ref('hideskGallery');
  }


  ngOnInit() {
    this.imagesHidesk = [
      new ImageItem({ src: 'assets/images/projects/hidesk/01.png', thumb: 'assets/images/projects/hidesk/01.png' }),
      new ImageItem({ src: 'assets/images/projects/hidesk/02.png', thumb: 'assets/images/projects/hidesk/02.png' }),
      new ImageItem({ src: 'assets/images/projects/hidesk/03.png', thumb: 'assets/images/projects/hidesk/03.png' }),
      new ImageItem({ src: 'assets/images/projects/hidesk/04.png', thumb: 'assets/images/projects/hidesk/04.png' }),
    ];

    // Configurar la galería con las imágenes
    this.hideskGalleryRef.load(this.imagesHidesk);
  }
}
