export class FitnessTrackerRequest {
  exerciseType: ExerciseType;
  intensity: Intensity;
  weight: number;
  duration: number;
  userId: number;

  constructor(
    exerciseType: ExerciseType,
    intensity: Intensity,
    weight: number,
    duration: number,
    userId: number
  ) {
    this.exerciseType = exerciseType;
    this.intensity = intensity;
    this.weight = weight;
    this.duration = duration;
    this.userId = userId;
  }
}

export enum ExerciseType {
  CARDIO,
  STRENGTH,
  HIIT,
}
export enum Intensity {
  LOW,
  MODERATE,
  HIGH,
  INTENSE,
}
