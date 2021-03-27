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

  readonly selectedCountyColor = '#008000';

  readonly defaultCountyColor = '#fefefe';

  preSelectedCounties = [
    'us-az-011',
    'us-az-009',
    'us-az-023',
    'us-wa-055',
    'us-wa-019',
    'us-wa-021',
    'us-wa-001',
    'us-wa-003',
    'us-wa-035',
    'us-wa-045',
    'us-wa-041',
    'us-ks-093',
    'us-ks-171',
    'us-ks-177',
    'us-ks-187',
    'us-ks-189',
    'us-ks-031',
    'us-ks-059',
    'us-ks-207',
    'us-ks-139',
    'us-ks-183',
    'us-tx-415',
    'us-tx-373',
    'us-tx-291',
    'us-tx-433',
    'us-tx-089',
    'us-tx-135',
    'us-tx-497',
    'us-tx-097',
    'us-tx-245',
    'us-tx-227',
    'us-tx-387',
    'us-tx-431',
    'us-tx-335',
    'us-ak-105',
    'us-ak-130',
    'us-ak-220',
    'us-ak-290',
    'us-ak-068',
    'us-ak-170',
    'us-ak-198',
    'us-ak-195',
    'us-ak-275',
    'us-ak-110',
  ];

  isCountyPreSelected(countyHcKeyName: string) {
    if (!countyHcKeyName) return undefined;
    return this.preSelectedCounties.find(
      (key: string) =>
        key && key.toLowerCase() === countyHcKeyName.toLowerCase()
    );
  }

  getColor(key: string) {
    if (!key) return this.defaultCountyColor;
    return this.isCountyPreSelected(key)
      ? this.selectedCountyColor
      : this.defaultCountyColor;
  }

  selectCounty(countyHCKeyName: string) {
    if (!countyHCKeyName) return;
    this.preSelectedCounties = [...this.preSelectedCounties, countyHCKeyName];
  }

  unselectCounty(countyHCKeyName: string) {
    this.preSelectedCounties = this.preSelectedCounties.filter(
      (county) => county !== countyHCKeyName
    );
  }

  addOrRemoveCounty(
    countyHCKeyName: string,
    callBack: (value: boolean) => void
  ) {
    const county = this.isCountyPreSelected(countyHCKeyName);
    if (county) {
      this.unselectCounty(countyHCKeyName);
      callBack(false); // when removed
    } else {
      this.selectCounty(countyHCKeyName);
      callBack(true); // when added
    }
  }

  chartOptions: Highcharts.Options = {
    chart: {
      events: {
        drilldown: (e: any) => {
          const chart = e.target as any;
          chart.showLoading('Loading Province Data');
          this.service
            .getUSMapCountiesJson(e.point.drilldown)
            .subscribe((jsonData: any) => {
              const provinceData = Highcharts.geojson(jsonData);

              provinceData.forEach((el: any, i) => {
                el.value = el.name;
                //el.properties['hc-key']
                el.color = this.getColor(el.properties['hc-key']);
              });
              chart.hideLoading();
              chart.addSeriesAsDrilldown(e.point, {
                name: e.point.name,
                data: provinceData,
                dataLabels: {
                  enabled: true,
                  color: 'black',
                } as Highcharts.PlotMapDataLabelsOptions,
                tooltip: {
                  headerFormat: '',
                  pointFormat: '<b>{point.name}</b> [{series.name}]',
                },
                events: {
                  click: (e: any) => {
                    const countyKey = e.point.properties['hc-key'];
                    this.addOrRemoveCounty(countyKey, (isAdded) => {
                      e.point.color = this.getColor(countyKey);
                    });
                  },
                },
              } as Highcharts.SeriesOptionsType);

              chart.setTitle(e.point.name, { text: e.point.name });
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
    // colorAxis: {
    //   min: 0,
    //   minColor: '#E6E7E8',
    //   maxColor: '#417BCC',
    // },
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
            color: '#dedede',
          },
        },
      },
    },
    series: [
      {
        type: 'map',
        name: 'US',
        data: this.usMapData as any,
        states: {
          hover: {
            color: '#BADA55',
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
        // data: [['us-wa', 1]] as any,
        // dataLabels: {
        // enabled: true,
        // color: '#dedede',
        // formatter: function () {
        // if (this.point.value) {
        // return this.point.name;
        // }
        // },
        // },
        tooltip: {
          headerFormat: '',
          pointFormat: '{point.name}',
        },
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

  get selectedCounties() {
    return this.preSelectedCounties.join(', ');
  }
}
