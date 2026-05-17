export class PurchaseDetail {
  detailId: number;
  purchaseId: number;
  productId: number;
  quantity: number;
  price: number;

  constructor(
    detailId: number,
    purchaseId: number,
    productId: number,
    quantity: number,
    price: number
  ) {
    this.detailId = detailId;
    this.purchaseId = purchaseId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}
