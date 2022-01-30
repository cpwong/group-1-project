import React, { useEffect } from 'react';
//---- Install amcharts5 npm i @amcharts/amcharts5 ----//
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const dummyData = [
  {
    date: 1327674600000,
    open: 15.87,
    high: 16.02,
    low: 15.85,
    close: 15.97,
  },
  {
    date: 1327933800000,
    open: 15.92,
    high: 16.21,
    low: 15.91,
    close: 16.18,
  },
  {
    date: 1328020200000,
    open: 16.27,
    high: 16.37,
    low: 16.18,
    close: 16.3,
  },
  {
    date: 1328106600000,
    open: 16.37,
    high: 16.39,
    low: 16.27,
    close: 16.29,
  },
  {
    date: 1328193000000,
    open: 16.28,
    high: 16.33,
    low: 16.21,
    close: 16.25,
  },
  {
    date: 1328279400000,
    open: 16.33,
    high: 16.43,
    low: 16.27,
    close: 16.42,
  },
  {
    date: 1328538600000,
    open: 16.37,
    high: 16.61,
    low: 16.36,
    close: 16.57,
  },
  {
    date: 1328625000000,
    open: 16.62,
    high: 16.78,
    low: 16.59,
    close: 16.74,
  },
  {
    date: 1328711400000,
    open: 16.8,
    high: 17.03,
    low: 16.77,
    close: 17.02,
  },
  {
    date: 1328797800000,
    open: 17.17,
    high: 17.74,
    low: 17.16,
    close: 17.61,
  },
  {
    date: 1328884200000,
    open: 17.53,
    high: 17.77,
    low: 17.45,
    close: 17.62,
  },
  {
    date: 1329143400000,
    open: 17.84,
    high: 17.99,
    low: 17.75,
    close: 17.95,
  },
  {
    date: 1329229800000,
    open: 18.02,
    high: 18.2,
    low: 17.93,
    close: 18.19,
  },
  {
    date: 1329316200000,
    open: 18.37,
    high: 18.8,
    low: 17.75,
    close: 17.77,
  },
  {
    date: 1329402600000,
    open: 17.55,
    high: 18.03,
    low: 17.38,
    close: 17.94,
  },
  {
    date: 1329489000000,
    open: 17.97,
    high: 18.13,
    low: 17.87,
    close: 17.93,
  },
  {
    date: 1329834600000,
    open: 18.1,
    high: 18.39,
    low: 18,
    close: 18.39,
  },
  {
    date: 1329921000000,
    open: 18.32,
    high: 18.41,
    low: 18.18,
    close: 18.32,
  },
  {
    date: 1330007400000,
    open: 18.4,
    high: 18.49,
    low: 18.2,
    close: 18.44,
  },
  {
    date: 1330093800000,
    open: 18.56,
    high: 18.67,
    low: 18.52,
    close: 18.66,
  },
  {
    date: 1330353000000,
    open: 18.62,
    high: 18.88,
    low: 18.44,
    close: 18.78,
  },
  {
    date: 1330439400000,
    open: 18.86,
    high: 19.12,
    low: 18.78,
    close: 19.12,
  },
  {
    date: 1330525800000,
    open: 19.34,
    high: 19.56,
    low: 19.13,
    close: 19.37,
  },
  {
    date: 1330612200000,
    open: 19.58,
    high: 19.58,
    low: 19.24,
    close: 19.45,
  },
  {
    date: 1330698600000,
    open: 19.44,
    high: 19.53,
    low: 19.38,
    close: 19.47,
  },
  {
    date: 1330957800000,
    open: 19.48,
    high: 19.55,
    low: 18.79,
    close: 19.04,
  },
  {
    date: 1331044200000,
    open: 18.7,
    high: 19.06,
    low: 18.44,
    close: 18.94,
  },
  {
    date: 1331130600000,
    open: 19.17,
    high: 19.21,
    low: 18.69,
    close: 18.95,
  },
  {
    date: 1331217000000,
    open: 19.1,
    high: 19.39,
    low: 19,
    close: 19.36,
  },
  {
    date: 1331303400000,
    open: 19.44,
    high: 19.56,
    low: 19.4,
    close: 19.47,
  },
  {
    date: 1331559000000,
    open: 19.61,
    high: 19.71,
    low: 19.54,
    close: 19.71,
  },
  {
    date: 1331645400000,
    open: 19.91,
    high: 20.29,
    low: 19.85,
    close: 20.29,
  },
  {
    date: 1331731800000,
    open: 20.64,
    high: 21.24,
    low: 20.55,
    close: 21.06,
  },
  {
    date: 1331818200000,
    open: 21.41,
    high: 21.43,
    low: 20.66,
    close: 20.91,
  },
  {
    date: 1331904600000,
    open: 20.88,
    high: 21.04,
    low: 20.64,
    close: 20.91,
  },
  {
    date: 1332163800000,
    open: 21.37,
    high: 21.49,
    low: 21.04,
    close: 21.47,
  },
  {
    date: 1332250200000,
    open: 21.41,
    high: 21.67,
    low: 21.12,
    close: 21.64,
  },
  {
    date: 1332336600000,
    open: 21.53,
    high: 21.77,
    low: 21.48,
    close: 21.52,
  },
  {
    date: 1332423000000,
    open: 21.35,
    high: 21.59,
    low: 21.27,
    close: 21.41,
  },
  {
    date: 1332509400000,
    open: 21.45,
    high: 21.49,
    low: 21.23,
    close: 21.29,
  },
  {
    date: 1332768600000,
    open: 21.42,
    high: 21.68,
    low: 21.26,
    close: 21.68,
  },
  {
    date: 1332855000000,
    open: 21.65,
    high: 22.01,
    low: 21.65,
    close: 21.95,
  },
  {
    date: 1332941400000,
    open: 22.08,
    high: 22.19,
    low: 21.8,
    close: 22.06,
  },
  {
    date: 1333027800000,
    open: 21.89,
    high: 22.02,
    low: 21.69,
    close: 21.78,
  },
  {
    date: 1333114200000,
    open: 21.74,
    high: 21.81,
    low: 21.35,
    close: 21.41,
  },
  {
    date: 1333373400000,
    open: 21.49,
    high: 22.1,
    low: 21.44,
    close: 22.09,
  },
  {
    date: 1333459800000,
    open: 22.4,
    high: 22.58,
    low: 22.23,
    close: 22.48,
  },
  {
    date: 1333546200000,
    open: 22.3,
    high: 22.35,
    low: 22.04,
    close: 22.3,
  },
  {
    date: 1333632600000,
    open: 22.39,
    high: 22.67,
    low: 22.26,
    close: 22.63,
  },
  {
    date: 1333978200000,
    open: 22.36,
    high: 22.85,
    low: 22.33,
    close: 22.72,
  },
  {
    date: 1334064600000,
    open: 22.85,
    high: 23,
    low: 22.36,
    close: 22.44,
  },
  {
    date: 1334151000000,
    open: 22.72,
    high: 22.75,
    low: 22.26,
    close: 22.36,
  },
  {
    date: 1334237400000,
    open: 22.32,
    high: 22.55,
    low: 22.16,
    close: 22.24,
  },
  {
    date: 1334323800000,
    open: 22.29,
    high: 22.31,
    low: 21.55,
    close: 21.62,
  },
  {
    date: 1334583000000,
    open: 21.79,
    high: 21.8,
    low: 20.65,
    close: 20.72,
  },
  {
    date: 1334669400000,
    open: 20.68,
    high: 21.79,
    low: 20.43,
    close: 21.77,
  },
  {
    date: 1334755800000,
    open: 21.92,
    high: 22.15,
    low: 21.53,
    close: 21.73,
  },
  {
    date: 1334842200000,
    open: 21.44,
    high: 21.6,
    low: 20.88,
    close: 20.98,
  },
  {
    date: 1334928600000,
    open: 21.12,
    high: 21.24,
    low: 20.37,
    close: 20.46,
  },
  {
    date: 1335187800000,
    open: 20.38,
    high: 20.6,
    low: 19.88,
    close: 20.42,
  },
  {
    date: 1335274200000,
    open: 20.09,
    high: 20.27,
    low: 19.82,
    close: 20.01,
  },
  {
    date: 1335360600000,
    open: 21.99,
    high: 22.07,
    low: 21.64,
    close: 21.79,
  },
  {
    date: 1335447000000,
    open: 21.94,
    high: 21.95,
    low: 21.5,
    close: 21.7,
  },
  {
    date: 1335533400000,
    open: 21.61,
    high: 21.65,
    low: 21.45,
    close: 21.54,
  },
  {
    date: 1335792600000,
    open: 21.35,
    high: 21.37,
    low: 20.82,
    close: 20.86,
  },
  {
    date: 1335879000000,
    open: 20.89,
    high: 21.31,
    low: 20.76,
    close: 20.79,
  },
  {
    date: 1335965400000,
    open: 20.72,
    high: 20.98,
    low: 20.67,
    close: 20.93,
  },
  {
    date: 1336051800000,
    open: 21.09,
    high: 21.12,
    low: 20.73,
    close: 20.78,
  },
  {
    date: 1336138200000,
    open: 20.61,
    high: 20.66,
    low: 20.18,
    close: 20.19,
  },
  {
    date: 1336397400000,
    open: 20.05,
    high: 20.46,
    low: 20.04,
    close: 20.34,
  },
  {
    date: 1336483800000,
    open: 20.34,
    high: 20.41,
    low: 19.95,
    close: 20.29,
  },
  {
    date: 1336570200000,
    open: 20.13,
    high: 20.5,
    low: 20.03,
    close: 20.33,
  },
  {
    date: 1336656600000,
    open: 20.52,
    high: 20.57,
    low: 20.3,
    close: 20.38,
  },
  {
    date: 1336743000000,
    open: 20.18,
    high: 20.52,
    low: 20.16,
    close: 20.24,
  },
  {
    date: 1337002200000,
    open: 20.09,
    high: 20.27,
    low: 19.91,
    close: 19.94,
  },
  {
    date: 1337088600000,
    open: 20.05,
    high: 20.11,
    low: 19.71,
    close: 19.76,
  },
  {
    date: 1337175000000,
    open: 19.79,
    high: 19.89,
    low: 19.32,
    close: 19.5,
  },
  {
    date: 1337261400000,
    open: 19.48,
    high: 19.55,
    low: 18.93,
    close: 18.93,
  },
  {
    date: 1337347800000,
    open: 19.07,
    high: 19.41,
    low: 18.65,
    close: 18.94,
  },
  {
    date: 1337607000000,
    open: 19.09,
    high: 20.06,
    low: 19.07,
    close: 20.05,
  },
  {
    date: 1337693400000,
    open: 20.34,
    high: 20.5,
    low: 19.74,
    close: 19.89,
  },
];

