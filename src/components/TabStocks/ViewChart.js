import React, { useEffect } from 'react';
//---- Install amcharts5 npm i @amcharts/amcharts5 ----//
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default function ViewChart(props) {
  const { data } = props;
  
  const symbol = data.id
  const chartData = data.array
  
  
  useEffect( () => {
    console.log('StockChart.useEffect()', chartData);
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
  }, []);

  return (
    <div className='ViewChart block'>
      <p className='is-size-4 has-text-weight-light has-text-centered'>DAILY PRICE CHART</p>
      <div id='stockchart' style={{ width: '100%', height: '700px' }} />
    </div>
  );
}
