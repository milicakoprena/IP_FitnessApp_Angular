export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  city: string;
  avatarUrl: string;
  mail: string;
  status: UserStatus;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    city: string,
    avatarUrl: string,
    mail: string,
    status: UserStatus
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.city = city;
    this.avatarUrl = avatarUrl;
    this.mail = mail;
    this.status = status;
  }
}

enum UserStatus {
  REQUESTED,
  ACTIVE,
  INACTIVE,
}
