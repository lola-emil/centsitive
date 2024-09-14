import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AuthService } from '../../repository/auth/auth.service';
import { RecordService, Overview } from '../../repository/record/record.service';
import { graphColors } from '../../shared/utils/graph-colors';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {

  constructor(private recordService: RecordService, private authService: AuthService) { }
  chart: any;

  data: Overview[] = [
    {
      category: "",
      percentage: 0,
      total_expense: 0
    }
  ];

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();

    this.recordService.getOverview(userInfo.user_id, userInfo.token)
      .subscribe(response => {
        if (response.data.records.length > 0) {
          this.data = response.data.overview;
        }
        this.createChart();
      });
  }

  createChart() {
    this.chart = new Chart("expense-chart", {
      type: "doughnut",
      options: {
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      },
      data: {
        labels: this.data.map(val => val.category),
        datasets: [
          {
            data: this.data.map(val => val.total_expense),
            backgroundColor: [
              ...graphColors
            ]
          }
        ]
      }
    });
  }
}
