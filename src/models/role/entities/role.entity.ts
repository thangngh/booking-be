import { UserRole } from "models/user-role/entities/user-role.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'role_name' })
    roleName: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @OneToMany(() => UserRole, userRole => userRole.role)
    userRole: UserRole
}
