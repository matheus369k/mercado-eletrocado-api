import { eq } from 'drizzle-orm';
import type { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { postgresDb } from '@/db/postgres/postgresql';
import { pgSchema } from '@/db/postgres/schema';
import { ClientError } from '@/error/client-error';
import { env } from '@/util/env';

type UserPayloadTokenType = {
	userId: string;
};

export class AuthMiddleWares {
	async userAuth(request: FastifyRequest, _: FastifyReply) {
		const { authorization } = request.headers;
		if (!authorization) {
			throw new ClientError('user not have authorization');
		}

		const token = authorization.split('Bearer')[1].trim();
		const verifyToken = jwt.verify(
			token,
			env.JWT_SECRET_KEY,
		) as UserPayloadTokenType;
		if (!verifyToken) {
			throw new ClientError('user not have authorization');
		}

		const [user] = await postgresDb
			.select({
				avatar: pgSchema.users.avatar,
				email: pgSchema.users.email,
				name: pgSchema.users.name,
				cep: pgSchema.users.cep,
				id: pgSchema.users.id,
			})
			.from(pgSchema.users)
			.where(eq(pgSchema.users.id, verifyToken.userId));

		if (!user) {
			throw new ClientError('user not found');
		}

		request.user = user;
	}
}
