import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Si necesitas enviar cookies o headers de autenticación
  });
  
  app.useGlobalPipes(new ValidationPipe({
     whitelist: true,
  }));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();