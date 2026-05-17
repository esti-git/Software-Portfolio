import { Component, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Event } from '../models/events';
import { EventsService } from '../services/events';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prodact-detiels',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, DatePipe, CurrencyPipe],
  templateUrl: './prodact-detiels.html',
  styleUrl: './prodact-detiels.css',
})
export class ProdactDetiels implements OnInit, OnDestroy {

  @Input() event: Event | null | undefined = null;

  @Output() closeModal = new EventEmitter<void>();

  isLoading = true;
  private subscriptions = new Subscription();

  constructor(
    private eventService: EventsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = false;
    if (this.event) {
      console.log('🎬 פרטי מוצר נטענו. שם:', this.event.name);
    } else {
      console.warn('קומפוננטה נטענה ללא נתונים.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }

  addToCart(): void {
    if (!this.event) {
      console.error('שגיאה: חסר מוצר להוספה לסל!');
      return;
    }

    this.eventService.addToCart(this.event);

    const eventName = this.event.name || 'המוצר';
    console.log(`✅ המוצר "${eventName}" נוסף בהצלחה לסל הקניות.`);

    this.onCloseModal();

  }

  stopPropagation($event: MouseEvent): void {
    $event.stopPropagation();
  }
}