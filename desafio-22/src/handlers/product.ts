import { Context, helpers } from "../deps";
import type { Product } from "../types/product";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../db/product";

export const handleAll = async (ctx: Context) => {
  ctx.response.body = getAllProducts();
};

export const handleFindProduct = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const product = getProductById(id);

  if (!product) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Product not found" };
    return;
  }

  ctx.response.body = product;
};

export const handleCreate = async (ctx: Context) => {
  const { title, description, price } = await ctx.request.body().value;
  const newProduct: Product = {
    id: "to be added",
    title,
    description,
    price,
  };
  addProduct(newProduct);
  ctx.response.body = newProduct;
};

export const handleUpdate = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const product = updateProduct(
    id,
    (await ctx.request.body().value) as Partial<Product>
  );
  if (product) {
    ctx.response.body = product;
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Product not found" };
  }
};

export const handleDeleteProduct = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const result = deleteProduct(id);
  if (result) {
    ctx.response.status = 204;
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Product not found" };
  }
};
