import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  set color(value: string) {
    this._color.next(value);
  }

  get mode(): string {
    return this._mode;
  }

  set mode(value: string) {
    this._mode = value;
    switch (this._mode) {
      case 'auto':
        // TODO add logic for auto. Use location and timezone API
        break;
      case 'dark':
        this._currentMode.next(value);
        break;
      case 'light':
        this._currentMode.next(value);
    }
  }

  private _color = new Subject<string>();
  private _mode: string = '';
  private _currentMode = new Subject<string>();
  // @ts-ignore
  currentMode = this._currentMode.asObservable();
  // @ts-ignore
  currentColor = this._color.asObservable();


  constructor() { }
}
