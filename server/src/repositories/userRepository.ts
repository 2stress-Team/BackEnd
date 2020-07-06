import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export async function addUserRepository(user: User): Promise<User> {
	const userRepository: Repository<User> = getRepository(User);
	return await userRepository.save(user);
}

export async function getOneUserRepository (id: String): Promise<User | undefined> {
	const userRepository: Repository<User> = getRepository(User);
	try {
		const test = await userRepository.findOne({ where: { uuid: id } })
		console.log(test)
	} catch (error) {
		console.log(`Oops couldn't get User`);
		console.log(error)
	}
	return await userRepository.findOne({ where: { uuid: id } })
}