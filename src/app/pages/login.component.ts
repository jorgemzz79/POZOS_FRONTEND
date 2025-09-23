import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  error = false; // 🔸 Declárala aquí
intentoLogin = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // ✅ Aquí sí puedes usar this.fb
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
  this.intentoLogin = true;
  const { username, password } = this.form.value;

  const body = new HttpParams()
    .set('username', username)
    .set('password', password);

  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  this.http.post<any>(`${environment.apiBase}/auth/login`, body.toString(), { headers })
    .subscribe({
      next: res => {
        this.error = false;
        localStorage.setItem('token', res.access_token);
        this.router.navigate(['/pozos']);
      },
      error: () => {
        this.error = true;
      },
    });
}
}
