import { Injectable, signal, computed, inject, WritableSignal, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from './events';
import { Event } from '../models/events';
import { PurchaseRequest } from '../models/purchases'
@Injectable()
export class TransactionFlowService implements OnDestroy {
  private eventsService = inject(EventsService);

  public purchaseData: WritableSignal<PurchaseRequest> = signal({
    fullName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  public isPurchasing = signal(false);
  public purchaseSuccess = signal(false);
  public errorMessage = signal<string | null>(null);

  public purchaserName = computed(() => this.purchaseData().fullName);

  private subscription: Subscription = new Subscription();

  public submitPurchase(event: Event): void {
    const data = this.purchaseData();
    this.errorMessage.set(null);

    if (!data.fullName || !data.cardNumber || !data.cvv) {
      this.errorMessage.set('נא למלא את כל שדות החובה.');
      return;
    }

    this.isPurchasing.set(true);

    this.subscription.add(
      this.eventsService.purchaseTicket(event.productId, data).subscribe({
        next: (response) => {
          this.isPurchasing.set(false);
          this.purchaseSuccess.set(true);
        },
        error: (error) => {
          console.error('❌ שגיאה ברכישה:', error);
          this.errorMessage.set('שגיאה ברכישת כרטיס. נסה שוב.');
          this.isPurchasing.set(false);
          this.purchaseSuccess.set(false);
        }
      })
    );
  }

  public resetPurchaseState(): void {
    this.isPurchasing.set(false);
    this.purchaseSuccess.set(false);
    this.errorMessage.set(null);
    this.purchaseData.update(d => ({
      ...d,
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}