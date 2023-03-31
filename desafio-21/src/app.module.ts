import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LalaController } from './lala/lala.controller';

@Module({
  imports: [],
  controllers: [AppController, LalaController],
  providers: [AppService],
})
export class AppModule {}
