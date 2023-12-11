import * as bcrypt from 'bcrypt';
import { EGender, EProviderType, IAddress } from 'common/constants/setting';
import Appointment from 'models/appointment/entities/appointment.entity';
import { Conversation } from 'models/conversation/entities/conversation.entity';
import { DoctorRegister } from 'models/doctor_register/entities/doctor_register.entity';
import { DoctorSpecialized } from 'models/doctor_specialized/entities/doctor_specialized.entity';
import { Feedback } from 'models/feedback/entities/feedback.entity';
import { Message } from 'models/message/entities/message.entity';
import { BaseRepository } from 'models/models.repository';
import { UserRole } from 'models/user-role/entities/user-role.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseRepository {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    @Index()
    firstName: string;

    @Column({ nullable: false })
    @Index()
    lastName: string;

    @Column({ name: 'provider_type', type: 'enum', enum: EProviderType, default: EProviderType['ACCOUNT'] })
    providerType: EProviderType;

    @Column({ type: 'simple-json', nullable: true })
    address: IAddress

    @Column({ nullable: true })
    symptom: string;

    @Column({ nullable: true })
    insurance: string

    @Column({ nullable: true })
    avatar: string

    @Column({ nullable: true, type: 'enum', enum: EGender })
    gender: EGender;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    email: string;

    @Column({ name: 'refresh_token', nullable: true })
    refreshToken: string;

    @OneToMany(() => Conversation, (conversation) => conversation.user)
    conversations: Conversation[];

    @OneToMany(() => Message, (message) => message.sender)
    messages: Message[];

    @OneToMany(() => Message, (message) => message.seen)
    seenMessages: Message[];

    constructor(partial?: Partial<User>) {
        super();
        Object.assign(this, partial);
    }

    @OneToMany(() => UserRole, userRole => userRole.user)
    userRole: UserRole[]

    @OneToOne(() => DoctorRegister, doctorRegister => doctorRegister.user)
    doctorRegister: DoctorRegister[]

    @OneToMany(() => DoctorSpecialized, doctorSpecialized => doctorSpecialized.user)
    doctorSpecialized: DoctorSpecialized[]

    @OneToMany(() => Feedback, feedbackDoctor => feedbackDoctor.doctor)
    feedbackDoctor: Feedback[]

    @OneToMany(() => Feedback, feedbackPatient => feedbackPatient.patient)
    feedbackPatient: Feedback[]

    @OneToMany(() => Appointment, user => user.doctor)
    appointmentDoctor: Appointment[]

    @OneToMany(() => Appointment, user => user.patient)
    appointmentPatient: Appointment[]

}
