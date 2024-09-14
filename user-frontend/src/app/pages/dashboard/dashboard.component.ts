import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { ChartComponent } from '../../components/chart/chart.component';
import { AuthService } from '../../repository/auth/auth.service';
import { RecordService, Record } from '../../repository/record/record.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, ChartComponent, RouterLink, SidenavComponent, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private recordService: RecordService, private authService: AuthService) { }

  sidenavVisible = false;

  recentRecords: Record[] = [];

  isRecordEmtpy = false;

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();

    this.recordService.getRecentRecords(userInfo.user_id, userInfo.token)
    .subscribe(response => {
      this.recentRecords = response.data.records;
    });
    
    this.recordService.getRecords(userInfo.token)
    .subscribe(response => {
      this.isRecordEmtpy = response.data.records.length == 0;
    })
  }

  hideSideNav() {
    this.sidenavVisible = false;
  }
  
  showSideNav() {
    this.sidenavVisible = true;
  }

  
  formatNumber(num: number) {
    return Intl.NumberFormat('en', {notation: 'compact', maximumFractionDigits: 2}).format(num);
  }
}
