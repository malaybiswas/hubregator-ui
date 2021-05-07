import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatButtonToggleChange, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {FirebaseService} from "../firebase.service";
import {CookieService} from "ngx-cookie-service";
import {animate, AnimationEvent, state, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({
        opacity: 1,
        zIndex: 2
      })),
      state('hide', style({
        opacity: 0,
        zIndex: 1
      })),
      transition('hide => show', animate('500ms ease-in')),
      transition('show => hide', animate('500ms ease-out')),
    ])
  ]
})
export class LoginComponent implements OnInit, AfterViewInit {
  private static GOOGLE_LOGIN_START_COOKIE: string = 'google-login-start';
  //@ts-ignore
  @ViewChild(MatButtonToggleGroup) loginOptionGroup: MatButtonToggleGroup;

  viewStates: any = {
    defaultPane: 'show',
    emailSignInPane: 'hide',
    emailSignUpPane: 'hide',
    phoneSignInPane: 'hide',
    currentPane: 'defaultPane'
  }

  emailSignInForm: FormGroup = new FormGroup({});
  emailSignUpForm: FormGroup = new FormGroup({});
  phoneSignInForm: FormGroup = new FormGroup({});

  constructor(private firebaseService: FirebaseService, private cookieService: CookieService, fb: FormBuilder) {
    this.emailSignInForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]]
    });

    this.emailSignUpForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]]
    });

    this.phoneSignInForm = fb.group({
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
  }

  ngOnInit(): void {
    if (this.cookieService.check(LoginComponent.GOOGLE_LOGIN_START_COOKIE)) {
      this.cookieService.delete(LoginComponent.GOOGLE_LOGIN_START_COOKIE);
      this.firebaseService.completeSignInWithGoogle().subscribe(user => {
        //TODO login user
      });
    }
  }

  ngAfterViewInit(): void {
    //Register login option toggle
    this.loginOptionGroup.valueChange.subscribe(value => {
      switch (value) {
        case 'email':
          this.flipPane('emailSignInPane');
          break;
        case 'google':
          this.cookieService.set(LoginComponent.GOOGLE_LOGIN_START_COOKIE,'true', new Date(Date.now()+300000));
          this.firebaseService.startSignInWithGoogle();
          break;
        case 'phone':
          this.flipPane('phoneSignInPane');
      }
    });

    //initialize login option
    setTimeout(() => {
      this.loginOptionGroup.value = 'email';
    });
  }

  flipPane(pane: string) {
    if (this.viewStates.currentPane != pane) {
      this.viewStates[this.viewStates.currentPane] = 'hide';
      this.viewStates[pane] = 'show';
      this.viewStates.currentPane = pane;
    }
  }
}
