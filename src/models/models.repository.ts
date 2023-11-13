import { BaseEntity, Column, Entity } from "typeorm";


@Entity()
export class BaseRepository extends BaseEntity {
    id: number | string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: 'create_by', nullable: true })
    createBy: string;

    @Column({ type: "timestamp", nullable: true })
    updatedAt: Date;

    @Column({ name: 'update_by', nullable: true })
    updateBy: string;

    @Column({ type: "boolean", default: false })
    isActive: boolean;
}