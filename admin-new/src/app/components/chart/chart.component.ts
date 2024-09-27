import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption,BarSeriesOption } from "echarts";


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  providers: [provideEcharts()]
})
export class ChartComponent implements OnInit, OnDestroy {

  constructor() {}

  data: {
    value: any,
    itemStyle?: any
  }[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.data.push(
        {
          value: Math.random() * 255,
          itemStyle: {
            borderRadius: [10, 10, 0, 0],
          }
        }
      );
    }
  }

  ngOnDestroy(): void {}

  chartOptions: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    grid: {

      borderColor: "#333",
      backgroundColor: "#333"
    },
    series: [
      {
        data: this.data,
        type: 'bar',
        barWidth: "20%",
      }
    ]
  };



}
