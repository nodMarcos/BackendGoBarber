//import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import {injectable, inject} from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface Request{
    email: string;
}

@injectable()
class SendForgotPasswordEmailService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
        
        @inject('UserTokensRepository')
        private userTokenRepository: IUserTokensRepository,
    ){}

    public async execute({ email }: Request): Promise<void>{
        const user = await this.usersRepository.findByEmail(email);
        
        if(!user) {
            throw new AppError('User does not exists')
        }

        const {token} = await this.userTokenRepository.generate(user.id)

        await this.mailProvider.sendMail(email, `Pedido de recuperação de senha recebido: ${token}`);
    }
}

export default SendForgotPasswordEmailService;