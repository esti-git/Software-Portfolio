
import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { EventsService } from './services/events';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, RouterOutlet, RouterLink], 
    templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  showCouponMessage = false;
  private couponSubscription?: Subscription;

  constructor(public customerService: EventsService) { }

  ngOnInit() {
    this.couponSubscription = this.customerService.showCouponMessage$.subscribe(show => {
      this.showCouponMessage = show;
    });

    const currentUser = this.customerService.getCurrentUser();
    if (currentUser) {
       this.showCouponMessage = this.customerService.hasCouponMessage();
  this.customerService.checkCouponEligibility();
    }
  }

  toggleCouponMessage() {
    if (this.customerService.hasCouponMessage()) {
      this.showCouponMessage = !this.showCouponMessage;
    }
  }

  closeCouponMessage() {
    this.customerService.clearCouponMessage(); // מוחק את המפתח (ומעלים את העיגול האדום)
    this.showCouponMessage = false; // מסתיר את חלון ההודעה
  }


  ngOnDestroy() {
    if (this.couponSubscription) {
      this.couponSubscription.unsubscribe();
    }
  }

  protected readonly title = signal('angularProject');
}