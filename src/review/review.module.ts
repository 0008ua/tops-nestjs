import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { TelegramModule } from 'src/telegram/telegram.module';
import { ReviewController } from './review.controller';
import { ReviewModel, ReviewSchema } from './review.model';
import { ReviewService } from './review.service';

@Schema({
  timestamps: true,
  id: true,
})
@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([{ name: ReviewModel.name, schema: ReviewSchema }]),
    TelegramModule,
  ],
  providers: [ReviewService],
})
export class ReviewModule {}
