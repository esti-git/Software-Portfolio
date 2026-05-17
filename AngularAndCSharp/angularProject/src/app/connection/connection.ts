import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsService } from '../services/events'; // נתיב תקין
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router'; // Router כבר מיובא

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './connection.html',
  styleUrls: ['./connection.css']
})
export class ConnectionComponent {
  customerForm: FormGroup;
  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private customerService: EventsService, private router: Router) {
    this.customerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get username() { return this.customerForm.get('username'); }
  get email() { return this.customerForm.get('email'); }
  get password() { return this.customerForm.get('password'); }

  submit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      this.errorMessage = 'נא תקן את השגיאות בטופס.';
      return;
    }

    this.submitting = true;
    const email = this.email?.value;

    // 1. בדיקה א-סינכרונית אם משתמש כבר קיים (מונע יצירה כפולה)
    this.customerService.getCustomerByEmail(email).subscribe({
      next: () => {
        this.submitting = false;
        this.errorMessage = "משתמש כבר קיים במערכת! אנא התחבר.";
        setTimeout(() => {
           this.router.navigate(['/login'], { queryParams: { email } });
        }, 1500); // נותן למשתמש זמן לקרוא את ההודעה
      },
      error: (err) => {
        if (err.status === 404) {
          this.addCustomer();
        } else {
          this.submitting = false;
          this.errorMessage = "שגיאה בבדיקה מול השרת. אנא נסה שוב מאוחר יותר.";
        }
      }
    });
  }

  addCustomer() {
    const payload = {
      customerId: 0,
      username: this.username?.value,
      email: this.email?.value,
      password: this.password?.value,
      createdAt: new Date().toISOString() // שימוש בפורמט ISO תקין
    };

    this.customerService.addCustomer(payload).subscribe({
      next: (response) => {
        const createdCustomer = {
             username: payload.username,
             email: payload.email,
        };
        
        // 1. שמירה כמשתמש מחובר
        this.customerService.setCurrentUser(createdCustomer);

        // 2. עדכון UI ואיפוס
        this.successMessage = 'ברוך הבא! ההרשמה בוצעה בהצלחה.';
        this.customerForm.reset();
        this.submitting = false;
        
        // 3. ניתוב אוטומטי לדף הבית לאחר יצירת המשתמש
        setTimeout(() => {
             this.router.navigate(['/home']);
        }, 1500);

      },
      error: (err) => {
        console.error('❌ שגיאה ביצירת משתמש:', err);
        this.errorMessage = err?.error?.message || 'שגיאה בשרת. יצירת המשתמש נכשלה.';
        this.submitting = false;
      }
    });
  }
}