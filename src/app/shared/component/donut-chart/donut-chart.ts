import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, input, OnChanges, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SpendingCategory } from '../../../featured/dashboard/dashboard';

@Component({
  selector: 'app-donut-chart',
  imports: [ChartModule],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.css',
})
export class DonutChart implements OnChanges {

    spendingByCategoryData = input<SpendingCategory[]>([])

 data: any;

    options: any;

    platformId = inject(PLATFORM_ID);



    constructor(private cd: ChangeDetectorRef) {}


    ngOnInit() {
        this.initChart();
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.spendingByCategoryData())
        this.initChart()
    }

    initChart() {
        console.log(this.spendingByCategoryData())
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');

            this.data = {
                labels: this.spendingByCategoryData()?.map(data=>data.category),
                datasets: [
                    {
                        data:  this.spendingByCategoryData()?.map(data=>data.amount),
                        backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
                    }
                ]
            };

            this.options = {
                cutout: '60%',
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                }
            };
            this.cd.markForCheck()
        }
    }
}
