import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firebaseConfig: any;

  constructor() {
    this.firebaseConfig = {
      apiKey: environment.firebase.apiKey,
      projectId: environment.firebase.projectId,
      appId: environment.firebase.appId,
      authDomain: environment.firebase.authDomain,
      databaseURL: environment.firebase.databaseURL
    }

    firebase.initializeApp(this.firebaseConfig);
  }

  public get currentUser(): firebase.User | null {
    return firebase.auth().currentUser;
  }

  /**** Authentication ****/
  //Email & Password Implementation
  public signInWithEmailAndPassword(email: string, password: string): Observable<firebase.User | null> {
    return new Observable<firebase.User | null>(subscriber => {
      firebase.auth().signInWithEmailAndPassword(email,password)
        .then(userCredential => {
          subscriber.next(userCredential.user);
          subscriber.complete();
        })
        .catch(err => {
          subscriber.error(err);
        });
    });
  }

  public signUpWithEmailAndPassword(email: string, password: string): Observable<firebase.User | null> {
    return new Observable<firebase.User | null>(subscriber => {
      firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(userCredential => {
          // @ts-ignore
          userCredential.user.sendEmailVerification()
            .then(() => {
              //do nothing
            })
            .catch(err => {
              console.error('User signed up but failed to send verification email',[],[err]);
            })
            .finally(() => {
              subscriber.next(userCredential.user);
              subscriber.complete();
            });
        })
        .catch(err => {
          subscriber.error(err);
        });
    });
  }

  public sendPasswordResetEmail(email: string): Observable<any> {
    return new Observable<any>(subscriber => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch(err => {
          subscriber.error(err);
        });
    });
  }

  //Google Sign-In implementation
  public startSignInWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithRedirect(provider);
  }

  public completeSignInWithGoogle(): Observable<firebase.User | null> {
    return new Observable<firebase.User | null>(subscriber => {
      firebase.auth().getRedirectResult()
        .then(result => {
          subscriber.next(result.user);
          subscriber.complete();
        })
        .catch(err => {
          subscriber.error(err);
        });
    });
  }

  //Phone Sign-In implementation


  //Signout
  public signout(): Observable<any> {
    return new Observable<any>(subscriber => {
      firebase.auth().signOut()
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch(err => {
          subscriber.error(err);
        });
    });
  }


  /**** Database ****/
}
