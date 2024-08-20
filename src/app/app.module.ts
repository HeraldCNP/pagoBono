import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { BaseChartDirective, provideCharts, withDefaultRegisterables  } from 'ng2-charts';

registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BaseChartDirective 
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}, provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }
