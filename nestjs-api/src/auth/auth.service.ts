import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

//substituir por uma tabela no banco de dados
//e criptografar a senha
const users = [
  {
    id: 1,
    username: 'john',
    password: 'john',
  },
  {
    id: 2,
    username: 'chris',
    password: 'chris',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = users.find(
      (user) => user.username === username && user.password === password,
    );

    console.log('user', user);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
