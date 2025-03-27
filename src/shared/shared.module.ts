import { Global, Module } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtSecret } from './constants';


@Module({
    imports: [
        JwtModule.register({
            secret: jwtSecret,
            signOptions: { expiresIn: '1h' }, // e.g. 30s, 7d, 24h
        }),
    ],
    providers: [AuthGuard],
    exports: [AuthGuard, JwtModule]
})
export class SharedModule { }
