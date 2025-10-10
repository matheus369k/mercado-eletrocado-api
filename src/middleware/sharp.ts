import path from 'node:path';
import type { FastifyReply, FastifyRequest } from 'fastify';
import sharp from 'sharp';
import { z } from 'zod';
import { ClientError } from '@/error/client-error';
import { renameSync } from 'node:fs';

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

export class SharpMiddleWares {
	async avatar(request: FastifyRequest, _: FastifyReply) {
		const baseRoot = path.join(__dirname, '..', '..');
		const avatarPath = UpdateFile.parse(request.file)?.path;
		const avatarFileName = UpdateFile.parse(request.file)?.filename;
		if (!avatarPath || !avatarFileName) {
			throw new ClientError('no found file');
		}

		const filePath = path.join(baseRoot, avatarPath);
		const image = sharp(filePath);
		const { height, width } = await image.metadata();
		let extractOption = {
			top: Math.floor((height - width) / 2),
			height: width,
			left: 0,
			width,
		};

		if (height < width) {
			extractOption = {
				left: Math.floor((width - height) / 2),
				width: height,
				top: 0,
				height,
			};
		}

		const sharpFilePath = avatarPath.replace(
			avatarFileName,
			`temp-${avatarFileName}`,
		);
		await image
			.extract(extractOption)
			.resize({
				width: 348,
				height: 348,
			})
			.toFile(sharpFilePath);

		renameSync(sharpFilePath, avatarPath);
	}
}
