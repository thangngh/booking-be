import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseEntity, Repository } from "typeorm";

@Injectable()
export class BaseService<T extends BaseEntity> {
    constructor(
        private readonly repository: Repository<T>, ...args: any[]
    ) { }

    async createTransition(callback: () => void) {
        const transition = await this.repository.manager.connection.createQueryRunner();

        await transition.connect();
        await transition.startTransaction();

        try {
            callback();

            await transition.commitTransaction();

        } catch (error) {
            await transition.rollbackTransaction()
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } finally {
            await transition.release();
        }
    }
}