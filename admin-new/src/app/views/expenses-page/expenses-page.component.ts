import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../repository/expense/expense.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-expenses-page',
  standalone: true,
  imports: [NavbarComponent, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './expenses-page.component.html',
  styleUrl: './expenses-page.component.css',
  providers: [CurrencyPipe, DatePipe]
})
export class ExpensesPageComponent implements OnInit{
  constructor(
    private expenseRepo: ExpenseService
  ) {}
  
  categories = ["Bills", "Subscription", "Utilities", "Equipment"];

  expenses: any = [];

  searchQuery: string = "";

  today = "";

  selectedDate = "";
  selectedCategory = "";

  ngOnInit(): void {


    this.fetchExpense();
  }


  search(evt: Event) {
    const target = evt.target as HTMLInputElement;
    const searchQuery = target.value;

    this.searchQuery = searchQuery;

    this.fetchExpense();

  }


  fetchExpense () {
    this.expenseRepo.get({
      searchQuery: this.searchQuery,
      created_at: this.selectedDate,
      category: this.selectedCategory
    }).subscribe({
      next: val => {
        console.log(val);
        this.expenses = val;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  filter(evt: Event) {
    const target = evt.target as HTMLInputElement;

    this.selectedCategory = target.value;

    this.expenseRepo.get({
      searchQuery: this.searchQuery,
      created_at: this.selectedDate,
      category: this.selectedCategory
    }).subscribe({
      next: val => {
        console.log(val);
        this.expenses = val;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  filterDate(evt: Event) {
    const target = evt.target as HTMLInputElement;

    this.selectedDate = target.value;
    console.log(this.selectedDate);
    this.expenseRepo.get({
      searchQuery: this.searchQuery,
      created_at: this.selectedDate,
      category: this.selectedCategory
    }).subscribe({
      next: val => {
        console.log(val);
        this.expenses = val;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}