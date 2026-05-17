export class Event {
  [x: string]: any;
  productId: number;
  name: string;
  description: string;
  eventDate: string;
  location: string;
  ageMin: number;
  categoryId: number;
  companyId: number;
  price: number;
  createdAt: string;
  imageUrl: string;

  constructor(
    productId: number,
    name: string,
    description: string,
    eventDate: string,
    location: string,
    ageMin: number,
    categoryId: number,
    companyId: number,
    price: number,
    createdAt: string,
    imageUrl: string
    ) {
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.eventDate = eventDate;
    this.location = location;
    this.ageMin = ageMin;
    this.categoryId = categoryId;
    this.companyId = companyId;
    this.price = price;
    this.createdAt = createdAt;
    this.imageUrl = imageUrl;

  }
}

