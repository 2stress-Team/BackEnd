import { Entity, PrimaryGeneratedColumn, Column, Unique} from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid!: String;

    @Column('text')
    @IsNotEmpty()
    email!: String;

    @Column('timestamp')
    @IsNotEmpty()
    dateDeNaissance!: Date;

    @Column('text')
    sexe!: String;

    @Column('text')
	@Length(8, 20)
	@IsNotEmpty()
    password!: string;
    
    hashPassword(): void {
		this.password = bcrypt.hashSync(this.password, 8);
	}

	checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
		return bcrypt.compareSync(unencryptedPassword, this.password);
	}
}