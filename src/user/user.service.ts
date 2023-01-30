import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'Hlib_D',
      password: 'redvike_1',
    },
    {
      userId: 2,
      username: 'Dariusz_D',
      password: 'redvike_2',
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
