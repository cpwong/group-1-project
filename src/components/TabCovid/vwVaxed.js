import React, { useEffect } from 'react';
import { API_covidVaxed } from '../../api/API'
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

var myroot2;

export function vwVaxed(country)
{
	API_covidVaxed.get(`/?iso=` + country).then(function (response) {
		console.log(response.data);
		graphVaxed(response.data);
	}).catch(function (error) {
		console.error(error);
	});
}

function graphVaxed(props) {
	console.log(props[0]);
	console.log(props[0].date);
	console.log(props[0].people_vaccinated);

	let nuevo = props.map
		((i) => {
			if (Number(i.people_vaccinated) > 0) {
				let rObj = {
					date: i.date,
					val: Number(i.people_vaccinated)
				};
				return rObj;
			}
			
		}).filter(function (x) {
			return x !== undefined;
		});

	console.log(nuevo);

	if (myroot2 != null && !myroot2.isDisposed())
		myroot2.dispose();

	myroot2 = am5.Root.new("divVaxed");

	myroot2.setThemes([
		am5themes_Animated.new(myroot2)
	]);

	let chart = myroot2.container.children.push(am5xy.XYChart.new(myroot2, {
		panX: true,
		panY: true,
		wheelX: "panX",
		wheelY: "zoomX"
	}));

	var cursor = chart.set("cursor", am5xy.XYCursor.new(myroot2, {
		behavior: "none"
	}));
	cursor.lineY.set("visible", false);

	myroot2.dateFormatter.setAll({
		dateFormat: "yyyy",
		dateFields: ["valueX"]
	});

	var xAxis = chart.xAxes.push(am5xy.DateAxis.new(myroot2, {
		maxDeviation: 0.1,
		groupData: false,
		baseInterval: {
			timeUnit: "day",
			count: 1
		},
		renderer: am5xy.AxisRendererX.new(myroot2, {}),
		tooltip: am5.Tooltip.new(myroot2, {})
	}));

	var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(myroot2, {
		renderer: am5xy.AxisRendererY.new(myroot2, {})
	}));

	var series = chart.series.push(am5xy.LineSeries.new(myroot2, {
		name: "Series",
		xAxis: xAxis,
		yAxis: yAxis,
		valueYField: "val",
		valueXField: "date",
		tooltip: am5.Tooltip.new(myroot2, {
			labelText: "{valueY}"
		})
	}));

	chart.set("scrollbarX", am5.Scrollbar.new(myroot2, {
		orientation: "horizontal"
	}));

	series.data.processor = am5.DataProcessor.new(myroot2, {
		dateFormat: "yyyy-MM-dd",
		dateFields: ["date"]
	});

	series.data.setAll(nuevo);

	series.appear(1000);
	chart.appear(1000, 100);
}

