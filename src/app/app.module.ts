import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { NgbModule, NgbAccordionModule, NgbTabsetModule, NgbCollapseModule, NgbProgressbarModule, NgbModalModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
// import { AuthService } from './services/auth.service.bak';
import { DatePipe, CommonModule } from '@angular/common';
import { FlashcardComponent } from './layouts/flashcard/flashcard.component';
import { DragulaModule } from 'ng2-dragula';
import { YourDeskComponent } from './layouts/your-desk/your-desk.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsListComponent } from './layouts/cards-list/cards-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SingleImportComponent } from './layouts/single-import/single-import.component';
import { CreateLanguageComponent } from './layouts/create-language/create-language.component';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { FlashcardsService } from './_services/flashcards.service';
import { LanguagesService } from './_services/languages.service';
import { CoursesService } from './_services/courses.service';
import { AuthService } from './_services/auth.service';
import { LessonsService } from './_services/lessons.service';
import { LevelsService } from './_services/levels.service';
import { ToastService } from './_services/toast.service';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FlashcardComponent,
    YourDeskComponent,
    CardsListComponent,
    SingleImportComponent,
    CreateLanguageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    NgbModule,
    NgbAccordionModule,
    NgbTabsetModule,
    NgbCollapseModule,
    NgbProgressbarModule,
    NgbPopoverModule,
    DragulaModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgbModalModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    SingleImportComponent,
    CreateLanguageComponent
  ],
  providers: [DatePipe, FlashcardsService, LanguagesService, CoursesService, AuthService, LessonsService, LevelsService, ToastService, NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
