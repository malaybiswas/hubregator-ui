import { Injectable } from '@angular/core';
import {preferences} from "./app-preferences";

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private _preferences = preferences;
  constructor() { }

  refreshUserPreferences(): void {
    //TODO
  }

  private saveUserPreferences(preferences: any) {
    //TODO
  }

  get preferences() {
    return this._preferences;
  }

  set preferences(preferences) {
    this.saveUserPreferences(preferences);
    this._preferences = preferences;
  }
}
