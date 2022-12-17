import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewModel, ReviewSchema } from './review.model';
import { ReviewService } from './review.service';

@Schema({
  timestamps: true,
  id: true,
})
@Module({
  controllers: [ReviewController],
  imports: [MongooseModule.forFeature([{ name: ReviewModel.name, schema: ReviewSchema }])],
  providers: [ReviewService],
})
export class ReviewModule {}
