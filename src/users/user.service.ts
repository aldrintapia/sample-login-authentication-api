import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const isUserExist = await this.findByUsername(createUserDto.username);
      if (isUserExist) {
        throw new HttpException(
          'User not allowed, please try different one.',
          HttpStatus.CONFLICT,
        );
      }

      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
      const userData = plainToInstance(Users, createUserDto);
      return this.usersRepository.save(userData);
    } catch {
      throw new HttpException(
        'Something went wrong. Please try again!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  findByUsername(username: string) {
    return this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userData = plainToInstance(Users, updateUserDto);
      await this.usersRepository.update({ id: id }, userData);

      return {
        message: 'User successfully updated!',
      };
    } catch {
      throw {
        message: 'Something went wrong! Please try again.',
      };
    }
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    try {
      const isUserExist = await this.findOne(id);
      if (!isUserExist) {
        throw new HttpException(
          'User does not exist, please try different one.',
          HttpStatus.CONFLICT,
        );
      }
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(changePasswordDto.password, salt);
      const userData = plainToInstance(Users, { password });
      await this.usersRepository.update({ id: id }, userData);
      return {
        message: 'Password successfully change!',
      };
    } catch {
      throw {
        message: 'Something went wrong! Please try again.',
      };
    }
  }

  remove = async (id: string) => {
    try {
      const users = await this.usersRepository.find({ where: { id: id } });
      this.usersRepository.remove(users);

      if (users.length === 0) {
        throw {
          message: 'Something went wrong! Please try again.',
        };
      }

      return {
        message: 'User successfully deleted',
        id,
        username: users[0].username,
      };
    } catch {
      throw {
        message: 'Something went wrong! Please try again.',
      };
    }
  };
}
