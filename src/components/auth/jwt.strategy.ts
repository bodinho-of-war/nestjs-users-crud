import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UserRepositoryInterface } from "../user/interface/user.repository.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('UserRepositoryInterface')
        private userRepository: UserRepositoryInterface
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: { id: number }) {
        const { id } = payload

        const user = await this.userRepository.findOneById(id)

        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado')
        }

        return user
    }
}