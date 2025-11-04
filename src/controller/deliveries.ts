import { desc, eq } from 'drizzle-orm';
import { ClientError } from 'src/error/client-error';
import { postgresDb } from '@/db/postgres/postgresql';
import { pgSchema } from '@/db/postgres/schema';

type CreateDeliveryProps = {
	userId: string;
	products: {
		productId: string;
		name: string;
		image: string;
		price: number;
	}[];
};

export class DeliveriesControllers {
	async create(props: CreateDeliveryProps) {
		const products = props.products.map((product) => {
			const fourteenDays = 1000 * 60 * 60 * 24 * 14;
			const deliveryDate = new Date(Date.now() + fourteenDays).toISOString();
			const { image, name, price, productId } = product;

			return {
				userId: props.userId,
				deliveryDate,
				productId,
				price,
				image,
				name,
			};
		});

		const productsCount = await postgresDb
			.insert(pgSchema.deliveries)
			.values(products)
			.returning({
				id: pgSchema.deliveries.id,
			});

		if (!productsCount[0]) {
			throw new ClientError('error try create delivery products');
		}

		return {
			productsCount: productsCount.length,
		};
	}

	async getAll({ userId }: Pick<CreateDeliveryProps, 'userId'>) {
		const products = await postgresDb
			.select({
				deliveryDate: pgSchema.deliveries.deliveryDate,
				productId: pgSchema.deliveries.productId,
				price: pgSchema.deliveries.price,
				image: pgSchema.deliveries.image,
				name: pgSchema.deliveries.name,
				id: pgSchema.deliveries.id,
			})
			.from(pgSchema.deliveries)
			.where(eq(pgSchema.deliveries.userId, userId))
			.orderBy(desc(pgSchema.deliveries.createAt));

		if (!products[0]) {
			throw new ClientError('not found delivery products');
		}

		return {
			products,
		};
	}
}
