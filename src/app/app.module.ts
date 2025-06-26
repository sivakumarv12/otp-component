import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { COOKIE_WRITER, CookieWriterService } from 'ngx-cookie';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  BwcCoreModule,
  BwcLogoHeaderComponent,
  BwcLogoHeaderIntl,
  BwcMediaQueryService,
  BwcPageTemplateComponent,
  BwcSkiplinkIntl,
} from '@aviato/components';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    BwcPageTemplateComponent,
    BrowserAnimationsModule,
    BwcLogoHeaderComponent,
    MatCardModule,
    AppRoutingModule,
    BwcCoreModule,
    HomeComponent,
  ],
  providers: [
    BwcLogoHeaderIntl,
    BwcMediaQueryService,
    {
      provide: COOKIE_WRITER,
      useClass: CookieWriterService,
    },
    BwcSkiplinkIntl,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
