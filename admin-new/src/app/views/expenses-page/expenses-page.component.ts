import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-expenses-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './expenses-page.component.html',
  styleUrl: './expenses-page.component.css'
})
export class ExpensesPageComponent {

}
