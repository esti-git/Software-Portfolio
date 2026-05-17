export class Customers {
  customerId: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;

  constructor(
    customerId: number,
    username: string,
    email: string,
    password: string,
    createdAt: string
  ) {
    this.customerId = customerId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }

}
