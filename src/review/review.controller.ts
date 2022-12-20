import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/common/decorators/user-email.decorator';
import { CreateReviewDto } from './dto/createReview.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constant';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';
import { TelegramService } from 'src/telegram/telegram.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService, private telegramService: TelegramService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('notify')
  async notify(@Body() dto: CreateReviewDto) {
    const message = `Name: ${dto.name}\n Title ${dto.title}\n Descriptio ${dto.description}`;
    return this.telegramService.sendMessage(message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id', IdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.deleteById(id);
    if (!deletedDoc) {
      throw new NotFoundException(REVIEW_NOT_FOUND);
    }
    return deletedDoc;
  }

  @Get('byProduct/:productId')
  async getByProductId(
    @Param('productId', IdValidationPipe) productId: string,
    @UserEmail() email: string,
  ) {
    return this.reviewService.findByProductId(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('byProduct/:productId')
  async deleteByProductId(@Param('productId', IdValidationPipe) productId: string) {
    return this.reviewService.deleteByProductId(productId);
  }
}
