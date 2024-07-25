import { Observable } from 'rxjs';
import { User } from './user';

export class Program {
  id: number;
  title: string;
  description: string;
  price: number;
  difficultyLevel: DifficultyLevel;
  duration: number;
  location: Location;
  instructorName: string;
  instructorContact: string;
  videoUrl: string;
  category: string;
  userCreator: User;
  images: string[];
  completed: boolean;

  constructor(
    id: number,
    title: string,
    description: string,
    price: number,
    difficultyLevel: DifficultyLevel,
    duration: number,
    location: Location,
    instructorName: string,
    instructorContact: string,
    videoUrl: string,
    category: string,
    userCreator: User,
    images: string[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.difficultyLevel = difficultyLevel;
    this.duration = duration;
    this.location = location;
    this.instructorName = instructorName;
    this.instructorContact = instructorContact;
    this.videoUrl = videoUrl;
    this.category = category;
    this.userCreator = userCreator;
    this.images = images;
    this.completed = false;
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
