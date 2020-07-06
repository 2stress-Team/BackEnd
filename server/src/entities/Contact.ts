import { Entity, PrimaryGeneratedColumn, Column, Unique} from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import { integer } from 'aws-sdk/clients/lightsail';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    uuid!: String;

    @Column('text')
    name!: String;

    @Column()
    number!: number;
}