import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config-module/config-module.module'; // Adjust the path based on your directory structure
import { ConfigService } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { BlogModule } from './blog/blog.module';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { LoggingService } from './logging-service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [
          __dirname + '/blog/entities/blog.entity{.ts,.js}',
          __dirname + '/comment/entities/comment.entity{.ts,.js}'
        ],
      }),
    }),
    ClientsModule.register([
      {
        name: 'BLOG_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5001',
          package: 'blog',
          protoPath: join(__dirname, '../src/proto/blog.proto'), 
        },
      },
      {
        name: 'COMMENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5002',
          package: 'comment',
          protoPath: join(__dirname, '../src/proto/comment.proto'),
        },
      },
    ]),
    BlogModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [LoggingService],
  exports: [LoggingService]
})
export class AppModule { }
