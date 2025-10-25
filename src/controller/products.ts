import { and, desc, eq } from 'drizzle-orm'
import { ClientError } from 'src/error/client-error'
import { mongoDb } from '@/db/mongo/mongo'
import { postgresDb } from '@/db/postgres/postgresql'
import { pgSchema } from '@/db/postgres/schema'

type SlideCreateProductType = {
  slide1: string
  slide2: string
  slide3: string
}

type CreateProductProps = {
  model: string
  img: string
  slide: SlideCreateProductType
  screen: string
  processor: string
  memory: string
  placeVideo: string
  battery: string
  price: number
  category: string
}

type CreateFavoriteProps = {
  userId: string
  favoriteId: string
  name: string
  image: string
  price: number
}

type DeleteFavoriteProps = Pick<CreateFavoriteProps, 'userId' | 'favoriteId'>;

type CreateDeliveryProps = Pick<CreateFavoriteProps, 'userId'> & {
  products: Omit<CreateFavoriteProps, 'userId' | 'favoriteId'>[]
}

export class ProductsControllers {
  async create(props: CreateProductProps) {
    const { Products } = await mongoDb()
    const { _id: productId } = await Products.insertOne({
      category: props.category,
      img: props.img,
      memory: props.memory,
      model: props.model,
      price: props.price,
      processor: props.processor,
      screen: props.screen,
      slide: props.slide,
      battery: props.battery,
      placeVideo: props.placeVideo,
    })
    if (!productId) {
      throw new ClientError('Error to must add one new product...')
    }
    return {
      productId,
    }
  }

  async getAll() {
    const db = await mongoDb()
    const products = await db.Products.find().limit(24)
    if (!products || products.length === 0) {
      throw new ClientError('Not found product...')
    }
    const separationProductsForCategory = products.reduce((acc, curr) => {
      if (acc[curr.category]) {
        acc[curr.category].push(curr)
      } else {
        return {
          [curr.category]: [curr],
          ...(acc || []),
        }
      }
      return acc
    }, {})
    if (!separationProductsForCategory) {
      return null
    }
    return {
      ...separationProductsForCategory,
    }
  }

  async getForCategory({ category }: Pick<CreateProductProps, 'category'>) {
    const { Products } = await mongoDb()
    const products = await Products.where({
      category,
    }).limit(24)
    if (!products || products.length === 0) {
      throw new ClientError('Not found product...')
    }
    return {
      products,
    }
  }

  async delete(_id: string) {
    const { Products } = await mongoDb()
    const product = await Products.findByIdAndDelete({
      _id,
    })
    if (!product) {
      throw new ClientError('Error to must deleted product...')
    }
    return {
      productId: product._id,
    }
  }

  async createDeliveries(props: CreateDeliveryProps) {
    const products = props.products.map((product) => {
      const fourteenDays = 1000 * 60 * 60 * 24 * 14
      const deliveryDate = new Date(Date.now() + fourteenDays).toISOString()
      const { image, name, price } = product

      return {
        userId: props.userId,
        deliveryDate,
        price,
        image,
        name,
      }
    })

    const productsCount = await postgresDb
      .insert(pgSchema.deliveries)
      .values(products)
      .returning({
        id: pgSchema.deliveries.id,
      })

    if (!productsCount[0]) {
      throw new ClientError('error try create delivery products')
    }

    return {
      productsCount: productsCount.length,
    }
  }

  async getAllDeliveries({ userId }: Pick<CreateDeliveryProps, 'userId'>) {
    const products = await postgresDb
      .select({
        deliveryDate: pgSchema.deliveries.deliveryDate,
        price: pgSchema.deliveries.price,
        image: pgSchema.deliveries.image,
        name: pgSchema.deliveries.name,
        id: pgSchema.deliveries.id,
      })
      .from(pgSchema.deliveries)
      .where(eq(pgSchema.deliveries.userId, userId))
      .orderBy(desc(pgSchema.deliveries.createAt))

    if (!products[0]) {
      throw new ClientError('not found delivery products')
    }

    return {
      products,
    }
  }

  async createFavorite(props: CreateFavoriteProps) {
    const { image, name, price, userId, favoriteId } = props
    const [favorite] = await postgresDb
      .insert(pgSchema.favorites)
      .values({
        favoriteId,
        userId,
        image,
        price,
        name,
      })
      .returning({
        id: pgSchema.favorites.id,
      })

    if (!favorite) {
      throw new ClientError('error try create favorite product')
    }

    return {
      favoriteId: favorite.id,
    }
  }

  async getAllFavorites({ userId }: Pick<CreateFavoriteProps, 'userId'>) {
    const favorites = await postgresDb
      .select({
        id: pgSchema.favorites.id,
        createAt: pgSchema.favorites.createAt,
        favoriteId: pgSchema.favorites.favoriteId,
        price: pgSchema.favorites.price,
        image: pgSchema.favorites.image,
        name: pgSchema.favorites.name,
      })
      .from(pgSchema.favorites)
      .where(eq(pgSchema.favorites.userId, userId))
      .orderBy(desc(pgSchema.favorites.createAt))

    if (!favorites[0]) {
      throw new ClientError('not found favorite product')
    }

    return {
      favorites,
    }
  }

  async deleteFavorite({ favoriteId, userId }: DeleteFavoriteProps) {
    await postgresDb
      .delete(pgSchema.favorites)
      .where(
        and(
          eq(pgSchema.favorites.favoriteId, favoriteId),
          eq(pgSchema.favorites.userId, userId)
        )
      )

    const favorite = await postgresDb
      .select({
        favoriteId: pgSchema.favorites.id,
      })
      .from(pgSchema.favorites)
      .where(
        and(
          eq(pgSchema.favorites.favoriteId, favoriteId),
          eq(pgSchema.favorites.userId, userId)
        )
      )

    if (favorite[0]) {
      throw new ClientError('error try delete favorite product')
    }
  }
}
