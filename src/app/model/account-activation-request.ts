export class AccountActivationRequest {
  username: string;
  pin: string;

  constructor(username: string, pin: string) {
    this.username = username;
    this.pin = pin;
  }
}
