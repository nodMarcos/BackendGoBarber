import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDto';
import IFindProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
    findAllProviders(data: IFindProvidersDTO): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}