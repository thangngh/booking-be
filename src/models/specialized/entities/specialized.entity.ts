import { DoctorSpecialized } from "models/doctor_specialized/entities/doctor_specialized.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Specialized {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => DoctorSpecialized, doctorSpecialized => doctorSpecialized.specialized)
    doctorSpecialized: DoctorSpecialized[]
}
