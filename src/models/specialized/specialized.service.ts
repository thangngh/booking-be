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
        const specialized = await this.specializedRepository.find();
        const result = specialized.slice(0, 6).map((spec) => ({
            ...spec,
            description: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.'
        }))
        return result
    }
}
