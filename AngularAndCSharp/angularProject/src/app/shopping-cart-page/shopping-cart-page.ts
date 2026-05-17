
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EventsService } from '../services/events';
import { CartItem, PurchaseRequest, PurchaseResponse, FullPurchasePayload } from '../models/purchases';

@Component({
  selector: 'app-shopping-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart-page.html',
  styleUrls: ['./shopping-cart-page.css'],
})
export class ShoppingCartPage {

  private eventService = inject(EventsService);
  private router = inject(Router);

  readonly cartItems = this.eventService.cartItems;
  readonly totalAmount = this.eventService.totalAmount;

  couponCodeInput: string = "";
  couponMessage: string = "";
  discountApplied: boolean = false;

  ngOnInit() {
    this.checkAutoDiscount();
  }

  checkAutoDiscount() {
    const user = this.eventService.getCurrentUser();
    if (user) {
      this.eventService.checkCouponEligibility();
      this.eventService.eligible$.subscribe(eligible => {
        if (eligible) {
          this.discountApplied = true;
          this.couponMessage = "✔ זכאי להנחת לקוח חדש! 5% הנחה הוחלה אוטומטית 🎉";
        }
      });
    }
  }

  get displayTotal() {
    const basicTotal = this.totalAmount();
    if (this.discountApplied) {
      return this.eventService.getDiscountedPrice(basicTotal);
    }
    return basicTotal;
  }

  applyCoupon() {
    if (this.eventService.validateCoupon(this.couponCodeInput)) {
      this.couponMessage = "✔ הקופון הופעל! קיבלת 5% הנחה 🎉";
      this.discountApplied = true;
    } else {
      this.couponMessage = "❌ הקופון לא תקף או שפג תוקפו";
      this.discountApplied = false;
    }
  }

  removeFromCart(productId: number): void {
    this.eventService.removeFromCart(productId);
  }

  increaseQuantity(productId: number): void {
    this.eventService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.eventService.decreaseQuantity(productId);
  }

  showPaymentForm: boolean = false;
  isPurchasing: boolean = false;
  purchaseSuccess: boolean = false;
  purchaserName: string = '';
  showLimitModal: boolean = false;

  purchaseData: PurchaseRequest = {
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  };

  openPaymentForm(): void {
    if (this.cartItems().length === 0) {
      alert('סל הקניות ריק. אנא הוסף פריטים לרכישה.');
      return;
    }
    if (this.displayTotal > 5000) {
      this.showLimitModal = true;
      return;
    }
    this.showPaymentForm = true;
  }

  backToDetails(): void {
    this.showPaymentForm = false;
  }

  submitPurchase(): void {
    // בדיקת שדות חובה
    if (!this.purchaseData.fullName ||
        !this.purchaseData.cardNumber ||
        !this.purchaseData.expiryDate ||
        !this.purchaseData.cvv) {
      alert('נא למלא את כל השדות החובה');
      return;
    }

    // בדיקה נוספת אם הסכום מעל 5000
    if (this.displayTotal > 5000) {
      this.showLimitModal = true;
      return;
    }

    this.isPurchasing = true;

    const purchasePayload: FullPurchasePayload = {
      ...this.purchaseData,
      items: this.cartItems(),
      totalAmount: this.displayTotal
    };

    this.eventService.processPurchase(purchasePayload).subscribe({
      next: (response: PurchaseResponse) => {
        this.isPurchasing = false;
        this.purchaseSuccess = true;
        this.purchaserName = this.purchaseData.fullName;

        this.eventService.clearCart();
      },
      error: (error) => {
        console.error(error);
        alert('שגיאה ברכישה. אנא נסה שוב.');
        this.isPurchasing = false;
      },
    });
  }

  continueAddingTickets(): void {
    this.purchaseSuccess = false;
    this.showPaymentForm = false;

    this.purchaseData = {
      fullName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    };

    this.router.navigate(['/']);
  }

  closeSuccess(): void {
    this.purchaseSuccess = false;
    this.router.navigate(['/']);
  }

  closeLimitModal(): void {
    this.showLimitModal = false;
  }
}