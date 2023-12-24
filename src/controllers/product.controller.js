import {
  createSuccessResponse,
  notFoundResponse,
  serverErrorResponse,
  successResponse,
} from "../utils/api.response.js";
import ProductModel from "../models/product.model.js";
import { Sequelize } from "sequelize";
import { sequelize } from "../utils/database.js";

export const registerProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    let added_by = req.user.id;

    await sequelize.query(
      "CALL usp_ins_product(:name, :description, :price, :added_by)",
      {
        replacements: { name, description, price, added_by },
      }
    );

    return createSuccessResponse("Product registered successfully ", null, res);
  } catch (error) {
    return serverErrorResponse(error, res);
  }
};

export const getProducts = async (req, res) => {
  try {
    let result = await sequelize.query("CALL usp_list_product()", {
      type: Sequelize.QueryTypes.SELECT,
      outFormat: Sequelize.QueryTypes.SELECT,
    });
    result = result[0];

    const products =
      result && typeof result === "object" && Object.values(result).length > 0
        ? Object.values(result).map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
          }))
        : [];

    return successResponse("Products", products, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};

export const getProductById = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await findOneProduct(id);

    if (product == null) return notFoundResponse("id", id, "Product", res);

    return successResponse("Products", product, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await findOneProduct(productId);

    if (product == null) return notFoundResponse("id", productId, "Product", res);

    await sequelize.query("CALL usp_del_product(:productId)", {
      replacements: { productId },
      type: Sequelize.QueryTypes.DELETE,
    });

    return successResponse(
      `Product with ID ${productId} deleted successfully.`,
      null,
      res
    );
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const {id} = req.params

    const product = await findOneProduct(id);

    if (product == null) return notFoundResponse("id", id, "Product", res);

    const { name, description, price } = req.body;

    await sequelize.query('CALL usp_upd_product(:id, :name, :description, :price)', {
      replacements: { id, name, description, price },
      type: Sequelize.QueryTypes.UPDATE,
    });

    return successResponse(`Product with ID ${id} updated successfully.`, null, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};


const findOneProduct = async (id) => {
  let result = await sequelize.query(`CALL usp_get_product(${id})`, {
    type: Sequelize.QueryTypes.SELECT,
    outFormat: Sequelize.QueryTypes.SELECT,
  });
  result = result[0];

  const product =
    result && typeof result === "object" && Object.values(result).length > 0
      ? Object.values(result).map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
        }))[0]
      : null;

  return product;
};
