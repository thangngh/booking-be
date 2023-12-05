import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { IBody, hashValue } from 'common/constants/setting';
import { IJwtPayload } from 'authentication/auth/interface/auth.interface';
import { UserRepository } from './user.repository';
import { IUpdateRT } from './user.interface';
import { PaginationDTO } from 'common/pagination/dto/paginationQuery-dto';
import { Pagination } from 'common/pagination';
import { CreatePatientRegisterDto } from './dto/create-patient_register.dto';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User) private readonly userRepository: Repository<User>
    private readonly userRepository: UserRepository,
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

  async getAllDoctor(query: PaginationDTO): Promise<Pagination<User>> {

    const DEFAULT_LIMIT = 10;
    const DEFAULT_PAGE = 1;

    const { limit = DEFAULT_LIMIT, page = DEFAULT_PAGE } = query;

    const { results, total } = await this.userRepository.findDoctor(limit, page);

    return new Pagination<User>({
      results: results,
      total,
    });
  }

  async getUserRole(user: User) {
    const { id } = user;

    return await this.userRepository.getUserRole(id)
  }

  async updatePassword(user: User, body: IBody) {
    const { id } = user
    const { password } = body;

    const query = await this.userRepository.updatePassword(id, password)

    const resultUser = query && await this.findUserById(id.toString())

    return resultUser;
  }

  async uploadAvatar(user: User, file: Array<Express.Multer.File>) {
    const { id } = user;
    const avatarPath = file.join("");

    const findUser = await this.findUserById(id.toString())

    if (findUser?.length === 0) {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
    }

    const updateUser = await this.userRepository.updateField(findUser[0]?.id, "avatar", avatarPath)

    const resultUser = updateUser && await this.findUserById(id.toString())

    return {
      status: "Upload avatar success!",
      data: resultUser
    }
  }

  async createPatient(user: User, body: CreatePatientRegisterDto) {
    const query = await this.userRepository.createPatient(user.id, body.symptom, body.insurance)

    return query && await this.findUserById(user.id.toString())
  }

}
