import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Accounts' })
export class Account {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string

    @Column()
    password!: string

    @Column()
    type!: number

    @Column()
    email!: string

    @Column()
    status!: boolean

    @Column()
    created_by!: number
}