import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PatientRegister extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
}
