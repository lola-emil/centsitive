import { Component } from '@angular/core';
import { ChartComponent } from "../../components/chart/chart.component";
import { RecentActivitiesComponent } from "../../components/recent-activities/recent-activities.component";

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [ChartComponent, RecentActivitiesComponent],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.css'
})
export class OverviewPageComponent {

}
