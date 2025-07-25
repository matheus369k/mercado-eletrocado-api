import mongoose from 'mongoose';
import { mongoConnectionDatabase } from 'src/config/database';
import { MongoDatabase } from 'src/model/product';

const seed = async () => {
	try {
		await mongoConnectionDatabase();
		await MongoDatabase.Products.deleteMany();
		await MongoDatabase.Products.insertMany([
			{
				model: 'Notebook Samsung Galaxy Book 3 360',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-1-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-1-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-1-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-1-slide-3.png',
				},
				screen: 'Tela de 14 polegadas',
				processor: 'Intel Core i5-1135G7',
				memory: '8 GB de RAM, 256 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Intel Iris Xe Graphics',
				price: 9238.96,
				category: 'notebook',
			},
			{
				model: 'Lenovo V130-14IKB 81HQ',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-4-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-4-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-4-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-4-slide-3.png',
				},
				screen: ' Tela de 14 polegadas',
				processor: 'Intel Core i5-1135G7',
				memory: '8 GB de RAM, 512 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Intel Iris Xe Graphics',
				price: 2564.05,

				category: 'notebook',
			},
			{
				model: 'Notebook ACER Aspire 5 A515 15.6',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-5-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-5-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-5-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-5-slide-3.png',
				},
				screen: 'Tela de 14 polegadas',
				processor: 'Intel Core i7-1165G7',
				memory: '16 GB de RAM, 1 TB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Intel Iris Xe Graphics 2',
				price: 3181.55,

				category: 'notebook',
			},
			{
				model: 'Acer Aspire 3 A315-24P-R6SK Notebook',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-6-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-6-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-6-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-6-slide-3.png',
				},
				screen: 'Tela de 15,6 polegadas',
				processor: 'Intel Core i7-1165G7',
				memory: '16 GB de RAM, 512 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Intel Iris Xe Graphics 1',
				price: 3041.99,

				category: 'notebook',
			},
			{
				model: 'Asus VivoBook S501UF-EJ282T Gris',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-11-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-11-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-11-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-11-slide-3.png',
				},
				screen: 'Tela de 15,6 polegadas',
				processor: 'Intel Core i5-11300H',
				memory: '8 GB de RAM, 512 GB de armazenamento interno',
				placeVideo: 'placa de vídeo dedicada NVIDIA GeForce RTX 3050 1',
				price: 2249.99,

				category: 'notebook',
			},
			{
				model: '2023 Latest Android 11.0 Tablet',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-2-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-2-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-2-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-2-slide-3.png',
				},
				screen: 'Tela de 11 polegadas',
				processor: 'M2',
				memory: '16 GB de RAM, 2 TB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Intel Iris Xe Graphics 1',
				price: 2345.99,

				category: 'tablet',
			},
			{
				model: 'ZONKO Tablet 10.1 Inch Android Tablet',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-8-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-8-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-8-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-8-slide-3.png',
				},
				screen: 'Tela de 12,4 polegadas',
				processor: 'Qualcomm Snapdragon 888',
				memory: '8 GB de RAM, 256 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Adreno 660 1',
				price: 1519.99,

				category: 'tablet',
			},
			{
				model: 'Android Tablet Pritom 10 inch Android 10 Tablet',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-9-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-9-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-9-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-9-slide-3.png',
				},
				screen: 'Tela de 10,9 polegadas',
				processor: 'A15 Bionic',
				memory: '4 GB de RAM, 256 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Apple GPU 1',
				price: 1526.99,

				category: 'tablet',
			},
			{
				model: 'G-Tab S30 10.1-Inch',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-10-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-10-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-10-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-10-slide-3.png',
				},
				screen: 'Tela de 13 polegadas',
				processor: 'Qualcomm Snapdragon 7c Gen 2',
				memory: '8 GB de RAM, 256 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Adreno 618 1',
				price: 1926.99,

				category: 'tablet',
			},
			{
				model: 'Test Sony Xperia Tablet Z',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-15-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-15-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-15-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-15-slide-3.png',
				},
				screen: 'Tela de 13 polegadas',
				processor: 'Intel Core i7-1185G7',
				memory: '16 GB de RAM, 512 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Intel Iris Xe Graphics 1',
				price: 1758.99,

				category: 'tablet',
			},
			{
				model: 'Smartphone Samsung Galaxy S20',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-3-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-3-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-3-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-3-slide-3.png',
				},
				screen:
					'6,8 polegadas, Dynamic AMOLED 2X, 1440 x 3200 pixels, taxa de atualização de 120 Hz',
				processor:
					'Exynos 2100 (5 nm) - Internacional, Qualcomm SM8350 Snapdragon 888 5G (5 nm) - EUA',
				memory: '12 GB de RAM, 256 GB de armazenamento interno',
				battery:
					'Li-Po 5000 mAh, carregamento rápido de 25 W, carregamento rápido sem fio de 15 W, carregamento reverso sem fio de 4,5 W',
				price: 4234.99,

				category: 'phone',
			},
			{
				model: 'Smartphone Motorola Moto Z Play Xt1635',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-7-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-7-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-7-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-7-slide-3.png',
				},
				screen: 'P-OLED, 6,5 polegadas, 2400×1080 pixels e 120 Hz',
				processor: 'Qualcomm Snapdragon 750G 5G (8 nm)',
				memory: '4 GB de RAM, 128 GB de armazenamento interno',
				battery: ' Li-Po 5000 mAh, carregamento rápido de 20 W',
				price: 1365.99,

				category: 'phone',
			},
			{
				model: 'Smartphone Samsung Galaxy S20 FE 6.5',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-12-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-12-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-12-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-12-slide-3.png',
				},
				screen:
					'6,8 polegadas, Dynamic AMOLED 2X, 1440 x 3200 pixels, taxa de atualização de 120 Hz',
				processor: 'Octa-core, velocidade do processador de até 3,39 GHz',
				memory: '12 GB de RAM, 512 GB de armazenamento interno',
				battery:
					'Li-Po 5000 mAh, carregamento rápido de 25 W, carregamento rápido sem fio de 15 W, carregamento reverso sem fio de 4,5 W',
				price: 2674.99,

				category: 'phone',
			},
			{
				model: 'Celular Iphone 11',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-13-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-13-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-13-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-13-slide-3.png',
				},
				screen:
					'6,1 polegadas, Retina XDR OLED, 1170 x 2532 pixels, taxa de atualização de 60 Hz',
				processor: 'Apple A15 Bionic (5 nm)',
				memory: '4 GB de RAM, 128 GB de armazenamento interno',
				battery:
					'Li-Ion 2815 mAh, carregamento rápido de 20 W, carregamento sem fio de 15 W, carregamento reverso sem fio de 7,5 W',
				price: 6689.99,

				category: 'phone',
			},
			{
				model: 'Smartphone Motorola One XT1941',
				img: 'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-14-slide-1.png',
				slide: {
					slide1:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-14-slide-1.png',
					slide2:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-14-slide-2.png',
					slide3:
						'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/eletrocado-images/image-14-slide-3.png',
				},
				screen: 'P-OLED, 6,5 polegadas, 2400×1080 pixels e 120 Hz',
				processor: 'Qualcomm Snapdragon 750G 5G (8 nm)',
				memory: '4 GB de RAM, 128 GB de armazenamento interno',
				battery: 'Li-Po 5000 mAh, carregamento rápido de 20 W',
				price: 1542.99,

				category: 'phone',
			},
		]);
		console.log('completed insertion of the faker datas');
	} catch (error) {
		console.log(error);
	}
};

seed().finally(() => {
	mongoose
		.disconnect()
		.then(() => {
			console.log('finished connection');
		})
		.catch(() => {
			console.log('error to must finished connection');
		});
});
