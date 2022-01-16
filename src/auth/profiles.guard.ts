import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class ProfilesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const userProfiles: object[] = request.user.profiles
        const requiredProfile = this.reflector.get<{ name: string }>(
            'profile',
            context.getHandler()
        )

        if (!requiredProfile) return true
        const result = userProfiles.find((profile: any) => profile.name === requiredProfile.name)
        return result !== undefined
    }
}