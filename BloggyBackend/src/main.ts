import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { LoggingService } from './logging-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  app.use((req, res, next) => {
    loggingService.logRequest(req, req.method, 'HTTP');
    next();
  });

  const blogMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5001',
      package: 'blog',
      protoPath: join(__dirname, '../src/proto/blog.proto')
    }
  });

  const commentMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5002',
      package: 'comment',
      protoPath: join(__dirname, '../src/proto/comment.proto'),
    },
  });

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });


  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');

  await app.startAllMicroservices();
  console.log('gRPC Microservices are running on ports 5001 and 5002');


}

bootstrap();
