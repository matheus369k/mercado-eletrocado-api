import type { FastifyInstance } from 'fastify';
import { redis } from '@/db/redis/redis';
import { ClientError } from '@/error/client-error';
import { AuthorizationToken } from '@/util/token';
import { AuthMiddleWares } from '@/middleware/auth';

export class TokenRoutes {
	async refreshAccessToken(app: FastifyInstance) {
		app.get('/token', async (request, reply) => {
			const refreshToken = request.cookies.refreshToken;
			if (!refreshToken) {
				throw new ClientError('refresh token not found');
			}

			const verifyRefreshToken =
				await new AuthorizationToken().verifyRefreshToken({
					refreshToken,
				});
			if (!verifyRefreshToken) {
				reply.clearCookie('refreshToken', {
					path: '/token',
				});
				throw new ClientError('refresh token is invalid');
			}

			const accessToken = new AuthorizationToken().generateAccessToken({
				avatar: verifyRefreshToken.avatar,
				userId: verifyRefreshToken.userId,
			});

			return reply
				.setCookie('accessToken', accessToken, {
					maxAge: new AuthorizationToken().accessTokenAge,
					sameSite: 'strict',
					secure: true,
				})
				.send('ok');
		});
	}

	async deleteRefreshToken(app: FastifyInstance) {
		app.delete('/token', async (request, reply) => {
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

			await redis.del(`refresh:${refreshToken}`);

			reply
				.clearCookie('refreshToken', {
					path: '/token',
				})
				.send('ok');
		});
	}
}
