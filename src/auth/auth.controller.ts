import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { ResponseLoginDto } from './dto/response-login.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ProfileDto } from './dto/profile.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async signIn(@Body() signInDto: LoginDto): Promise<ResponseLoginDto> {
    const response = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return plainToInstance(ResponseLoginDto, response);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): ProfileDto {
    return plainToInstance(ProfileDto, req.user);
  }
}
