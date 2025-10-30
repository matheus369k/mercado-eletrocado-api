import type { FastifyInstance } from 'fastify';
import { redis } from '@/db/redis/redis';
import { ClientError } from '@/error/client-error';
import { AuthorizationToken } from '@/util/token';

export class TokenRoutes {
	async refreshAccessToken(app: FastifyInstance) {
		app.get('/token', async (request, reply) => {
			const refreshToken = request.cookies.refreshToken;
			if (!refreshToken) {
				throw new ClientError('refresh token not found');
			}

			const verifyRefreshToken = new AuthorizationToken().verifyRefreshToken({
				refreshToken,
			});
			if (!verifyRefreshToken) {
				reply.clearCookie('refreshToken', {
					path: '/token',
				});
				throw new ClientError('refresh token is invalid');
			}

			const permissionRefreshToken = await redis.get(`refresh:${refreshToken}`);
			if (!permissionRefreshToken) {
				reply.clearCookie('refreshToken', {
					path: '/token',
				});
				throw new ClientError('refresh token not have permission');
			}

			const accessToken = new AuthorizationToken().generateAccessToken({
				avatar: verifyRefreshToken.avatar,
				userId: verifyRefreshToken.userId,
			});

			return reply.send({
				accessToken,
			});
		});
	}
}
