export class UserHasProgramRequest {
  userId: number;
  programId: number;

  constructor(userId: number, programId: number) {
    this.userId = userId;
    this.programId = programId;
  }
}
