import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());

  await dataSource.synchronize(true);

  const productRepo = dataSource.getRepository('Product');
  await productRepo.insert([
    {
      id: 'f3f3e3e3-3f6d-4272-a8f2-44b82c05ecc0',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      image_url: 'http://localhost:9000/products/1.png',
    },
    {
      id: '740d95cb-c9be-4c2c-992d-8ad53e6b5d0c',
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      image_url: 'http://localhost:9000/products/2.png',
    },
    {
      id: '04c4353a-3f6d-4272-a8f2-44b82c05ecc0',
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
      image_url: 'http://localhost:9000/products/3.png',
    },
    {
      id: '04c4353a-3f6d-4272-a8f2-44b82c05ecc1',
      name: 'Product 4',
      description: 'Description 4',
      price: 400,
      image_url: 'http://localhost:9000/products/4.png',
    },
    {
      id: '04c4353a-3f6d-4272-a8f2-44b82c05ecc2',
      name: 'Product 5',
      description: 'Description 5',
      price: 500,
      image_url: 'http://localhost:9000/products/5.png',
    },
    {
      id: '04c4353a-3f6d-4272-a8f2-44b82c05ecc3',
      name: 'Product 6',
      description: 'Description 6',
      price: 600,
      image_url: 'http://localhost:9000/products/6.png',
    },
    {
      id: '04c4353a-3f6d-4272-a8f2-44b82c05ecc4',
      name: 'Product 7',
      description: 'Description 7',
      price: 700,
      image_url: 'http://localhost:9000/products/7.png',
    },
    {
      id: '04c4353a-3f6d-4272-a8f2-44b82c05ecc5',
      name: 'Product 8',
      description: 'Description 8',
      price: 800,
      image_url: 'http://localhost:9000/products/8.png',
    },
    {
      id: '04c4353a-3f6d-4272-a8f2-44b82c05ecc6',
      name: 'Product 9',
      description: 'Description 9',
      price: 900,
      image_url: 'http://localhost:9000/products/9.png',
    },
    {
      id: '04c4353a-3f6d-4272-a8f2-44b82c05ecc7',
      name: 'Product 10',
      description: 'Description 10',
      price: 1000,
      image_url: 'http://localhost:9000/products/10.png',
    },
    {
      id: '04c4353a-3f6d-4272-a8f2-44b82c05ecc8',
      name: 'Product 11',
      description: 'Description 11',
      price: 1100,
      image_url: 'http://localhost:9000/products/11.png',
    },
    {
      id: '04c4353a-3f6d-4272-a8f2-44b82c05ecc9',
      name: 'Product 12',
      description: 'Description 12',
      price: 1200,
      image_url: 'http://localhost:9000/products/12.png',
    },
  ]);

  await app.close();
}
bootstrap();
