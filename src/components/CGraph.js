import React from "react";
import { TimeSeries, TimeRange } from "pondjs";

import {
	Charts,
	ChartContainer,
	ChartRow,
	YAxis,
	LineChart,
} from "react-timeseries-charts";

const CGraph = (props) => {
	let cdata = props.data;
	const points = [];
	const rpoints = [];
	const dpoints = [];
	cdata.map((item) => {
		points.push([Date.parse(item.date), item.confirmed]);
		rpoints.push([Date.parse(item.date), item.recovered]);
		dpoints.push([Date.parse(item.date), item.deaths]);
	});

	const confirmTs = new TimeSeries({
		name: "Confirmed Cases",
		columns: ["time", "value"],
		points: points,
	});

	const recoveredTs = new TimeSeries({
		name: "Recovered Cases",
		columns: ["time", "value"],
		points: rpoints,
	});

	const deathTs = new TimeSeries({
		name: "Death Cases",
		columns: ["time", "value"],
		points: dpoints,
	});

	return (
		<div>
			<h1>Graph is here</h1>
			<ChartContainer timeRange={confirmTs.range()}>
				<ChartRow height="250">
					<YAxis
						// style={axisStyle}
						id="price"
						label="Number of cases"
						min={confirmTs.min()}
						max={confirmTs.max()}
						width="60"
						// format="$,.1f"
					/>
					<Charts>
						<LineChart axis="price" series={confirmTs} />
						<LineChart axis="price" series={recoveredTs} />
						<LineChart axis="price" series={deathTs} />
					</Charts>
				</ChartRow>
			</ChartContainer>
		</div>
	);
};

export default CGraph;
