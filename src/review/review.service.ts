import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { CreateReviewDto } from './dto/createReview.dto';
import { ReviewDocument, ReviewModel, ReviewSchema } from './review.model';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(ReviewModel.name) private reviewModel: Model<ReviewDocument>) {}

  async create(dto: CreateReviewDto): Promise<ReviewDocument> {
    return this.reviewModel.create(dto);
  }

  async deleteById(id: string): Promise<ReviewDocument | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewDocument[]> {
    return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
  }

  async deleteByProductId(productId: string) {
    return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
  }
}