export default function ViewChart(props) {
  // const chartData = dummyData;
  const { data: chartData } = props;

  const { symbol } = props;
  console.log('StockChart', chartData);
  
  useEffect( () => {
    let root = am5.Root.new('stockchart');

    //---- INSERT Chart code here ----//
    if (chartData) {
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);
        
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          focusable: true,
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX"
        })
      );
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          groupData: true,
          maxDeviation:0.5,
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {pan:"zoom"}),
          tooltip: am5.Tooltip.new(root, {})
        })
      );
      
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation:1,
          renderer: am5xy.AxisRendererY.new(root, {pan:"zoom"})
        })
      );
      
      let color = root.interfaceColors.get("background");
      
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(
        am5xy.CandlestickSeries.new(root, {
          name: symbol,
          fill: color,
          calculateAggregates: true,
          stroke: color,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "close",
          openValueYField: "open",
          lowValueYField: "low",
          highValueYField: "high",
          valueXField: "date",
          lowValueYGrouped: "low",
          highValueYGrouped: "high",
          openValueYGrouped: "open",
          valueYGrouped: "close",
          legendValueText:
            "open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}",
          legendRangeValueText: "{valueYClose}",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "open: {openValueY}\nlow: {lowValueY}\nhigh: {highValueY}\nclose: {valueY}"
          })
        })
      );
      
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          xAxis: xAxis
        })
      );
      cursor.lineY.set("visible", false);
      
      // Stack axes vertically
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Stacked_axes
      chart.leftAxesContainer.set("layout", root.verticalLayout);
      
      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      let scrollbar = am5xy.XYChartScrollbar.new(root, {
        orientation: "horizontal",
        height: 50
      });
      chart.set("scrollbarX", scrollbar);
      
      let sbxAxis = scrollbar.chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          groupData: true,
          groupIntervals: [{ timeUnit: "week", count: 1 }],
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            opposite: false,
            strokeOpacity: 0
          })
        })
      );
      
      let sbyAxis = scrollbar.chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        })
      );
      
      let sbseries = scrollbar.chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis: sbxAxis,
          yAxis: sbyAxis,
          valueYField: "value",
          valueXField: "date"
        })
      );
      
      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      let legend = yAxis.axisHeader.children.push(am5.Legend.new(root, {}));
      
      legend.data.push(series);
      
      legend.markers.template.setAll({
        width: 10
      });
      
      legend.markerRectangles.template.setAll({
        cornerRadiusTR: 0,
        cornerRadiusBR: 0,
        cornerRadiusTL: 0,
        cornerRadiusBL: 0
      });
      
      // set data
      console.log('Drawing chart chartData.lenght:',chartData.length)
      series.data.setAll(chartData);
      sbseries.data.setAll(chartData);
      
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      chart.appear(1000, 100);

      // Pre-zooming to date range
      series.events.once("datavalidated", ev => {
        ev.target.get("xAxis").zoomToDates(new Date(2021, 0, 1), new Date());
      });

    }
    //---- END Chart code here ----//
    root.current = root;
    return () => {
      root.dispose();
    };
  }, [symbol]);

  return (
    <div className='ViewChart block'>
      <h2 className='heading has-text-right has-text-weight-light'>Daily Price Chart</h2>
      <div id='stockchart' style={{ width: '100%', height: '700px' }} />
    </div>
  );
}
