import type { FC } from "react";
import type { ProductDetail } from "../../types";
import classes from './ProductInfo.module.scss';

interface ProductInfoProps {
  product: ProductDetail;
}

export const ProductInfo: FC<ProductInfoProps> = ({ product }) => (
  <>
    <div>
      <strong>Category:</strong> {product.category}
    </div>
    <div>
      <strong>Price:</strong> ${product.price} &nbsp;
      <strong>Discount:</strong> {product.discountPercentage}%
    </div>
    <div>
      <strong>Rating:</strong> {product.rating} &nbsp;
      <strong>Stock:</strong> {product.stock}
    </div>
    <div>
      <strong>Tags:</strong> {product.tags && product.tags.join(', ')}
    </div>
    <div>
      <strong>Brand:</strong> {product.brand} &nbsp;
      <strong>SKU:</strong> {product.sku}
    </div>
    <div>
      <strong>Weight:</strong> {product.weight}g
    </div>
    <div>
      <strong>Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth}
    </div>
    <div>
      <strong>Warranty:</strong> {product.warrantyInformation}
    </div>
    <div>
      <strong>Shipping:</strong> {product.shippingInformation}
    </div>
    <div>
      <strong>Availability:</strong> {product.availabilityStatus}
    </div>
    <div>
      <strong>Return Policy:</strong> {product.returnPolicy}
    </div>
    <div>
      <strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity}
    </div>
  </>
);
