import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-report-chart',
  templateUrl: './report-chart.page.html',
  styleUrls: ['./report-chart.page.scss'],
})
export class ReportChartPage implements OnInit {
  id:any;
  titleHead:any;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('barChart') barChart;
  @ViewChild('lineChart') lineChart;
  doughnutChart: any;
  bars: any;
  lines:any;
  constructor(
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.id = await this.route.snapshot.paramMap.get('id');
    if(this.id == '1'){
      this.titleHead = "สังเกตสถานที่สาธารณะ";
    }else if(this.id == '2'){
      this.titleHead = "สังเกตร้านค้า";
    }else if(this.id == '3'){
      this.titleHead = "แบบสัมภาษณ์พฤติกรรมการสูบบุหรี่";
    }
    this.doughnutChartMethod();
    this.createBarChart();
    this.createLineChart();
  }

  async doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['แล้วเสร็จ', 'อยู่ระหว่างดำเนินการ'],
        datasets: [{
          label: '# of Votes',
          data: [50, 50],
          backgroundColor: [
            'rgba(0, 255, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          hoverBackgroundColor: [
            '#00cc33',
            '#FF6384',
          ]
        }]
      }
    });
  }
  async createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          
        }
      }
    });
  }
  async createLineChart(){
    this.lines = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['S1', 'S2', 'S3',],
        datasets: [
          {
            label: '1',
            data: [2.5],
            backgroundColor: 'rgb(38, 194, 129)', 
            borderColor: 'rgb(38, 194, 129)',
          },
          {
            label: '1',
            data: [2.5],
            backgroundColor: 'rgb(38, 194, 129)', 
            borderColor: 'rgb(38, 194, 129)',
          },
          {
            label: '1',
            data: [2.5],
            backgroundColor: 'rgb(38, 194, 129)', 
            borderColor: 'rgb(38, 194, 129)',
          }
        ],
      },
    });
  }
}
