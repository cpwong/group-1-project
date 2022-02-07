import React, { useEffect } from 'react';
import { API_covidstat } from '../../api/API'
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

var myroot1;

export function COVIDapiBycountry(country)
{
	API_covidstat.get(`/statistics?country=` + country).then(function (response) {
		console.log(response.data);
		COVIDplotcountryChart(response.data);
	}).catch(function (error) {
		console.error(error);
	});
}

function COVIDplotcountryChart(props) {
	console.log(props.response[0].cases.total);
	console.log(props.response[0].deaths.total);

	if (myroot1 != null && !myroot1.isDisposed())
		myroot1.dispose();

	myroot1 = am5.Root.new("chartdiv");

	myroot1.setThemes([
		am5themes_Animated.new(myroot1)
	]);

	let chart = myroot1.container.children.push(am5percent.PieChart.new(myroot1, {
		layout: myroot1.verticalLayout
	}));

	let series = chart.series.push(am5percent.PieSeries.new(myroot1, {
		valueField: "value",
		categoryField: "category"
	}));

	series.data.setAll([
		{ value: props.response[0].cases.active , category: "Total Active Cases" },
		{ value: props.response[0].cases.recovered, category: "Total Recovered Cases" },
		{ value: props.response[0].deaths.total, category: "Total Death" }
	]);

	series.appear(1000, 100);
}

