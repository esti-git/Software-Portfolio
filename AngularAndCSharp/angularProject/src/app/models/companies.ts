export class Companies {
  companyId: number;
  companyName: string;
  contactEmail: string;
  phone: string;

  constructor(
    companyId: number, companyName: string,contactEmail: string,phone: string
  ) {
    this.companyId = companyId;
    this.companyName = companyName;
    this.contactEmail = contactEmail;
    this.phone = phone;
  }
}
