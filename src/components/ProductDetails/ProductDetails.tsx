import { useEffect, useState, type FunctionComponent } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../Loader";
import classes from './ProductDetails.module.scss'

export type Review = {
  rating: number
  comment: string
  date: string | Date
  reviewerName: string
  reviewerEmail: string
}

export type Product = {
  title: string
  images: string[]
  description: string
  reviews: Review[]
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
}

export const ProductDetails: FunctionComponent = () => {
  const API_URL: string = 'https://dummyjson.com/products'
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
        setReviews(data.reviews || [])
      });
  }, [id])

  if (loading) return <Loader />
  if (!product) return <div>Product not found</div>

  return (
    <div className={classes.product}>
      <h1>{product.title}</h1>
      <h3>{product.description}</h3>
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
      <div>
        <strong>Meta:</strong>
        <ul>
          <li>Created At: {new Date(product.meta.createdAt).toLocaleString()}</li>
          <li>Updated At: {new Date(product.meta.updatedAt).toLocaleString()}</li>
          <li>Barcode: {product.meta.barcode}</li>
          <li className={classes.qrCode}>
            QR Code: <img src={product.meta.qrCode} alt="QR Code" style={{ height: 60 }} />
          </li>
        </ul>
      </div>
      <div className={classes.images}>
        {product.images.map((image, idx) => (
          <img key={image} src={image} alt={`Product image ${idx + 1}`} />
        ))}
      </div>
      <h3>Reviews</h3>
      {!!reviews && reviews.map(review => {
        const dateObj = new Date(review.date);
        const formattedDate = `${dateObj.getFullYear()}/
        ${String(dateObj.getMonth() + 1).padStart(2, '0')}/
        ${String(dateObj.getDate()).padStart(2, '0')}
        ${String(dateObj.getHours()).padStart(2, '0')}:
        ${String(dateObj.getMinutes()).padStart(2, '0')}`;
        return (
          <p key={review.reviewerEmail + review.date.toString()}>
            <span>
              {review.rating} {review.comment} {formattedDate} {review.reviewerName} {review.reviewerEmail}
            </span>
          </p>
        );
      })}
    </div>
  )
}
