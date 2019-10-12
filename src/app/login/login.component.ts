import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false
  form: FormGroup
  constructor(@Inject(FormBuilder) fb: FormBuilder, private http: AppService,
    private route: ActivatedRoute, public snackBar: MatSnackBar, private authService: AuthService,
    private router: Router, private apollo: Apollo) {
    this.form = fb.group({
      email: new FormControl({ value: '', disabled: false }, Validators.required),
      password: new FormControl({ value: '', disabled: false }, Validators.required),
    })
  }

  login() {
    this.loading = true
    this.apollo.mutate({
      mutation: environment.login,
      variables: {
        username: this.form.value.email,
        password: this.form.value.password
      },
      errorPolicy: "all"
    }).subscribe((helper: any) => {
      this.loading = false
      if (helper.errors) {
        helper.errors.map(error => {
          this.http.presentToast(error.message)
        })
      } else if (helper.data.login) {
        if (this.authService.login(helper.data.login)) {
          this.router.navigateByUrl("/app")
        }
      }
    }, error => {
      this.http.presentToast(error)
      this.loading = false
    })
  }

  ngOnInit() {
  }

}
