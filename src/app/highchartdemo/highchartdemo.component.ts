import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts/highmaps';
import DrillDown from 'highcharts/modules/drilldown';
import usMap from '../../assets/us/us-all.geo.json';
import { AppService } from '../../services/app.service';
DrillDown(Highcharts);

declare var require: any;

@Component({
  selector: 'app-highchartdemo',
  templateUrl: './highchartdemo.component.html',
  styleUrls: ['./highchartdemo.component.scss'],
})
export class HighchartdemoComponent implements OnInit {
  component = this;
  Highcharts: typeof Highcharts = Highcharts;
  usMapData = Highcharts.geojson(usMap);
  // - 'mapChart' for Highcharts Maps
  chartConstructor = 'mapChart';

  chartOptions: Highcharts.Options = {
    chart: {
      events: {
        drilldown: (e: any) => {
          const chart = e.target as any;
          this.service
            .getUSMapCountiesJson(e.point.drilldown)
            .subscribe((jsonData: any) => {
              const provinceData = Highcharts.geojson(jsonData);

              provinceData.forEach((el: any, i) => {
                el.value = i;
              });

              chart.addSeriesAsDrilldown(e.point, {
                name: e.point.name,
                data: provinceData,

                dataLabels: {
                  enabled: true,
                },
              } as any);

              chart.setTitle(null, { text: e.point.name });
            });
        },
        drillup() {
          const chart = this as any;
        },
      },
    },
    title: {
      text: '',
    },
    colorAxis: {
      min: 0,
      minColor: '#E6E7E8',
      maxColor: '#417BCC',
    },

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },
    plotOptions: {
      map: {
        states: {
          hover: {
            color: '#F8BA03',
          },
        },
      },
    },
    series: [
      {
        type: 'map',
        name: 'US',
        data: this.usMapData as any,
      },
    ],
    drilldown: {},
  };

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.usMapData.forEach((el: any, i) => {
      el.value = i;
      el.drilldown = el.properties['hc-key'];
    });
  }
}
