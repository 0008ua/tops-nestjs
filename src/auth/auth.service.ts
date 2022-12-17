import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from './user.model';
import { AuthDto } from './dto/auth.dto';
import { genSaltSync, hashSync, compare } from 'bcryptjs';
import { USER_NOT_FOUND, WRONG_PASSWORD } from './auth.constant';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = genSaltSync(10);
    const newUser = await new this.userModel({
      email: dto.login,
      passwordHash: hashSync(dto.password, salt),
    }).save();

    return newUser;
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }
    const isPasswordsMatch = await compare(password, user.passwordHash);

    if (!isPasswordsMatch) {
      throw new UnauthorizedException(WRONG_PASSWORD);
    }
    return { email };
  }

  async login(email: string) {
    const payload = { email };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
