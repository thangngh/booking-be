import { Injectable } from '@nestjs/common';
import { CreateSpecializedDto } from './dto/create-specialized.dto';
import { UpdateSpecializedDto } from './dto/update-specialized.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialized } from './entities/specialized.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecializedService {
    constructor(
        @InjectRepository(Specialized) private readonly specializedRepository: Repository<Specialized>
    ) { }


    async getAll() {

        return this.specializedRepository.find();
    }
}
