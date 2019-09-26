import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  routerSuscription: Subscription
  constructor(fb: FormBuilder, private http: AppService, private route: ActivatedRoute, private router: Router) {
    let token = this.route.snapshot.queryParams.token;
    this.form = fb.group({
      password: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      token: [token, Validators.required],
      password_confirmation: [null, Validators.required]
    });
  }

  post() {
    this.loading = true;
    this.http.post(`password/reset`, this.form.value, false)
      .subscribe(
        data => {
          if (data.success) {
            this.loading = false;
            setTimeout(() => {
              this.router.navigateByUrl('/login');
            }, 3000);
          }
        },
        error => { },
        () => {

        }
      )
  }

  ngOnInit() {
  }

}
