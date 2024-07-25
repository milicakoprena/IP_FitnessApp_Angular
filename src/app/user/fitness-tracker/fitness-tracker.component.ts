import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { FitnessTrackerService } from '../services/fitness-tracker.service';
import { LoginService } from '../../auth/services/login.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  ChartConfiguration,
  ChartOptions,
  registerables,
  Chart,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import { MatDialog } from '@angular/material/dialog';
import { FitnessTrackerDialogComponent } from '../fitness-tracker-dialog/fitness-tracker-dialog.component';

@Component({
  selector: 'app-fitness-tracker',
  templateUrl: './fitness-tracker.component.html',
  styleUrls: ['./fitness-tracker.component.css'],
})
export class FitnessTrackerComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  userId: number = 0;
  trackers: any[] = [];
  pagedTrackers: any[] = [];
  length: number = 0;
  pageSize: number = 1;
  pageSizeOptions: number[] = [1];
  todayBlank: boolean = true;
  latestWeight: number = 0;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Weight',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
      },
      y: {
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    public dialog: MatDialog
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.userId = this.loginService.getUser().id;
    this.loadTrackers();
  }

  private loadTrackers() {
    this.userService.getTrackersByUserId(this.userId).subscribe(
      (data: any) => {
        this.trackers = data.sort((a: any, b: any) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.pagedTrackers = this.trackers.slice(0, 1);
        this.length = this.trackers.length;
        this.checkTodayBlank();
        this.updateChart();
        if (this.trackers.length > 0)
          this.latestWeight = this.trackers.at(this.trackers.length - 1).weight;
      },
      (error: any) => {
        console.error('Error consuming fitness trackers', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FitnessTrackerDialogComponent, {
      data: { userId: this.userId, latestWeight: this.latestWeight },
      width: '400px',
    });

    dialogRef.componentInstance.entryComplete.subscribe(() => {
      this.todayBlank = false;
      this.loadTrackers();
    });
  }

  private checkTodayBlank() {
    const today = new Date().toLocaleDateString('en-CA');
    this.todayBlank = !this.trackers.some((tracker) => tracker.date === today);
  }

  private updateChart() {
    const chartTracker = this.trackers.sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    this.lineChartData.labels = chartTracker.map((tracker) => tracker.date);
    this.lineChartData.datasets[0].data = chartTracker.map(
      (tracker) => tracker.weight
    );
    if (this.chart) {
      this.chart.update();
    }
  }

  onPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.pagedTrackers = this.trackers.slice(startIndex, endIndex);
  }

  generatePdf() {
    const chartElement = document.querySelector(
      '.chart-div canvas'
    ) as HTMLCanvasElement;

    if (!chartElement) {
      console.error('Could not find chart element to print.');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    let yOffset = 20;

    this.trackers.forEach((item, index) => {
      const text = `
        Fitness tracker on day: ${new Date(item.date).toLocaleDateString()}
        Exercise type: ${item.exerciseType}
        Intensity: ${item.intensity}
        Duration: ${item.duration} min
        Weight: ${item.weight} kg
      `;
      pdf.text(text, 20, yOffset);
      yOffset += 40;
      if (yOffset > 270 && index < this.trackers.length - 1) {
        pdf.addPage();
        yOffset = 20;
      }
    });

    const options = { scale: 2 };

    html2canvas(chartElement, options)
      .then((canvas) => {
        const imgWidth = 150;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (yOffset + imgHeight > 297) {
          pdf.addPage();
          yOffset = 20;
        }

        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          0,
          yOffset,
          imgWidth,
          imgHeight
        );

        pdf.setProperties({
          title: 'Fitness tracker PDF',
          subject: 'Fitness tracker',
          author: 'FitnessApp',
        });

        pdf.save('fitness-tracker.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  }
}
