import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { AuthEntity } from './entity/auth.entity';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }


    @Post('register')
    @ApiResponse({ type: AuthEntity, status: 201 })
    async register(@Body() registerDto: RegisterDto): Promise<AuthEntity> {
        return this.authService.register(registerDto)
    }
    @Post('login')
    @ApiResponse({ type: AuthEntity, status: 201 })
    async login(@Body() loginDto: LoginDto): Promise<AuthEntity> {
        return this.authService.login(loginDto)
    }
}
