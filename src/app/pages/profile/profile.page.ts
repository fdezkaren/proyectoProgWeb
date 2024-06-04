import { Component, OnInit } from '@angular/core';
import { DataService } from '../home/home.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.userData = this.dataService.getData();
  }
}
