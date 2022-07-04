import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables  } from 'chart.js';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
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
    private screenOrientation: ScreenOrientation
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
    // this.doughnutChartMethod();
    // this.createBarChart();
    await this.createLineChart();
    // await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    await screen.orientation.lock('landscape');
  }

  async ionViewWillLeave(){
    await screen.orientation.unlock();
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
        labels: ['1','2','3','4','5','6','7','8','9','10'],
        datasets: [
          {
            label: 'สะสม',
            data: [100,50,23,14,0,50,33,7,9,8],
            backgroundColor: 'rgb(38, 194, 129)', 
            borderColor: 'rgb(38, 194, 129)',
          },
        ],
      },
    });
  }
}
