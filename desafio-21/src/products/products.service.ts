import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from 'src/dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    const existingProduct = await this.productModel.findById(id).exec();
    if (!existingProduct) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    return existingProduct;
  }

  async deleteById(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    return deletedProduct;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!existingProduct) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    return existingProduct;
  }
}
