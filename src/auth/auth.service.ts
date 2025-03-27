import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthEntity } from './entity/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }
    async register(registerDto: RegisterDto): Promise<AuthEntity> {
        const { email, password } = registerDto;
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            throw new UnauthorizedException('email уже занят или не найден');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await this.usersService.create({ email, password: hashedPassword })
        return {
            accessToken: this.jwtService.sign({ userId: createdUser.id }),
        };
    }

    async login(loginDto: LoginDto): Promise<AuthEntity> {
        const { email, password } = loginDto /* почитать Rest Operator and Spread Operator */
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        return {
            accessToken: this.jwtService.sign({ userId: user.id }),
        };
    }
}



