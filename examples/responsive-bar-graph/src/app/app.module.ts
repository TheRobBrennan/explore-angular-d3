import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Add HttpClientModule so that our HttpClient can work
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
