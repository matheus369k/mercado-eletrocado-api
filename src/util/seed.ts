import mongoose from 'mongoose';
import { mongoDb } from '@/db/mongo/mongo';

const seed = async () => {
	try {
		const { Products } = await mongoDb();
		await Products.deleteMany();
		await Products.insertMany([
			{
				model: 'Notebook Samsung Galaxy Book 3 360',
				img: 'https://drive.google.com/thumbnail?id=1pfmWy0ekTQzl-XQZWuYcKLS8NdY3zNVP&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=1pfmWy0ekTQzl-XQZWuYcKLS8NdY3zNVP&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1evuvxMOvD8LyYeJ1Jmkdm1TnaGF6GdlS&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1C7d44PnGmQ9kXle2Sk9hb8rfQa-tOXnI&sz=w549',
				},
				screen: 'Tela de 14 polegadas',
				processor: 'Intel Core i5-1135G7',
				memory: '8 GB de RAM, 256 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Intel Iris Xe Graphics',
				price: 923896,
				category: 'notebook',
			},
			{
				model: 'Lenovo V130-14IKB 81HQ',
				img: 'https://drive.google.com/thumbnail?id=1Pc_Dlxody5Pi_D8u38LXbai4MHeRcynT&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=1Pc_Dlxody5Pi_D8u38LXbai4MHeRcynT&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1AmG3BW21umUVyhFVqcNLu9fLO1MnlwGc&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1PHA6HTcw2SGskv49yZZPryzVKAeh8HKX&sz=w549',
				},
				screen: ' Tela de 14 polegadas',
				processor: 'Intel Core i5-1135G7',
				memory: '8 GB de RAM, 512 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Intel Iris Xe Graphics',
				price: 256405,

				category: 'notebook',
			},
			{
				model: 'Notebook ACER Aspire 5 A515 15.6',
				img: 'https://drive.google.com/thumbnail?id=1nmDfRq36KWvZxAECKgTPdw9dDlwVrg2A&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=1nmDfRq36KWvZxAECKgTPdw9dDlwVrg2A&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1PcbAaCulFc_qn06oAzIOQZ8KkXqXRQn2&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1Nh4wSnYlkNabtOcwD_2iDtIOINkdRan9&sz=w549',
				},
				screen: 'Tela de 14 polegadas',
				processor: 'Intel Core i7-1165G7',
				memory: '16 GB de RAM, 1 TB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Intel Iris Xe Graphics 2',
				price: 318155,

				category: 'notebook',
			},
			{
				model: 'Acer Aspire 3 A315-24P-R6SK Notebook',
				img: 'https://drive.google.com/thumbnail?id=1Lwbx6IReLlhjqe5UTUsXxSRllvoAXteM&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=1Lwbx6IReLlhjqe5UTUsXxSRllvoAXteM&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1xwH3_cAhbYF1ravEhNRrFJ-107X5pgR8&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1kg-_ZyM7SVeiwXY_BdMhQ-lqU6ai5LIe&sz=w549',
				},
				screen: 'Tela de 15,6 polegadas',
				processor: 'Intel Core i7-1165G7',
				memory: '16 GB de RAM, 512 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Intel Iris Xe Graphics 1',
				price: 304199,

				category: 'notebook',
			},
			{
				model: 'Asus VivoBook S501UF-EJ282T Gris',
				img: 'https://drive.google.com/thumbnail?id=1USSThTgAL0-Wlrlt10AldjP11mVJgqqh&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=1USSThTgAL0-Wlrlt10AldjP11mVJgqqh&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1vsNZqBnFXU7HZEN34a-c28nnSi0LQQk3&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=134wX3J3XXYqsi_Fe-UnsGAXGvlbgxMLx&sz=w549',
				},
				screen: 'Tela de 15,6 polegadas',
				processor: 'Intel Core i5-11300H',
				memory: '8 GB de RAM, 512 GB de armazenamento interno',
				placeVideo: 'placa de vídeo dedicada NVIDIA GeForce RTX 3050 1',
				price: 224999,

				category: 'notebook',
			},
			{
				model: '2023 Latest Android 11.0 Tablet',
				img: 'https://drive.google.com/thumbnail?id=1KhkkS0F3_ftQWgfbvfo_J34PSE-cQaZw&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=1KhkkS0F3_ftQWgfbvfo_J34PSE-cQaZw&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1b1KNaaaT-Ryz5mYk__RTDjZCg5ElyuKa&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1sgPCj2vhC03Sx54LpASlr8MZO3lh85r4&sz=w549',
				},
				screen: 'Tela de 11 polegadas',
				processor: 'M2',
				memory: '16 GB de RAM, 2 TB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Intel Iris Xe Graphics 1',
				price: 234599,

				category: 'tablet',
			},
			{
				model: 'ZONKO Tablet 10.1 Inch Android Tablet',
				img: 'https://drive.google.com/thumbnail?id=19B-x1tzipgqgOaGDEQ9eEMo4oyK-pvU7&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=19B-x1tzipgqgOaGDEQ9eEMo4oyK-pvU7&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1NKwYdr0JOqRTLPmL3o2XMdD7WdcvqvNz&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1QXhRi4yu2wODcrRRIwxnviKU2JdhPPGm&sz=w549',
				},
				screen: 'Tela de 12,4 polegadas',
				processor: 'Qualcomm Snapdragon 888',
				memory: '8 GB de RAM, 256 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Adreno 660 1',
				price: 151999,

				category: 'tablet',
			},
			{
				model: 'Android Tablet Pritom 10 inch Android 10 Tablet',
				img: 'https://drive.google.com/thumbnail?id=1n41Y14VhZ0tRclUx2wgSvs0uAUTXsAlw&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=1n41Y14VhZ0tRclUx2wgSvs0uAUTXsAlw&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1Z9HdV4QZXuL9TYT57em60gwprh8bsCCZ&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1xrUSyqxCqFMsFFsfihO4AFrRqRpy6T_R&sz=w549',
				},
				screen: 'Tela de 10,9 polegadas',
				processor: 'A15 Bionic',
				memory: '4 GB de RAM, 256 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Apple GPU 1',
				price: 152699,

				category: 'tablet',
			},
			{
				model: 'G-Tab S30 10.1-Inch',
				img: 'https://drive.google.com/thumbnail?id=180-OluhYT1b_8mgLJI384x0aX_u9DiC-&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=180-OluhYT1b_8mgLJI384x0aX_u9DiC-&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1M1Lax31kPaha0zoc5DHHwhhFaXWvm5aL&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=18Rwu_G97c9ZtHIU3kOIkE2TkxMxz5zLQ&sz=w549',
				},
				screen: 'Tela de 13 polegadas',
				processor: 'Qualcomm Snapdragon 7c Gen 2',
				memory: '8 GB de RAM, 256 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Adreno 618 1',
				price: 192699,

				category: 'tablet',
			},
			{
				model: 'Test Sony Xperia Tablet Z',
				img: 'https://drive.google.com/thumbnail?id=1A2CaZsbx_ffWDCgDAzpL_iaD4ZWDFAfb&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=1A2CaZsbx_ffWDCgDAzpL_iaD4ZWDFAfb&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=16X5eWjBf5BMYWtp6hjMDbTU_FAVbIaA5&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1ccSbP85AVXl6SD_WW1l-I3L-bx4K0J05&sz=w549',
				},
				screen: 'Tela de 13 polegadas',
				processor: 'Intel Core i7-1185G7',
				memory: '16 GB de RAM, 512 GB de armazenamento interno',
				placeVideo: 'placa de vídeo integrada Intel Iris Xe Graphics 1',
				price: 175899,

				category: 'tablet',
			},
			{
				model: 'Smartphone Samsung Galaxy S20',
				img: 'https://drive.google.com/thumbnail?id=1I_UeL1Ecft5HNWJgZXwmex8RyJE2xG3O&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=1I_UeL1Ecft5HNWJgZXwmex8RyJE2xG3O&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1Us2j9Lfm499SKZG4Za59t9ILxXBGf1NR&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1qi5kGX4T6rDntZ6SVFfzlqZIadAzKloZ&sz=w549',
				},
				screen:
					'6,8 polegadas, Dynamic AMOLED 2X, 1440 x 3200 pixels, taxa de atualização de 120 Hz',
				processor:
					'Exynos 2100 (5 nm) - Internacional, Qualcomm SM8350 Snapdragon 888 5G (5 nm) - EUA',
				memory: '12 GB de RAM, 256 GB de armazenamento interno',
				battery:
					'Li-Po 5000 mAh, carregamento rápido de 25 W, carregamento rápido sem fio de 15 W, carregamento reverso sem fio de 4,5 W',
				price: 423499,

				category: 'phone',
			},
			{
				model: 'Smartphone Motorola Moto Z Play Xt1635',
				img: 'https://drive.google.com/thumbnail?id=18pGcxbLF-4W4JmG1RG5k7-GjXaoj8uZP&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=18pGcxbLF-4W4JmG1RG5k7-GjXaoj8uZP&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1pht6sOokJFopUJsfwoYyWPsrt4me6nPa&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1zqtsCrqPb6VrLzOdkLo0PUMi_ZHHI7Q7&sz=w549',
				},
				screen: 'P-OLED, 6,5 polegadas, 2400×1080 pixels e 120 Hz',
				processor: 'Qualcomm Snapdragon 750G 5G (8 nm)',
				memory: '4 GB de RAM, 128 GB de armazenamento interno',
				battery: ' Li-Po 5000 mAh, carregamento rápido de 20 W',
				price: 136599,

				category: 'phone',
			},
			{
				model: 'Smartphone Samsung Galaxy S20 FE 6.5',
				img: 'https://drive.google.com/thumbnail?id=1o7qbELSIT8jyRjTHEiw1thXKpFdf8yo2&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=1o7qbELSIT8jyRjTHEiw1thXKpFdf8yo2&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1iD4mcsGu1rhSONr6en-GWzMAxxuzUXKV&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1UeTVOW-GQkHF35Or0pjn5OP6GgpRy82K&sz=w549',
				},
				screen:
					'6,8 polegadas, Dynamic AMOLED 2X, 1440 x 3200 pixels, taxa de atualização de 120 Hz',
				processor: 'Octa-core, velocidade do processador de até 3,39 GHz',
				memory: '12 GB de RAM, 512 GB de armazenamento interno',
				battery:
					'Li-Po 5000 mAh, carregamento rápido de 25 W, carregamento rápido sem fio de 15 W, carregamento reverso sem fio de 4,5 W',
				price: 267499,

				category: 'phone',
			},
			{
				model: 'Celular Iphone 11',
				img: 'https://drive.google.com/thumbnail?id=1a5bk0fd_R5STE5PrDM1MTQRqxazJhAcH&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=1a5bk0fd_R5STE5PrDM1MTQRqxazJhAcH&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=1XQB7Tgp1E7yzVvaqsplLHOLaREXLdeoa&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1rYHd-4DgUbb18tqmcmBBNvHOcpC0uiyu&sz=w549',
				},
				screen:
					'6,1 polegadas, Retina XDR OLED, 1170 x 2532 pixels, taxa de atualização de 60 Hz',
				processor: 'Apple A15 Bionic (5 nm)',
				memory: '4 GB de RAM, 128 GB de armazenamento interno',
				battery:
					'Li-Ion 2815 mAh, carregamento rápido de 20 W, carregamento sem fio de 15 W, carregamento reverso sem fio de 7,5 W',
				price: 668999,

				category: 'phone',
			},
			{
				model: 'Smartphone Motorola One XT1941',
				img: 'https://drive.google.com/thumbnail?id=1TBt6U4I5ctGTaUbx2m-7eyJdhL-0AuZp&sz=w549',
				slide: {
					slide1:
						'https://drive.google.com/thumbnail?id=1TBt6U4I5ctGTaUbx2m-7eyJdhL-0AuZp&sz=w549',
					slide2:
						'https://drive.google.com/thumbnail?id=169Pc1an5GjG7X2d2hA6C9Hc5lgWZwNMj&sz=w549',
					slide3:
						'https://drive.google.com/thumbnail?id=1qOm-V4bDxPVC03-WvJ-C4lPQ0skMGJWG&sz=w549',
				},
				screen: 'P-OLED, 6,5 polegadas, 2400×1080 pixels e 120 Hz',
				processor: 'Qualcomm Snapdragon 750G 5G (8 nm)',
				memory: '4 GB de RAM, 128 GB de armazenamento interno',
				battery: 'Li-Po 5000 mAh, carregamento rápido de 20 W',
				price: 154299,

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
