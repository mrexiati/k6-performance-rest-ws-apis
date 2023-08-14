import * as faker from "faker";

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class UserGenerator {
  private static randomEmail(): string {
    const randomWord = faker.random.word();
    const randUUID = faker.datatype.uuid();
    const timestamp = new Date().getTime();
    const randomWordTwo = faker.random.word();

    return `${__VU}${randomWord}${randUUID}${timestamp}@${randomWordTwo}.com`;
  }

  private static randomUsername(): string {
    const randomWord = faker.random.word();
    const randomWordTwo = faker.random.word();
    const randUUID = faker.datatype.uuid();
    const timestamp = new Date().getTime();

    return `${__VU}${randomWord}${randUUID}${timestamp}${randomWordTwo}`;
  }

  private static randomPassword(passLength: number = 8): string {
    return faker.random.alphaNumeric(passLength);
  }

  public static generateAUser(): User {
    return {
      username: this.randomUsername(),
      first_name: faker.random.word(),
      last_name: faker.random.word(),
      email: this.randomEmail(),
      password: this.randomPassword(),
    };
  }
}
