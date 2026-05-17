import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events';
import { Event } from '../models/events';
import { NgFor } from '@angular/common';
import { Categories } from '../models/categories';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdactDetiels } from '../prodact-detiels/prodact-detiels';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ProdactDetiels],
  selector: 'ProdactDetiels',
  templateUrl: './prodact-list-page.html',
  styleUrls: ['./prodact-list-page.css'],
})
export class ProdactsListPage implements OnInit {
  events: Event[] = [];
  filterEvents: Event[] = [];

  categories: Categories[] = [];
  minAge: number = 0;
  isFilterMenuOpen: boolean = false;
  sortAscending = true;
  serverBaseUrl: string = 'https://localhost:7003';
  selectedEvent: Event | null = null;
  showModal: boolean = false;
  public selectedCategoryId: number = 0;


  constructor(private eventService: EventsService,
    private router: Router, private crd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('Component initialized, attempting to load events and categories.');
    this.onCategoryFilterChange();

    this.loadAllEvents();

    this.eventService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('loaded:', this.categories);
      }
    });
  }

  sortByPrice() {
    console.log(this.sortAscending);
    this.sortAscending = !this.sortAscending;
    this.events.sort((a, b) =>
      this.sortAscending ? a.price - b.price : b.price - a.price
    );
  }

  sortByMinAge(minAge: number) {
    this.events = this.events.filter(e => e.ageMin >= minAge);
  }

  loadAllEvents(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      this.filterEvents = data;
      this.crd.detectChanges();
    }
    );
  }

  toggleFilterMenu(): void {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

  filterByCategoryId(categoryId: number): void {
    console.log('Category ID to filter:', categoryId);
    this.isFilterMenuOpen = false;

    if (categoryId === 0) {
      this.loadAllEvents();
    } else {
      this.eventService.getEventsByCategoryId(categoryId).subscribe(data => {
        this.events = data;
        this.crd.detectChanges();

      }, error => {
        console.error('שגיאה בסינון אירועים:', error);
      });
    }
  }

  openEventDetails(event: any): void {
    console.log('נלחץ על אירוע:', event);

    this.selectedEvent = event;
    this.showModal = true;
  }

  closeEventDetails(): void {
    this.showModal = false;
    this.selectedEvent = null;
    console.log('המודל נסגר.');
  }


  onCategoryFilterChange(): void {
    const categoryId = this.selectedCategoryId;
    console.log('Category ID to filter:', categoryId);

    if (categoryId === 0) {
      this.eventService.getEvents().subscribe(data => {
        this.events = data;
      });
    } else {
      this.eventService.getEventsByCategoryId(categoryId).subscribe(data => {
        this.events = data;
      }, error => {
        console.error('שגיאה בסינון אירועים:', error);
      });
    }
  }
}