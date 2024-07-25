import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-image-gallery',
  templateUrl: './custom-image-gallery.component.html',
  styleUrl: './custom-image-gallery.component.css',
})
export class CustomImageGalleryComponent implements OnInit {
  currentImageIndex: number = 0;
  ngOnInit(): void {}

  constructor(
    public dialogRef: MatDialogRef<CustomImageGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
  }

  nextImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.data.images.length;
  }

  previousImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.data.images.length) %
      this.data.images.length;
  }
}

export interface DialogData {
  images: any[];
}
