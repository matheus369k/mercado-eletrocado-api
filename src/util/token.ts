import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '@/util/env';
import { redis } from '@/db/redis/redis';

export const UserPayloadTokenSchema = z.object({
	userId: z
		.string()
		.min(32, 'This jwt secret is many short')
		.max(200, 'This jwt secret is many large'),
	avatar: z.string().or(z.null()).default(null),
});

export type UserPayloadTokenType = z.infer<typeof UserPayloadTokenSchema>;

export class AuthorizationToken {
	private readonly OneWeek = 7 * 24 * 60 * 60;
	private readonly oneHour = 60 * 60;

	readonly accessTokenAge = 5 * 60;
	readonly refreshTokenAge = this.OneWeek;

	readonly refreshCookieAge: number | undefined = this.OneWeek;

	constructor(stayConnected = true) {
		this.refreshCookieAge = stayConnected ? this.OneWeek : undefined;
		this.refreshTokenAge = stayConnected ? this.OneWeek : this.oneHour;
	}

	generateAccessToken({ userId, avatar }: UserPayloadTokenType) {
		const tokenPayload: UserPayloadTokenType = {
			userId,
			avatar,
		};

		const token = jwt.sign(tokenPayload, env.JWT_ACCESS_SECRET_KEY, {
			expiresIn: '5m',
		});

		return token;
	}

	generateRefreshToken({
		userId,
		avatar,
		stayConnected = false,
	}: UserPayloadTokenType & {
		stayConnected?: boolean;
	}) {
		const expiresIn = stayConnected ? '7d' : '1h';
		const tokenPayload: UserPayloadTokenType = {
			userId,
			avatar,
		};
		const token = jwt.sign(tokenPayload, env.JWT_REFRESH_SECRET_KEY, {
			expiresIn,
		});

		return token;
	}

	async verifyRefreshToken({ refreshToken }: { refreshToken: string }) {
		const verifyRefreshToken = jwt.verify(
			refreshToken,
			env.JWT_REFRESH_SECRET_KEY,
		) as UserPayloadTokenType;
		const redisRefreshToken = await redis.get(`refresh:${refreshToken}`);

		if (verifyRefreshToken && redisRefreshToken) {
			return verifyRefreshToken;
		}
	}
}
