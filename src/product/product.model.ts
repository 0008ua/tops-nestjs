import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

class ProductCharacteristic {
  @Prop()
  name: string;

  @Prop()
  value: string;
}

@Schema({
  timestamps: true,
  collection: 'products',
})
export class ProductModel {
  @Prop()
  image: string;

  @Prop()
  title: string;

  // @Prop()
  // link: string;

  // @Prop()
  // initialRating: number;

  @Prop()
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop()
  credit: number;

  @Prop()
  description: string;

  @Prop()
  advantages: string;

  @Prop()
  disAdvantages?: string;

  @Prop({ type: () => [String] })
  categories: string[];

  @Prop({ type: () => [String] })
  tags: string[];

  @Prop({
    type: () => [ProductCharacteristic],
    _id: false,
  })
  characteristics: ProductCharacteristic[];
  // {
  //   [key: string]: string;
  // };
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
