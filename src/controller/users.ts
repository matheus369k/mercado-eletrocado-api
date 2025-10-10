import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { postgresDb } from '@/db/postgres/postgresql';
import { pgSchema } from '@/db/postgres/schema';
import { ClientError } from '@/error/client-error';
import { env } from '@/util/env';

type UserPayloadTokenType = {
	userId: string;
};

interface GenerateJsonWebTokenProps extends UserPayloadTokenType {
	stayConnected: boolean;
}

type CreateUserProps = {
	stayConnected: boolean;
	avatar: string | null;
	password: string;
	email: string;
	name: string;
	cep: string;
};

type LoginUserProps = Pick<
	CreateUserProps,
	'email' | 'password' | 'stayConnected'
>;

type UpdateUserProps = Pick<CreateUserProps, 'name' | 'cep' | 'avatar'> &
	UserPayloadTokenType;

export class UsersControllers {
	private generateJsonWebToken({
		stayConnected,
		userId,
	}: GenerateJsonWebTokenProps) {
		let jwtSignOptions: SignOptions = {
			expiresIn: '30d',
		};
		if (stayConnected) {
			jwtSignOptions = {
				expiresIn: '10s',
			};
		}
		const token = jwt.sign(
			{
				userId,
			} as UserPayloadTokenType,
			env.JWT_SECRET_KEY,
			jwtSignOptions,
		);

		return token;
	}

	async create(props: CreateUserProps) {
		const { avatar, cep, email, name, password, stayConnected } = props;
		const [userAlreadyAccount] = await postgresDb
			.select({
				useId: pgSchema.users.id,
			})
			.from(pgSchema.users)
			.where(eq(pgSchema.users.email, email))
			.limit(1);
		if (userAlreadyAccount) {
			throw new ClientError('user already account');
		}

		const cryptPass = await bcrypt.hash(password, 10);
		const [user] = await postgresDb
			.insert(pgSchema.users)
			.values({
				password: cryptPass,
				avatar: avatar,
				email,
				name,
				cep,
			})
			.returning({
				avatar: pgSchema.users.avatar,
				email: pgSchema.users.email,
				name: pgSchema.users.name,
				cep: pgSchema.users.cep,
				id: pgSchema.users.id,
			});

		if (!user) {
			throw new ClientError('error try create user');
		}

		const token = this.generateJsonWebToken({
			stayConnected,
			userId: user.id,
		});

		return {
			user,
			token,
		};
	}

	async login(props: LoginUserProps) {
		const { email, password, stayConnected } = props;
		const [user] = await postgresDb
			.select({
				password: pgSchema.users.password,
				avatar: pgSchema.users.avatar,
				email: pgSchema.users.email,
				name: pgSchema.users.name,
				cep: pgSchema.users.cep,
				id: pgSchema.users.id,
			})
			.from(pgSchema.users)
			.where(eq(pgSchema.users.email, email));

		if (!user) {
			throw new ClientError('user not have account');
		}
		const verifyPass = await bcrypt.compare(password, user.password);
		if (!verifyPass) {
			throw new ClientError('user not have authorization');
		}
		const { password: _, ...userLogin } = user;

		const token = this.generateJsonWebToken({
			stayConnected,
			userId: user.id,
		});

		return {
			user: userLogin,
			token,
		};
	}

	async update(props: UpdateUserProps) {
		const { avatar, cep, name, userId } = props;

		let userUpdateData: Omit<UpdateUserProps, 'avatar' | 'userId'> & {
			avatar?: string;
		} = {
			name,
			cep,
		};
		if (avatar) {
			userUpdateData = {
				avatar,
				name,
				cep,
			};
		}

		const [user] = await postgresDb
			.update(pgSchema.users)
			.set(userUpdateData)
			.where(eq(pgSchema.users.id, userId))
			.returning({
				name: pgSchema.users.name,
				cep: pgSchema.users.cep,
				avatar: pgSchema.users.avatar,
				id: pgSchema.users.id,
				email: pgSchema.users.email,
			});

		if (!user) {
			throw new ClientError('error try update user');
		}

		return {
			user,
		};
	}
}
