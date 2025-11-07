import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { UsersControllers } from '@/controller/users';
import { redis } from '@/db/redis/redis';
import { ClientError } from '@/error/client-error';
import { AuthMiddleWares } from '@/middleware/auth';
import { SharpMiddleWares } from '@/middleware/sharp';
import { UploadMiddleWares } from '@/middleware/upload';
import { AuthorizationToken, UserPayloadTokenSchema } from '@/util/token';

const CreateUserBodySchema = z.object({
	name: z
		.string('name is invalid')
		.min(3, 'name have more 3 characters')
		.max(180, 'name have less 180 characters'),
	email: z.email('email is invalid'),
	password: z
		.string('password is invalid')
		.min(8, 'password have more 8 characters')
		.max(60, 'name have less 60 characters'),
	cep: z.string('cep is invalid'),
	avatar: z.string().or(z.null()).default(null),
	stayConnected: z.boolean().optional().default(false),
});

const LoginUserBodySchema = CreateUserBodySchema.pick({
	email: true,
	password: true,
	stayConnected: true,
});

const UpdateUserBodySchema = CreateUserBodySchema.pick({
	cep: true,
	name: true,
});

const UpdateFileSchema = z.union([
	z.object({
		fieldname: z.string(),
		originalname: z.string(),
		encoding: z.string(),
		mimetype: z.string(),
		destination: z.string(),
		filename: z.string(),
		path: z.string(),
		size: z.number(),
	}),
	z.custom<typeof Function>(),
]);

export class UsersRoutes {
	create(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().post(
			'/api/users/register',
			{
				schema: {
					body: CreateUserBodySchema,
				},
			},
			async (request, reply) => {
				const { avatar, cep, email, name, password, stayConnected } =
					request.body;
				const { user } = await new UsersControllers().create({
					password,
					avatar,
					email,
					name,
					cep,
				});

				const accessToken = new AuthorizationToken().generateAccessToken({
					avatar: user.avatar,
					userId: user.id,
				});
				const refreshToken = new AuthorizationToken().generateRefreshToken({
					avatar: user.avatar,
					userId: user.id,
					stayConnected,
				});

				await redis.set(
					`refresh:${refreshToken}`,
					user.id,
					'EX',
					new AuthorizationToken(stayConnected).refreshTokenAge,
				);

				return reply
					.setCookie('accessToken', accessToken, {
						maxAge: new AuthorizationToken().accessTokenAge,
						sameSite: 'strict',
						secure: true,
						path: '/',
					})
					.setCookie('refreshToken', refreshToken, {
						maxAge: new AuthorizationToken(stayConnected).refreshCookieAge,
						sameSite: 'strict',
						httpOnly: true,
						path: '/token',
						secure: true,
					})
					.send(user);
			},
		);
	}

	login(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().post(
			'/api/users/login',
			{
				schema: {
					body: LoginUserBodySchema,
				},
			},
			async (request, reply) => {
				const { email, password, stayConnected } = request.body;
				const { user } = await new UsersControllers().login({
					password,
					email,
				});

				const authorization = new AuthorizationToken(stayConnected);
				const accessToken = authorization.generateAccessToken({
					avatar: user.avatar,
					userId: user.id,
				});
				const refreshToken = authorization.generateRefreshToken({
					avatar: user.avatar,
					userId: user.id,
					stayConnected,
				});

				await redis.set(
					`refresh:${refreshToken}`,
					user.id,
					'EX',
					authorization.refreshTokenAge,
				);

				return reply
					.setCookie('accessToken', accessToken, {
						maxAge: authorization.accessTokenAge,
						sameSite: 'strict',
						secure: true,
						path: '/',
					})
					.setCookie('refreshToken', refreshToken, {
						maxAge: authorization.refreshCookieAge,
						sameSite: 'strict',
						path: '/token',
						httpOnly: true,
						secure: true,
					})
					.send(user);
			},
		);
	}

	profile(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().get(
			'/api/users/profile',
			{
				preHandler: [
					new AuthMiddleWares().userAuth,
				],
			},
			async (request, reply) => {
				const { userId } = UserPayloadTokenSchema.parse(request.user);
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				const { user } = await new UsersControllers().profile({
					userId,
				});

				return reply.send(user);
			},
		);
	}

	update(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().patch(
			'/api/users/update',
			{
				preHandler: [
					new AuthMiddleWares().userAuth,
					new UploadMiddleWares().Avatar,
					new SharpMiddleWares().avatar,
				],
			},
			async (request, reply) => {
				const imageFile = UpdateFileSchema.parse(request.file);
				const { userId } = UserPayloadTokenSchema.parse(request.user);
				const avatar = typeof imageFile === 'function' ? null : imageFile.path;
				const { cep, name } = UpdateUserBodySchema.parse(request.body);
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				const { user } = await new UsersControllers().update({
					userId,
					avatar,
					name,
					cep,
				});

				return reply.send(user);
			},
		);
	}

	logout(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().delete(
			'/api/users/logout',
			{
				preHandler: [
					new AuthMiddleWares().userAuth,
				],
			},
			async (request, reply) => {
				const { userId } = UserPayloadTokenSchema.parse(request.user);
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				return reply
					.clearCookie('accessToken', {
						path: '/',
					})
					.send('ok');
			},
		);
	}

	delete(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().delete(
			'/api/users/delete',
			{
				preHandler: [
					new AuthMiddleWares().userAuth,
				],
			},
			async (request, reply) => {
				const { avatar, userId } = UserPayloadTokenSchema.parse(request.user);
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				await new UsersControllers().delete({
					avatar,
					userId,
				});

				return reply
					.clearCookie('accessToken', {
						path: '/',
					})
					.send('ok');
			},
		);
	}
}
