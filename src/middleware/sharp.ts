import { renameSync } from 'node:fs';
import path from 'node:path';
import type { FastifyReply, FastifyRequest } from 'fastify';
import sharp from 'sharp';
import { z } from 'zod';

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
	z.function(),
]);

export class SharpMiddleWares {
	async avatar(request: FastifyRequest, _: FastifyReply) {
		const imageFile = UpdateFileSchema.parse(request.file);
		if (typeof imageFile === 'function') return;
		const baseRoot = path.join(__dirname, '..', '..');
		const avatarPath = imageFile?.path;
		const avatarFileName = imageFile?.filename;
		if (!avatarPath || !avatarFileName) return;

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
