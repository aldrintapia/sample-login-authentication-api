import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response-user..dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): ResponseUserDto {
    const response = this.userService.create(createUserDto);
    return plainToInstance(ResponseUserDto, response);
  }

  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    const response = await this.userService.findAll();
    return plainToInstance(ResponseUserDto, response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    const response = await this.userService.findOne(id);
    return plainToInstance(ResponseUserDto, response);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const response = await this.userService.update(id, updateUserDto);
    return plainToInstance(ResponseUserDto, response);
  }

  @Patch(':id/change-password')
  async changePassword(
    @Param('id') id: string,
    @Body() changePassword: ChangePasswordDto,
  ): Promise<ResponseUserDto> {
    const response = await this.userService.changePassword(id, changePassword);
    return plainToInstance(ResponseUserDto, response);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
