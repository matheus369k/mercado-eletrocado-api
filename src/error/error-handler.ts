import type { FastifyInstance } from 'fastify';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { ClientError } from 'src/error/client-error';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: 'Invalid input',
			errors: `Error in the ${error.validationContext} on the request!`,
		});
	}

	if (error instanceof ClientError) {
		return reply.status(400).send({
			message: error.message,
		});
	}

	return reply.status(500).send({
		message: 'Internal server error',
	});
};
