import React, { useEffect, useState } from 'react';
//---- Install amcharts5 npm i @amcharts/amcharts5 ----//
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5radar from '@amcharts/amcharts5/radar';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default function ViewGauge(props) {
  const { id, value, high, low } = props;
  // const high = 100;
  // const low = 50;
  // const value = 75;

  useEffect( () => {
    let root = am5.Root.new(id);
    //---- INSERT Chart code here ----//
    if (value > 0) {
      console.log('ViewGauge.useEffect');
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/radar-chart/
      let chart = root.container.children.push(
        am5radar.RadarChart.new(root, {
          panX: false,
          panY: false,
          startAngle: 140,
          endAngle: 400
      }));

      // Create axis and its renderer
      // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
      let axisRenderer = am5radar.AxisRendererCircular.new(root, {
        innerRadius: -35
      });
      
      axisRenderer.grid.template.setAll({
        visible: false
      });
      
      axisRenderer.labels.template.setAll({
        visible: false
      })
      
      let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: low,
        max: high,
        strictMinMax: true,
        renderer: axisRenderer
      }));     
      
      // Add clock hand
      // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
      let axisDataItem = xAxis.makeDataItem({});
      
      let clockHand = am5radar.ClockHand.new(root, {
        pinRadius: am5.percent(15),
        radius: am5.percent(100),
        bottomWidth: 20
      })
      
      let bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
        sprite: clockHand
      }));
      
      xAxis.createAxisRange(axisDataItem);
      
      let label = chart.radarContainer.children.push(am5.Label.new(root, {
        // fill: am5.color(0xffffff),
        fill: am5.color(0x0),
        centerX: am5.percent(50),
        textAlign: "center",
        centerY: am5.percent(-50),
        fontSize: "2.5em"
      }));
      
      axisDataItem.set("value", 0);
      bullet.get("sprite").on("rotation", function () {
        let value = axisDataItem.get("value");
        let text = Math.round(axisDataItem.get("value")).toString();
        let fill = am5.color(0x000000);
        xAxis.axisRanges.each(function (axisRange) {
          if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
            fill = axisRange.get("axisFill").get("fill");
          }
        })
      
        label.set("text", Math.round(value).toString());
      
        clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
        clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
      });
      
      chart.bulletsContainer.set("mask", undefined);
      
      // Create axis ranges bands
      // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
      let bandsData = [{
        color: "#ee1f25",
        lowScore: low,
        highScore: low + (high-low)/3
      }, {
        color: "#f3eb0c",
        lowScore: low + (high-low)/3,
        highScore: low + 2*(high-low)/3
      }, {
        color: "#0f9747",
        lowScore: low + 2*(high-low)/3,
        highScore: high
      }];
      
      am5.array.each(bandsData, function (data) {
        let axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));
      
        axisRange.setAll({
          value: data.lowScore,
          endValue: data.highScore
        });
      
        axisRange.get("axisFill").setAll({
          visible: true,
          fill: am5.color(data.color),
          fillOpacity: 0.8
        });
      
        axisRange.get("label").setAll({
          text: data.title,
          inside: true,
          radius: 15,
          fontSize: "0.9em",
          fontWeight: "bold",
          fill: root.interfaceColors.get("background")
        });
      });

      axisDataItem.animate({
        key: "value",
        to: value,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic)
      });
                  
      // Make stuff animate on load
      chart.appear(1000, 100);
    }
    //---- END Chart code here ----//
    root.current = root;
    return () => {
      root.dispose();
    };
  }, [value, high, low]);

  return(
    <div className='ViewGauge block'>
      <div id={id} style={{ width: '100%', height: '200px' }}/>
    </div>
  )
}