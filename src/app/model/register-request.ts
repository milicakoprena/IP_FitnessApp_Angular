export class RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  mail: string;
  city: string;
  avatarUrl: string;

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    mail: string,
    city: string,
    avatarUrl: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.mail = mail;
    this.city = city;
    this.avatarUrl = avatarUrl;
  }
}
