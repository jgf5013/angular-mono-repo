import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule} from '@angular/material/table';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';


const materialModules = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatSortModule,
  MatTableModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
];

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules]
})
export class AppMaterialModule { }