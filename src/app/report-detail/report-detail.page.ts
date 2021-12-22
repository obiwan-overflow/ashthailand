import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.page.html',
  styleUrls: ['./report-detail.page.scss'],
})
export class ReportDetailPage implements OnInit {
  
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  
  doughnutChart: any;
  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.doughnutChartMethod();
  }

  doughnutChartMethod() {
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

}
