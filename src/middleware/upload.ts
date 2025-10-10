import { existsSync, renameSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import multer from 'fastify-multer';
import { ClientError } from '@/error/client-error';

export class UploadMiddleWares {
	private readonly rootUpload = 'public/uploads/';
	private readonly filesExtensionRegex = /(jpg|jpeg|png|webp)$/i;
	private readonly maxSizeOfImage = 5_240_880;

	private getOldFileExtension(filePath: string) {
		const imagesExtensionOption = [
			'jpg',
			'jpeg',
			'png',
			'webp',
		];
		const fileExtension = filePath.split('.')[1];
		return imagesExtensionOption.find((extension) => {
			const path = filePath.replace(fileExtension, extension);
			if (existsSync(path)) return true;
		});
	}

	Avatar = multer({
		storage: multer.diskStorage({
			destination: this.rootUpload,
			filename: (req, file, cb) => {
				const userId = req.user.id;
				if (!userId) {
					throw new ClientError('user not authorization');
				}

				const fileName = userId.concat(path.extname(file.originalname));
				const baseDirRootPath = path
					.dirname(__dirname)
					.replace('src', this.rootUpload);
				const filePath = baseDirRootPath.concat(fileName);
				const oldFileExtension = this.getOldFileExtension(filePath);

				if (!oldFileExtension) {
					cb(null, fileName);
					return;
				}

				const backupFileName = `backup-${userId}.${oldFileExtension}`;
				const backupFilePath = baseDirRootPath.concat(backupFileName);
				renameSync(
					filePath.replace(fileName.split('.')[1], oldFileExtension),
					backupFilePath,
				);
				cb(null, `${fileName}`);

				setTimeout(() => {
					if (!existsSync(filePath)) {
						renameSync(
							backupFilePath,
							filePath.replace(fileName, backupFileName.split('backup-')[1]),
						);
					} else {
						unlinkSync(backupFilePath);
					}
				}, 4000);
			},
		}),
		limits: {
			fileSize: this.maxSizeOfImage,
		},
		fileFilter: (_, file, cb) => {
			const isNotTypeValidationFile = !this.filesExtensionRegex.test(
				file.mimetype.split('/')[1],
			);

			if (isNotTypeValidationFile) {
				cb(new ClientError('type of image not supported'), false);
			}

			cb(null, true);
		},
	}).single('avatar');
}
