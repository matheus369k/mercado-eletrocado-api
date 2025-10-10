import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { UsersControllers } from '@/controller/users';
import { ClientError } from '@/error/client-error';
import { AuthMiddleWares } from '@/middleware/auth';
import { SharpMiddleWares } from '@/middleware/sharp';
import { UploadMiddleWares } from '@/middleware/upload';
import { postgresDb } from '@/db/postgres/postgresql';
import { pgSchema } from '@/db/postgres/schema';
import { eq } from 'drizzle-orm';
import { unlink, unlinkSync } from 'node:fs';
import path from 'node:path';

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
	stayConnected: z.boolean().default(false),
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
				const { avatar, cep, email, name, password, stayConnected } =
					request.body;
				const { token, user } = await new UsersControllers().create({
					stayConnected,
					password,
					avatar,
					email,
					name,
					cep,
				});

				return reply.send({
					user,
					token,
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
				const { email, password, stayConnected } = request.body;
				const { token, user } = await new UsersControllers().login({
					stayConnected,
					password,
					email,
				});

				return reply.send({
					token,
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
				const user = request.user;
				if (!user) {
					throw new ClientError('user not have authorization');
				}

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
				const avatar = UpdateFile.parse(request.file)?.path || null;
				const { cep, name } = UpdateUserBodySchema.parse(request.body);
				const userId = request.user.id;
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

	delete(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().delete(
			'/api/users',
			{
				preHandler: [
					new AuthMiddleWares().userAuth,
				],
			},
			async (request, reply) => {
				const avatar = request.user.avatar || null;
				const userId = request.user.id;
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				await new UsersControllers().delete({
					avatar,
					userId,
				});

				return reply.send('ok');
			},
		);
	}
}
