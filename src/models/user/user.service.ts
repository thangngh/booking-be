import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IBody, hashValue } from 'common/constants/setting';
import { IJwtPayload } from 'authentication/auth/interface/auth.interface';
import { UserRepository } from './user.repository';
import { IUpdateRT } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User) private readonly userRepository: Repository<User>
    private readonly userRepository: UserRepository
  ) { }

  async queryUsername(body: IBody) {
    const { username } = body;

    const query = await this.userRepository.queryUsername(username)

    return query;
  }

  async queryEmail(body: IBody) {
    const { email } = body;

    const query = await this.userRepository.queryEmail(email)

    return query;
  }

  async findUserById(id: string) {
    const query = await this.userRepository.findOne(id)
    return query;
  }

  async findUserWitJwt(payload: IJwtPayload) {
    const { id, username } = payload
    const query = await this.userRepository.queryUsernameAndId(username, id.toString())

    return query;
  }

  async profile(user: User) {
    const { id } = user;
    const query = await this.userRepository.findOne(id.toString())

    return query
  }

  async findOne(id: string) {
    const query = await this.userRepository.findOne(id)

    return query
  }

  async saveUser(user: User) {
    return await this.userRepository.registerUser(user)
  }

  async saveRefreshToken(id: number, body: IUpdateRT) {
    const { refreshToken } = body;

    const hash = await hashValue(refreshToken)

    return await this.userRepository.saveRefreshToken(id.toString(), hash)
  }


}