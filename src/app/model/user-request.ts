export class UserRequest {
  firstName: string;
  lastName: string;
  city: string;
  avatarUrl: string;
  mail: string;
  constructor(
    firstName: string,
    lastName: string,
    city: string,
    avatarUrl: string,
    mail: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.avatarUrl = avatarUrl;
    this.mail = mail;
  }
}
