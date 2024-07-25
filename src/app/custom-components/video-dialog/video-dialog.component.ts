import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.css'],
})
export class VideoDialogComponent implements OnInit {
  sanitizedVideoUrl: SafeResourceUrl;

  constructor(
    public dialogRef: MatDialogRef<VideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sanitizer: DomSanitizer
  ) {
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
    this.sanitizedVideoUrl = this.sanitizeUrl(this.data.videoUrl);
  }

  ngOnInit(): void {}

  sanitizeUrl(videoUrl: string): SafeResourceUrl {
    const youtubeUrl = this.formatYoutubeUrl(videoUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
  }

  formatYoutubeUrl(videoUrl: string): string {
    const videoId = this.extractVideoId(videoUrl);
    return `https://www.youtube.com/embed/${videoId}`;
  }

  extractVideoId(url: string): string {
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  }
}

export interface DialogData {
  videoUrl: string;
}
