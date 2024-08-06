// import {
//   MatAutocompleteModule,
//   MatButtonModule,
//   MatCardModule,
//   MatDialogModule,
//   MatGridListModule,
//   MatIconModule,
//   MatInputModule,
//   MatListModule,
//   MatMenuModule,
//   MatProgressBarModule,
//   MatProgressSpinnerModule,
//   MatSliderModule,
//   MatSnackBarModule,
//   MatTooltipModule
// } from '@angular/material';
import {MatSidenavModule,MatSidenavContainer,MatSidenav,MatSidenavContent} from  '@angular/material/sidenav';        
import {MatIconModule} from  '@angular/material/icon';        
import {MatButtonModule} from  '@angular/material/button';        
import {MatInputModule} from  '@angular/material/input';        
import {MatSnackBarModule} from  '@angular/material/snack-bar';        
import {MatMenuModule} from  '@angular/material/menu';        
import {MatCardModule} from  '@angular/material/card';        
import {MatProgressBarModule} from  '@angular/material/progress-bar';        
import {MatSliderModule} from  '@angular/material/slider';        
import {MatAutocompleteModule} from  '@angular/material/autocomplete';        
import {MatGridListModule} from  '@angular/material/grid-list';        
import {MatProgressSpinnerModule} from  '@angular/material/progress-spinner';        
import {MatTooltipModule} from  '@angular/material/tooltip';        
import {MatListModule} from  '@angular/material/list';        
import {MatDialogModule} from  '@angular/material/dialog';        


import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule
  ],
  exports: [
    MatSidenavContainer,MatSidenav,MatSidenavContent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule
  ],
})

export class MaterialModule {
}
