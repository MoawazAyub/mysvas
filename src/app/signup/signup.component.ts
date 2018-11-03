import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;

  onSignup(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.name,
       form.value.telephone,
       form.value.location, 'null', 'null', 'null'
       , 'talent');
  }

  onAdvisorSignup(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.name,
       form.value.telephone,
       form.value.location, form.value.businessRole, form.value.joiningReason, form.value.companyName
       , 'advisor');
  }

  constructor(public authService: AuthService) {}

  ngOnInit() {
  }

}
