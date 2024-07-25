export class MessageRequest {
  content: string;
  userId: number;

  constructor(content: string, userId: number) {
    this.content = content;
    this.userId = userId;
  }
}
