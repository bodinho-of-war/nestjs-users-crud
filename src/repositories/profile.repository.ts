import { BaseAbstractRepository } from './base/base.abstract.repository';
import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from '../components/profile/entity/profile.entity';
import { ProfileRepositoryInterface } from '../components/profile/interface/profile.repository.interface';

@Injectable()
export class ProfileRepository extends BaseAbstractRepository<ProfileEntity> implements ProfileRepositoryInterface {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>
    ) {
        super(profileRepository)
    }

    async create(profile: ProfileEntity): Promise<ProfileEntity> {
        try {
            const createdProfile = await super.create(profile)
            return createdProfile
        } catch (error) {
            Logger.error(error)
            if (error.code.toString() === '23505') {
                throw new ConflictException('Perfil já existente');
            } else {
                throw new InternalServerErrorException(
                    'Erro ao salvar o perfil no banco de dados',
                );
            }
        }
    }
}