import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts/highmaps';
import DrillDown from 'highcharts/modules/drilldown';
import usMap from '@highcharts/map-collection/countries/us/us-all.geo.json';
DrillDown(Highcharts);

declare var require: any;

@Component({
  selector: 'app-highchartdemo',
  templateUrl: './highchartdemo.component.html',
  styleUrls: ['./highchartdemo.component.scss'],
})
export class HighchartdemoComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  usMapData = Highcharts.geojson(usMap);
  // - 'mapChart' for Highcharts Maps
  chartConstructor = 'mapChart';

  chartOptions: Highcharts.Options = {
    chart: {
      events: {
        drilldown(e: any) {
          const chart = this as any;

          const mapKey = 'countries/us/' + e.point.drilldown + '-all';
          const mapData = require(`@highcharts/map-collection/${mapKey}.geo.json`);

          const provinceData = Highcharts.geojson(mapData);
          // Set a random value on map
          provinceData.forEach((el: any, i) => {
            el.value = i;
          });

          chart.addSeriesAsDrilldown(e.point, {
            name: e.point.name,
            data: provinceData,

            dataLabels: {
              enabled: true,
            },
          });

          chart.setTitle(null, { text: e.point.name });
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
  constructor() {}
  ngOnInit(): void {
    this.usMapData.forEach((el: any, i) => {
      el.value = i;
      el.drilldown = el.properties['hc-key'];
    });
  }
}
