import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { NgbModule, NgbAccordionModule, NgbTabsetModule, NgbCollapseModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './services/auth.service';
import { DatePipe } from '@angular/common';
import { FlashcardComponent } from './layouts/flashcard/flashcard.component';
import { DragulaModule } from 'ng2-dragula';
import { YourDeskComponent } from './layouts/your-desk/your-desk.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsListComponent } from './layouts/cards-list/cards-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FlashcardComponent,
    YourDeskComponent,
    CardsListComponent,
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
    DragulaModule.forRoot()
  ],
  providers: [AuthService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
