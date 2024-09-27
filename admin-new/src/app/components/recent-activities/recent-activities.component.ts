import { Component } from '@angular/core';
import { ExpenseDetailModalComponent } from "../expense-detail-modal/expense-detail-modal.component";


type Expense = {
  name: string,
  date: string,
  category: string,
  amount: number,
  status: string
}
@Component({
  selector: 'app-recent-activities',
  standalone: true,
  imports: [ExpenseDetailModalComponent],
  templateUrl: './recent-activities.component.html',
  styleUrl: './recent-activities.component.css'
})
export class RecentActivitiesComponent {
  data = [
    {
      name: "Office Supplies",
      date: "2024-09-21",
      category: "Supplies",
      amount: 150.75,
      status: "approved"
    },
    {
      name: "Travel Expenses",
      date: "2024-09-18",
      category: "Travel",
      amount: 320.50,
      status: "pending"
    },
    {
      name: "Client Lunch",
      date: "2024-09-19",
      category: "Meals",
      amount: 85.30,
      status: "approved"
    },
    {
      name: "Software Subscription",
      date: "2024-09-20",
      category: "Software",
      amount: 45.99,
      status: "pending"
    },
    {
      name: "Internet Bill",
      date: "2024-09-15",
      category: "Utilities",
      amount: 60.00,
      status: "approved"
    }
  ];

  expenseDetailModalVisible = false;

  onDialogClosed() {
    this.expenseDetailModalVisible = false;
  }

  openDialog() {
    this.expenseDetailModalVisible = true;
  }
}
