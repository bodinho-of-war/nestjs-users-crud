import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ProfileEntity } from "../profile/entity/profile.entity";
import { UserRepositoryInterface } from "../user/interface/user.repository.interface";

@Injectable()
export class ProfilesGuard implements CanActivate {
    constructor(
        @Inject('UserRepositoryInterface')
        private readonly userRepo: UserRepositoryInterface,
        private readonly reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        return this.userRepo.findWithRelations({
            relations: ['profiles'],
            where: { id: request.user.id }
        }).then(res => {
            const userProfiles: ProfileEntity[] = res[0].profiles
            const requiredProfile = this.reflector.get<{ name: string }>(
                'profile',
                context.getHandler()
            )
            if (!requiredProfile) return true
            const result = userProfiles.find((profile: ProfileEntity) => profile.name === requiredProfile.name)
            return result !== undefined
        })
    }
}