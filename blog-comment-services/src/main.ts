import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  // HTTP server for REST API (for Frontend)
  const app = await NestFactory.create(AppModule);

  // gRPC microservice for BlogService
  const blogMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5001',
      package: 'blog',
      protoPath: join(__dirname, '../src/proto/blog.proto')
    }
  });

  // gRPC microservice for CommentService
  const commentMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5002',
      package: 'comment',
      protoPath: join(__dirname, '../src/proto/comment.proto'),
    },
  });

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');

  // Start the gRPC microservices
  await app.startAllMicroservices();
  console.log('gRPC Microservices are running on ports 5001 and 5002');
  
}

bootstrap();
