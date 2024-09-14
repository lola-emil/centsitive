import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService, UserInfo } from '../../repository/auth/auth.service';
import { RecordService, Record } from '../../repository/record/record.service';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-record-list',
  standalone: true,
  imports: [NavbarComponent, SidenavComponent, AlertDialogComponent, RouterLink, NgFor],
  templateUrl: './record-list.component.html',
  styleUrl: './record-list.component.css'
})
export class RecordListComponent implements OnInit {

  constructor(
    private recordService: RecordService,
    private authService: AuthService
  ) { }

    records: Record[] = [];
    sidenavVisible = false;

    userInfo!: UserInfo;

    dialogVisible = false;

    selectedRecordId: string = "";

    cancelAlert() {
      this.dialogVisible = false;
    }

    showAlert(recordId: string) {
      this.dialogVisible = true;

      this.selectedRecordId = recordId;
    }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();

    this.recordService.getRecords(this.userInfo.token)
      .subscribe(response => {
        this.records = response.data.records;
      });
  }

  searchRecord(evt: Event) {
    const searchTerm = (<HTMLInputElement>evt.target).value;

    this.recordService.searchRecord(searchTerm, this.userInfo.token)
    .subscribe(response => {
      this.records = response.data.records;
    });
  }

  deleteRecord() {
    this.recordService.deleteRecord(this.selectedRecordId, this.userInfo.token)
    .subscribe(response => {
      this.ngOnInit();
    });

    this.dialogVisible = false;
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
