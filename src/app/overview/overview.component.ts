import {Component, OnInit, ViewChild} from '@angular/core';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexStroke,
    ApexTooltip,
    ApexXAxis,
    ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
}

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "My-series",
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                }
            ],
            chart: {
                height: 350,
                type: "bar"
            },
            title: {
                text: "My First Angular Chart"
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
            }
        };
    }

    ngOnInit(): void {
        // window.addEventListener('offline', () => {
        //     console.log('You are offline')
        // })
    }

    ngDoCheck() {
        let i = 0;
        i++;
        console.log('I run ' + i);
    }

    // Testing Notification api
    notifyComponent() {
    }

    handleClick() {
        console.log('check');
    }

    ngAfterContentInit() {
        console.log('Content has initialized');
    }

    ngAfterContentChecked() {
        console.log('Content has been checked');
    }

    ngAfterViewInit() {
        // alert('Content Loaded');
        console.log("View has Initialized");
    }

    ngAfterViewChecked() {
        console.log('View has been checked');
    }

    handleCheck(e: any) {
        e.preventDefault();
    }
}