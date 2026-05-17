import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { EventsService } from '../services/events';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customerService: EventsService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit() {
    // אם הגיע מהרשמה — נמלא את השדה של האימייל
    const emailFromRegister = this.route.snapshot.queryParams['email'];
    if (emailFromRegister) {
      this.loginForm.patchValue({ email: emailFromRegister });
    }
  }

  submit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const email = this.email?.value;

    // בדיקה אם הלקוח קיים
    this.customerService.getCustomerByEmail(email).subscribe({
      next: (customer: any) => {
        // בדיקת סיסמה
        if (customer.password === this.password?.value) {

          // שמירה ב-localStorage דרך EventsService
          this.customerService.setCurrentUser({
            username: customer.username,
            email: customer.email
          });

          this.successMessage = "התחברת בהצלחה!";
          this.customerService.setCurrentUser(customer);

          this.submitting = false;

          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000);

        } else {
          this.errorMessage = "סיסמה שגויה!";
          this.submitting = false;
        }
      },
      error: () => {
        this.errorMessage = "משתמש לא קיים במערכת!";
        this.submitting = false;
      }
    });


  }
}