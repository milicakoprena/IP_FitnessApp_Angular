import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomToolbarComponent } from './custom-toolbar/custom-toolbar.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { RouterModule } from '@angular/router';
import { CustomCardComponent } from './custom-card/custom-card.component';
import { CustomImageGalleryComponent } from './custom-image-gallery/custom-image-gallery.component';
import { UserInputComponent } from './user-input/user-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomProgramListComponent } from './custom-program-list/custom-program-list.component';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';

@NgModule({
  declarations: [
    CustomToolbarComponent,
    CustomCardComponent,
    CustomImageGalleryComponent,
    UserInputComponent,
    CustomProgramListComponent,
    VideoDialogComponent,
    SearchDialogComponent,
    FilterDialogComponent,
    PasswordDialogComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CustomToolbarComponent,
    CommonModule,
    CustomCardComponent,
    CustomImageGalleryComponent,
    UserInputComponent,
    CustomProgramListComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomComponentsModule {}
