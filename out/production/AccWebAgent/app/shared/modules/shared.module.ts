import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {TranslateModule} from '@ngx-translate/core';
//import {AccAgentService} from '../../AccAgent/AccAgent.service';
import {FlexLayoutModule} from '@angular/flex-layout';
//import {SampleModule} from 'angular-example-library';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule
    //SampleModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule
    //SampleModule
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
      //AccAgentService
      ]
    };
  }
}
