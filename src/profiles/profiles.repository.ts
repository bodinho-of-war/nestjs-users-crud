import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { ProfileEntity } from "./profile.entity";

@EntityRepository(ProfileEntity)
export class ProfilesRepository extends Repository<ProfileEntity> {

    async createProfile(createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
        const found = await this.find({ name: createProfileDto.name })
        if (found.length > 0) throw new ConflictException('Perfil já existente')

        try {
            const profile = await this.create()
            profile.name = createProfileDto.name
            await profile.save()
            return profile
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException('Perfil já existente');
            } else {
                throw new InternalServerErrorException(
                    'Erro ao salvar o usuário no banco de dados',
                );
            }
        }
    }
}