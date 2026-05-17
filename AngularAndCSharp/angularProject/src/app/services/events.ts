import { Injectable, signal, computed, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { delay, tap } from 'rxjs/operators';

import { Event } from '../models/events';
import { Categories } from '../models/categories';
import { PurchaseRequest, FullPurchasePayload, CartItem } from '../models/purchases';
import { Customers } from '../models/customers'

// הגדרת ממשקים לבטיחות טיפוסים
interface ProductEvent {
    productId: number;
    name: string;
    price: number;
}


@Injectable({
    providedIn: 'root'
})
export class EventsService {

    private _cartItems = signal<CartItem[]>([]);
    readonly cartItems = this._cartItems.asReadonly(); // חשיפה ציבורית לקריאה בלבד

    readonly totalAmount = computed(() =>
        this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0)
    );

    private apiUrl = 'https://localhost:7003/api';

    currentUser: any = null;
    private _eligible = new BehaviorSubject<boolean>(false);
    eligible$ = this._eligible.asObservable();
    private _showCouponMessage = new BehaviorSubject<boolean>(false);
    showCouponMessage$ = this._showCouponMessage.asObservable();
    private _code = "FIRST5"; // הקופון קבוע
    get couponCode() { return this._code; }


    constructor(private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        if (isPlatformBrowser(this.platformId)) {
            const saveCart = localStorage.getItem('cart')
            if (saveCart) {
                this._cartItems.set(JSON.parse(saveCart));
            }
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
            }
        }
    }

    private loadCart(): void {
        const saveCart = localStorage.getItem('cart');
        if (saveCart) {
            this._cartItems.set(JSON.parse(saveCart));
        }
    }

    private saveCart(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('cart', JSON.stringify(this.cartItems()));
        }
    }

    addToCart(events: ProductEvent): void {
        this._cartItems.update(items => {
            const existing = items.find(item => item.productId === events.productId);
            if (existing) {
                existing.quantity++;
                return [...items];
            } else {
                // הוספת פריט חדש
                return [...items, { ...events, quantity: 1 } as CartItem];
            }
        });
        this.saveCart();
    }

    removeFromCart(productId: number): void {
        this._cartItems.update(items =>
            items.filter(item => item.productId !== productId)
        );
        this.saveCart();
    }

    increaseQuantity(productId: number): void {
        this._cartItems.update(items => {
            const existing = items.find(item => item.productId === productId);
            if (existing) {
                existing.quantity++;
            }
            return [...items];
        });
        this.saveCart();
    }

    decreaseQuantity(productId: number): void {
        this._cartItems.update(items => {
            const existing = items.find(item => item.productId === productId);
            if (existing) {
                if (existing.quantity > 1) {
                    existing.quantity--;
                } else {
                    return items.filter(item => item.productId !== productId);
                }
            }
            return [...items];
        });
        this.saveCart();
    }

    clearCart(): void {
        this._cartItems.set([]);
        this.saveCart();
    }

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/Event`);
    }

    getAllCategories(): Observable<Categories[]> {
        return this.http.get<Categories[]>(`${this.apiUrl}/Category`);
    }

    getEventsByCategoryId(categoryId: number): Observable<Event[]> {
        let params = new HttpParams().set('categoryId', categoryId.toString());
        return this.http.get<Event[]>(`${this.apiUrl}/Event/byCategory`, { params });
    }

    purchaseTicket(productId: number, purchaseData: PurchaseRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/event/purchase/${productId}`, purchaseData);
    }

    addCustomer(customer: Customers): Observable<any> {
        return this.http.post(`${this.apiUrl}/Customer`, customer, { responseType: 'text' as 'json' });
    }

    getCustomerByEmail(email: string) {
        return this.http.get(`${this.apiUrl}/Customer/byEmail/${email}`);
    }

    processPurchase(payload: FullPurchasePayload): Observable<any> {
        return this.http.post(`${this.apiUrl}/Event/ProcessCart`, payload);
    }
    getCustomerCreateDate(email: string): Observable<Date> {
        return this.http.get<Date>(`${this.apiUrl}/CustomerDate/createdate/${email}`);
    }

    setCurrentUser(user: any) {
        this.currentUser = user;
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            console.log(JSON.stringify(user));
        }
    }

    logout() {
        this.currentUser = null;
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('currentUser');
        }
    }

    getCurrentUser() {
        if (!this.currentUser && isPlatformBrowser(this.platformId)) {
            const saved = localStorage.getItem('currentUser');
            if (saved) this.currentUser = JSON.parse(saved);
        }
        return this.currentUser;
    }

    checkCouponEligibility() {
        const user = this.getCurrentUser();
        if (!user) return;

        this.getCustomerCreateDate(user.email).subscribe({
            next: (date: any) => {
                console.log('Raw date from server:', date);

                const createdAt = new Date(date);
                const now = new Date();

                console.log('Created at:', createdAt);
                console.log('Now:', now);

                const diffTime = Math.abs(now.getTime() - createdAt.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                console.log('Difference in days:', diffDays);

                // זכאי אם נוצר בחודש האחרון (30 ימים)
                const eligible = diffDays <= 30;

                console.log('Eligible for coupon:', eligible);

                this._eligible.next(eligible);

                if (eligible) {
                    localStorage.setItem('newCouponMessage', '1');
                    this._showCouponMessage.next(true);
                    console.log('Coupon message set to show');
                } else {
                    this.clearCouponMessage();
                    console.log('Coupon message cleared');
                }
            },
            error: err => console.log("error getting customer date:", err)
        });
    }

    clearCouponMessage() {
        setTimeout(() => {
            localStorage.removeItem('newCouponMessage');
            this._showCouponMessage.next(false);
            console.log('Coupon message cleared from localStorage and BehaviorSubject');
        }, 0);
    }
    hasCouponMessage(): boolean {
        return localStorage.getItem('newCouponMessage') === '1';
    }

    validateCoupon(code: string): boolean {
        const eligible = this._eligible.value;
        return eligible && code === this._code;
    }

    getDiscountedPrice(total: number): number {
        if (this._eligible.value) {
            return +(total * 0.95).toFixed(2); // 5% הנחה
        }
        return total;
    }
    getEventById(id: string): Observable<Event> {
        return this.http.get<Event>(`${this.apiUrl}/Event/${id}`);
    }
}