import { Entity, PrimaryGeneratedColumn, Column, Unique} from 'typeorm';
import { Enum } from '@apollo/protobufjs';

@Entity()
export class Infos{
    @PrimaryGeneratedColumn('uuid')
    uuid!: String;

    @Column('text')
    title!: String;

    @Column('text')
    text!: String;
    
    @Column()
    type!: Enum
}