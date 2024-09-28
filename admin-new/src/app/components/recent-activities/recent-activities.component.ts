import { Component, OnInit } from '@angular/core';
import { ExpenseDetailModalComponent } from "../expense-detail-modal/expense-detail-modal.component";
import { ExpenseService } from '../../repository/expense/expense.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';


type Expense = {
  name: string,
  date: string,
  category: string,
  amount: number,
  status: string;
};
@Component({
  selector: 'app-recent-activities',
  standalone: true,
  imports: [ExpenseDetailModalComponent, DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './recent-activities.component.html',
  styleUrl: './recent-activities.component.css',
  providers: [DatePipe, CurrencyPipe]
})
export class RecentActivitiesComponent implements OnInit {

  constructor(private expenseRepo: ExpenseService) {
  }

  
  ngOnInit(): void {
    this.expenseRepo.getRecent()
    .subscribe({
      next: val => {
        this.data = val;
      }
    })
  }

  data: any = [];

  expenseDetailModalVisible = false;

  onDialogClosed() {
    this.expenseDetailModalVisible = false;
  }

  openDialog() {
    this.expenseDetailModalVisible = true;
  }
}
