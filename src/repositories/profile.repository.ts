import { BaseAbstractRepository } from './base/base.abstract.repository';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../components/profile/entity/profile.entity';
import { ProfileRepositoryInterface } from '../components/profile/interface/profile.repository.interface';

@Injectable()
export class ProfileRepository extends BaseAbstractRepository<Profile> implements ProfileRepositoryInterface {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ) {
        super(profileRepository)
    }

    async create(profile: Profile): Promise<Profile> {
        try {
            const createdProfile = await super.create(profile)
            return createdProfile
        } catch (error) {
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