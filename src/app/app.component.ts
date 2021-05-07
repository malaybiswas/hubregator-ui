import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {ThemeService} from "./theme.service";
import {PreferencesService} from "./preferences.service";

@Component({
  selector: 'app-hubregator',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  private navEnd: Observable<NavigationEnd>;
  initialized: boolean = false;
  themeColor: string = '';
  themeMode: string = '';
  @HostBinding('class') className = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private themeService: ThemeService,
              private preferencesService: PreferencesService) {
    this.navEnd = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit(): void {
    //Update Title when navigation completes
    this.navEnd.subscribe( evt => {
      // @ts-ignore
      //this.titleService.setTitle(this.activatedRoute.firstChild.data['title']);
      this.activatedRoute.firstChild.data.forEach(data => {
          this.titleService.setTitle(data.title || 'Hubregator');
        });
    });

    //subscribe for theme updates in preferences
    this.themeService.currentColor.subscribe(color => {
      this.themeColor = color;
      this.reapplyTheme();
    });
    this.themeService.currentMode.subscribe(mode => {
      this.themeMode = mode;
      this.reapplyTheme();
    });

    //TODO attempt to load user preferences if already logged in. Otherwise set default application preferences
    //initialize theme service
    this.themeService.color = this.preferencesService.preferences.theme.color;
    this.themeService.mode = this.preferencesService.preferences.theme.mode;

    this.initialized = true;
  }

  private reapplyTheme() {
    this.className = this.themeColor.concat('-theme-',this.themeMode);
  }
}
