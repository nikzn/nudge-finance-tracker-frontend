import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, input, Input, OnChanges, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { MonthlyData } from '../../../featured/dashboard/dashboard';

@Component({
  selector: 'app-line-chart',
  imports: [ChartModule],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
})
export class LineChart implements OnChanges {
  incomeExpensesData =input<MonthlyData[]>()

  data: any;

    options: any;

    platformId = inject(PLATFORM_ID);

    constructor(private cd: ChangeDetectorRef) {
    //  effect(() => {
    //   const data = this.incomeExpensesData();
    //   if (data && data.length > 0) {
    //     console.log('Data received:', data);
    //     this.initChart();
    //   }
    // });

    }



    ngOnChanges(changes: SimpleChanges): void {
       if (changes['incomeExpensesData'] && this.incomeExpensesData) {
        console.log(changes)
        console.log('Data received:', this.incomeExpensesData());
        this.initChart();  
    }
    }


    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
            console.log(this.incomeExpensesData())
            this.data = {
                labels: this.incomeExpensesData()?.map(e=> e.month),
                datasets: [
                    {
                        label: 'Income',
                        data: this.incomeExpensesData()?.map(e=>e.income),
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--p-green-500'),
                        tension: 0.4
                    },
                    {
                        label: 'Expenses',
                        data:  this.incomeExpensesData()?.map(e=>e.expense),
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--p-red-500'),
                        tension: 0.4
                    }
                ]
            };

            this.options = {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
            this.cd.markForCheck()
        }
    }
}
