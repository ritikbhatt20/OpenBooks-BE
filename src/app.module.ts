import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './config/mongoose.module';
import { SolanaModule } from './solana/solana.module'; // Import SolanaModule
import { AuthMiddleware } from './users/middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    SolanaModule, // Add SolanaModule here
    UsersModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
