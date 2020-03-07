import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { FlashcardsService } from '../services/flashcards.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, public auth: AuthService, public flashcard: FlashcardsService) {
    this.afAuth.authState
  }

  ngOnInit() {
  }
  openSidebar(){
    document.getElementById('mySidebar').style.width = '250px';
  }
  closeSidebar(){
    document.getElementById('mySidebar').style.width = '0';
  }

}
