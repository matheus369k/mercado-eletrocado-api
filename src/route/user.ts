import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { UsersControllers } from '@/controller/users';
import { ClientError } from '@/error/client-error';
import { AuthMiddleWares } from '@/middleware/auth';
import { SharpMiddleWares } from '@/middleware/sharp';
import { UploadMiddleWares } from '@/middleware/upload';
import { AuthorizationToken, UserPayloadTokenSchema } from '@/util/token';
import { redis } from '@/db/redis/redis';

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
});

const LoginUserBodySchema = CreateUserBodySchema.pick({
	email: true,
	password: true,
});

const UpdateUserBodySchema = CreateUserBodySchema.pick({
	cep: true,
	name: true,
});

const UpdateFile = z
	.object({
		fieldname: z.string(),
		originalname: z.string(),
		encoding: z.string(),
		mimetype: z.string(),
		destination: z.string(),
		filename: z.string(),
		path: z.string(),
		size: z.number(),
	})
	.or(z.null());

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
				const { avatar, cep, email, name, password } = request.body;
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
				});

				const ExpiredInOneWeek = 7 * 24 * 60 * 60;
				await redis.set(
					`refresh:${refreshToken}`,
					user.id,
					'EX',
					ExpiredInOneWeek,
				);

				return reply
					.setCookie('refreshToken', refreshToken, {
						maxAge: ExpiredInOneWeek,
						httpOnly: true,
						secure: true,
						sameSite: 'strict',
						path: '/token',
					})
					.send({
						accessToken,
						user,
					});
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
				const { email, password } = request.body;
				const { user } = await new UsersControllers().login({
					password,
					email,
				});

				const accessToken = new AuthorizationToken().generateAccessToken({
					avatar: user.avatar,
					userId: user.id,
				});
				const refreshToken = new AuthorizationToken().generateRefreshToken({
					avatar: user.avatar,
					userId: user.id,
				});

				const ExpiredInOneWeek = 7 * 24 * 60 * 60;
				await redis.set(
					`refresh:${refreshToken}`,
					user.id,
					'EX',
					ExpiredInOneWeek,
				);

				return reply
					.setCookie('refreshToken', refreshToken, {
						maxAge: ExpiredInOneWeek,
						httpOnly: true,
						secure: true,
						sameSite: 'strict',
						path: '/token',
					})
					.send({
						accessToken,
						user,
					});
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
				const { userId } = UserPayloadTokenSchema.parse(request.user);
				const avatar = UpdateFile.parse(request.file)?.path || null;
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
				const refreshToken = request.cookies.refresh;
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				await redis.del(`refresh:${refreshToken}`);

				return reply
					.clearCookie('refreshToken', {
						path: '/token',
					})
					.clearCookie('accessToken')
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
				const refreshToken = request.cookies.refresh;
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				await new UsersControllers().delete({
					avatar,
					userId,
				});

				await redis.del(`refresh:${refreshToken}`);

				return reply
					.clearCookie('refreshToken', {
						path: '/token',
					})
					.clearCookie('accessToken')
					.send('ok');
			},
		);
	}
}
