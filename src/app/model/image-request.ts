export class ImageRequest {
  imageUrl: string;
  programId: number;

  constructor(imageUrl: string, programId: number) {
    this.imageUrl = imageUrl;
    this.programId = programId;
  }
}
