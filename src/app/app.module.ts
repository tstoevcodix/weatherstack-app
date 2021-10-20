import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { WeatherModule } from './weather/weather.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const customNotifierOptions: NotifierOptions = {
  theme: 'material',
  position: {
    horizontal: { position: 'right' },
    vertical: { position: 'top' },
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    WeatherModule,
    FontAwesomeModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
