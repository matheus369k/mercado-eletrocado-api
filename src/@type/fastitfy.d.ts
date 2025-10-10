import 'fastify';

type FastifyRequestUserType = {
	id: string;
	name: string;
	email: string;
	password: string;
	cep: string;
	avatar: string | null;
	createAt: string;
};

declare module 'fastify' {
	export interface FastifyRequest {
		user: Partial<FastifyRequestUserType>;
	}
}
