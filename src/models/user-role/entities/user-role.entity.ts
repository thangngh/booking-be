import { Role } from "models/role/entities/role.entity";
import { User } from "models/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user-role')
export class UserRole extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'role_id' })
    roleId: number;

    @Column({ name: 'user_id' })
    userId: number;

    @ManyToOne(() => User, user => user.userRole)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Role, role => role.userRole)
    @JoinColumn({ name: 'role_id' })
    role: Role

    constructor(partial?: Partial<UserRole>) {
        super();
        Object.assign(this, partial);
    }
}
