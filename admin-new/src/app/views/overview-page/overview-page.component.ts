import { Component } from '@angular/core';
import { ChartComponent } from "../../components/chart/chart.component";
import { RecentActivitiesComponent } from "../../components/recent-activities/recent-activities.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [ChartComponent, RecentActivitiesComponent, NavbarComponent, RouterLink],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.css'
})
export class OverviewPageComponent {

}
