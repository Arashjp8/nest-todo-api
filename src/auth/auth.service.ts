import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(username: string, pass: string) {
        const user = await this.usersService.findOne(username);
        if (!user) {
            throw new NotFoundException(
                "User with this username does not exist.",
            );
        }

        if (user.password !== pass) {
            throw new UnauthorizedException("Password is bowlshit");
        }

        const payload = { sub: user.userId, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
