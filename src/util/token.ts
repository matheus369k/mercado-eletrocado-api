import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '@/util/env';

export const UserPayloadTokenSchema = z.object({
	userId: z
		.string()
		.min(32, 'This jwt secret is many short')
		.max(200, 'This jwt secret is many large'),
	avatar: z.string().or(z.null()).default(null),
});

export type UserPayloadTokenType = z.infer<typeof UserPayloadTokenSchema>;

export class AuthorizationToken {
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

	generateRefreshToken({ userId, avatar }: UserPayloadTokenType) {
		const tokenPayload: UserPayloadTokenType = {
			userId,
			avatar,
		};
		const token = jwt.sign(tokenPayload, env.JWT_REFRESH_SECRET_KEY, {
			expiresIn: '7d',
		});

		return token;
	}

	verifyRefreshToken({ refreshToken }: { refreshToken: string }) {
		const tokenPayload = jwt.verify(
			refreshToken,
			env.JWT_REFRESH_SECRET_KEY,
		) as UserPayloadTokenType;

		return tokenPayload;
	}
}
