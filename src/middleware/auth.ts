import type { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { ClientError } from '@/error/client-error';
import { env } from '@/util/env';

const UserPayloadTokenSchema = z.object({
	userId: z.string(),
	avatar: z.string().or(z.null()).default(null),
});

export class AuthMiddleWares {
	async userAuth(request: FastifyRequest, reply: FastifyReply) {
		const verifyAccessToken = await request.jwtVerify();

		const user = UserPayloadTokenSchema.parse(verifyAccessToken);
		if (!user) {
			reply.clearCookie('accessToken', {
				sameSite: 'none',
				secure: true,
				path: '/',
			});
			throw new ClientError('user not authorization');
		}
	}
}
