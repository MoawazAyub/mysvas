import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  onLogin(form: NgForm) {
    console.log(form.value);
    if(form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }

  constructor(public authService: AuthService) {

   }

  ngOnInit() {
  }

}
