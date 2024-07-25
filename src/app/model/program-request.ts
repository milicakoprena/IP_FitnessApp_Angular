import { ImageRequest } from './image-request';

export class ProgramRequest {
  title: string;
  description: string;
  price: number;
  difficultyLevel: DifficultyLevel;
  duration: number;
  location: Location;
  instructorName: string;
  instructorContact: string;
  videoUrl: string;
  categoryId: number;
  userCreatorId: number;
  images: ImageRequest[];

  constructor(
    title: string,
    description: string,
    price: number,
    difficultyLevel: DifficultyLevel,
    duration: number,
    location: Location,
    instructorName: string,
    instructorContact: string,
    videoUrl: string,
    categoryId: number,
    userCreatorId: number,
    images: ImageRequest[]
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.difficultyLevel = difficultyLevel;
    this.duration = duration;
    this.location = location;
    this.instructorName = instructorName;
    this.instructorContact = instructorContact;
    this.videoUrl = videoUrl;
    this.categoryId = categoryId;
    this.userCreatorId = userCreatorId;
    this.images = images;
  }
}

enum DifficultyLevel {
  BEGINNER,
  INTERMEDIATE,
  ADVANCED,
}
enum Location {
  ONLINE,
  GYM,
  PARK,
}
