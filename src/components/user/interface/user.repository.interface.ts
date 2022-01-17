import { BaseInterfaceRepository } from "../../../repositories/base/base.interface.repository";
import { UserEntity } from "../entity/user.entity";

export interface UserRepositoryInterface extends BaseInterfaceRepository<UserEntity> { }