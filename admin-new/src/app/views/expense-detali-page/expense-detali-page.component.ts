import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ExpenseService } from '../../repository/expense/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import {Location} from '@angular/common';

import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-expense-detali-page',
  standalone: true,
  imports: [NavbarComponent, CurrencyPipe],
  templateUrl: './expense-detali-page.component.html',
  styleUrl: './expense-detali-page.component.css',
  providers: [CurrencyPipe]
})
export class ExpenseDetaliPageComponent implements OnInit{
  constructor(
    private expenseRepo: ExpenseService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  expense: any;

  apiUrl = environment.apiUrl;

  expenseId:any;

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id')! 
    this.expenseId = id; 
    console.log(id);
    this.expenseRepo.getById(id)
    .subscribe({
      next: (val: any) => {
        const expense = val[0];
        this.expense = expense;
        console.log(val);
      }
    });
  }

  approve() {
    this.expenseRepo.updateById(this.expenseId, {status: "approved"})
    .subscribe({
      next: val => {
        console.log(val);
        this._location.back();
      }
    })
  }


  reject() {
    this.expenseRepo.updateById(this.expenseId, {status: "rejected"})
    .subscribe({
      next: val => {
        console.log(val);
        this._location.back();
      }
    })    
  }

}
