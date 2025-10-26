import { and, desc, eq } from 'drizzle-orm';
import { ClientError } from 'src/error/client-error';
import { postgresDb } from '@/db/postgres/postgresql';
import { pgSchema } from '@/db/postgres/schema';

type CreateFavoriteProps = {
	userId: string;
	productId: string;
	name: string;
	image: string;
	price: number;
};

type DeleteFavoriteProps = Pick<CreateFavoriteProps, 'userId' | 'productId'>;

export class FavoritesControllers {
	async create(props: CreateFavoriteProps) {
		const { image, name, price, userId, productId } = props;
		const [favorite] = await postgresDb
			.insert(pgSchema.favorites)
			.values({
				productId,
				userId,
				image,
				price,
				name,
			})
			.returning({
				productId: pgSchema.favorites.productId,
			});

		if (!favorite) {
			throw new ClientError('error try create favorite product');
		}

		return {
			productId: favorite.productId,
		};
	}

	async getOne(props: Pick<CreateFavoriteProps, 'productId' | 'userId'>) {
		const { productId, userId } = props;
		const [favorite] = await postgresDb
			.select({
				id: pgSchema.favorites.id,
				createAt: pgSchema.favorites.createAt,
				productId: pgSchema.favorites.productId,
				price: pgSchema.favorites.price,
				image: pgSchema.favorites.image,
				name: pgSchema.favorites.name,
			})
			.from(pgSchema.favorites)
			.where(
				and(
					eq(pgSchema.favorites.userId, userId),
					eq(pgSchema.favorites.productId, productId),
				),
			)
			.limit(1);

		if (!favorite) {
			throw new ClientError('not found favorite product');
		}

		return {
			favorite,
		};
	}

	async getAll({ userId }: Pick<CreateFavoriteProps, 'userId'>) {
		const favorites = await postgresDb
			.select({
				id: pgSchema.favorites.id,
				createAt: pgSchema.favorites.createAt,
				productId: pgSchema.favorites.productId,
				price: pgSchema.favorites.price,
				image: pgSchema.favorites.image,
				name: pgSchema.favorites.name,
			})
			.from(pgSchema.favorites)
			.where(eq(pgSchema.favorites.userId, userId))
			.orderBy(desc(pgSchema.favorites.createAt));

		if (!favorites[0]) {
			throw new ClientError('not found favorite product');
		}

		return {
			favorites,
		};
	}

	async delete({ productId, userId }: DeleteFavoriteProps) {
		await postgresDb
			.delete(pgSchema.favorites)
			.where(
				and(
					eq(pgSchema.favorites.productId, productId),
					eq(pgSchema.favorites.userId, userId),
				),
			);

		const favorite = await postgresDb
			.select({
				productId: pgSchema.favorites.productId,
			})
			.from(pgSchema.favorites)
			.where(
				and(
					eq(pgSchema.favorites.productId, productId),
					eq(pgSchema.favorites.userId, userId),
				),
			);

		if (favorite[0]) {
			throw new ClientError('error try delete favorite product');
		}
	}
}
