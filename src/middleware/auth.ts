import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ClientError } from '@/error/client-error';

const UserPayloadTokenSchema = z.object({
	userId: z.string(),
	avatar: z.string().or(z.null()).default(null),
});

export class AuthMiddleWares {
	async userAuth(request: FastifyRequest, _: FastifyReply) {
		const verifyAccessToken = await request.jwtVerify();

		const user = UserPayloadTokenSchema.parse(verifyAccessToken);
		if (!user) {
			throw new ClientError('user not authorization');
		}
	}
}
