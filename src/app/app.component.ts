import {Component} from '@angular/core';
import {
  BwcContextService,
  BwcLogoLink,
  BwcPageTemplateCommunicatorService
} from "@aviato/components";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'angularApp';
    isUserLoggedIn = false;
    hideEnrol = false;
    hideLogin = false;
    hideCountryLanguage = false;
    isRedirectionNoticeVisible = false;
    isInitialsAvailable = true;
    countryCode = 'ae';
    userName = 'Clement Scoupe';
    userProfileTypeImage = 'fb-gold-small';
    userEmail = 'clement.scoupe@gmail.com';
    userProfileTypeImageAlt = 'Profile Type';
    locale = 'en-US';
    loginInitials = 'AB';
    brand: string;
    logoLink: BwcLogoLink;
    productName = '';
    uri = '';
    url = '';
    isH1 = false;
  constructor(
    private bwcContextService: BwcContextService,
    private bwcPageTemplateCommunicatorService: BwcPageTemplateCommunicatorService,
  ) {
    this.bwcContextService.configure({
      brand: 'kl',
      assetsPath: '/assets/components/',
    });

    this.bwcPageTemplateCommunicatorService.logoHeader.next({
      isUserLoggedIn: false,
      productName: 'My Awesome Project',
      hideEnrol: true,
      hideLogin: true,
      hideCountryLanguage: true,
      locale: 'en',
      logoLink: {
        url: '/',
        ariaLabel: 'Brand logo image',
        isH1: false,
        uri: '/',
      },
    });
  }
}
