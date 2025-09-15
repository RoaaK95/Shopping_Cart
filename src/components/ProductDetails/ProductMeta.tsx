import type { FC } from "react";
import type { ProductDetail } from "../../types";

interface ProductMetaProps {
  meta: ProductDetail["meta"];
  qrCodeClassName?: string;
}

export const ProductMeta: FC<ProductMetaProps> = ({ meta, qrCodeClassName }) => (
  <div>
    <strong>Meta:</strong>
    <ul>
      <li>Created At: {new Date(meta.createdAt).toLocaleString()}</li>
      <li>Updated At: {new Date(meta.updatedAt).toLocaleString()}</li>
      <li>Barcode: {meta.barcode}</li>
      <li className={qrCodeClassName}>
        QR Code: <img src={meta.qrCode} alt="QR Code"   />
      </li>
    </ul>
  </div>
);
