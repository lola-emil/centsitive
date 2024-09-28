import { Component, OnInit } from '@angular/core';
import { ChartComponent } from "../../components/chart/chart.component";
import { RecentActivitiesComponent } from "../../components/recent-activities/recent-activities.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../repository/expense/expense.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [ChartComponent, CurrencyPipe, RecentActivitiesComponent, NavbarComponent, RouterLink],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.css',
  providers: [CurrencyPipe]
})
export class OverviewPageComponent implements OnInit {

  constructor(private expenseRepo: ExpenseService) {
  }


  total = 0;
  
  ngOnInit(): void {
    this.expenseRepo.getTotal()
    .subscribe({
      next: (val: any )=> {
        this.total = val[0].total;
        console.log(this.total);
      }
    })
  }

  
}
