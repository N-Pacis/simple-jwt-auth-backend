import {
  createSuccessResponse,
  serverErrorResponse,
  successResponse,
} from "../utils/api.response.js";
import ProductModel from "../models/product.model.js";

export const registerProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price
    } = req.body;

    let added_by = req.user.id;

    const product = await ProductModel.create({
      name,
      description,
      price,
      added_by,
    });

    return createSuccessResponse(
      "Product registered successfully ",
      product,
      res
    );
  } catch (error) {
    return serverErrorResponse(error, res);
  }
};

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const options = {
      offset: (page - 1) * limit,
      limit: limit,
      order: [["createdAt", "DESC"]],
    };

    const { count, rows: products } = await ProductModel.findAndCountAll(options);

    const totalPages = Math.ceil(count / limit);
    const returnObject = {
      data: products,
      currentPage: page,
      totalPages: totalPages,
      totalData: count,
    };

    return successResponse("Products", returnObject, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};
