import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HighchartdemoComponent } from './highchartdemo/highchartdemo.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [AppComponent, HighchartdemoComponent],
  imports: [BrowserModule, HttpClientModule, HighchartsChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
