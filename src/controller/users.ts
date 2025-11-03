import { unlinkSync } from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { postgresDb } from '@/db/postgres/postgresql';
import { pgSchema } from '@/db/postgres/schema';
import { ClientError } from '@/error/client-error';
import type { UserPayloadTokenType } from '@/util/token';

type CreateUserProps = {
	avatar: string | null;
	password: string;
	email: string;
	name: string;
	cep: string;
};

type LoginUserProps = Pick<CreateUserProps, 'email' | 'password'>;

type UpdateUserProps = Pick<CreateUserProps, 'name' | 'cep' | 'avatar'> &
	Pick<UserPayloadTokenType, 'userId'>;

export class UsersControllers {
	async create(props: CreateUserProps) {
		const { avatar, cep, email, name, password } = props;
		const [userAlreadyAccount] = await postgresDb
			.select({
				id: pgSchema.users.id,
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

		return {
			user,
		};
	}

	async login(props: LoginUserProps) {
		const { email, password } = props;
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

		return {
			user: userLogin,
		};
	}

	async profile({ userId }: Pick<UpdateUserProps, 'userId'>) {
		const [user] = await postgresDb
			.select({
				avatar: pgSchema.users.avatar,
				email: pgSchema.users.email,
				name: pgSchema.users.name,
				cep: pgSchema.users.cep,
				id: pgSchema.users.id,
			})
			.from(pgSchema.users)
			.where(eq(pgSchema.users.id, userId));

		if (!user) {
			throw new ClientError('user not have account');
		}

		return {
			user,
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

	async delete(props: Pick<UpdateUserProps, 'avatar' | 'userId'>) {
		const { avatar, userId } = props;

		await postgresDb
			.delete(pgSchema.deliveries)
			.where(eq(pgSchema.deliveries.userId, userId));

		await postgresDb
			.delete(pgSchema.favorites)
			.where(eq(pgSchema.favorites.userId, userId));

		await postgresDb
			.delete(pgSchema.users)
			.where(eq(pgSchema.users.id, userId));

		if (avatar) {
			const avatarPath = path.resolve(__dirname, '..', '..', avatar);
			unlinkSync(avatarPath);
		}
	}
}
