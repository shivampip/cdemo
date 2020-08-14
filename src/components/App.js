import React from "react";

import axios from "axios";

import { Statistic, Container, Dropdown } from "semantic-ui-react";

import CGraph from "./CGraph";

// const countrylist = [{ key: "India", text: "India", value: "India" }];

class App extends React.Component {
	state = {
		data: null,
		wdata: null,
		countries: [],
		cdata: null,
	};

	getIndianData = () => {
		console.log("Fetching Indian Data");
		axios
			.get("https://api.rootnet.in/covid19-in/stats/latest")
			.then((response) => {
				console.log("Response Received");
				console.log(response.data);
				this.setState({ data: response.data.data });
			});
	};

	fillCountries = () => {
		let wdata = this.state.wdata;
		let keys = Object.keys(wdata);
		// console.log("Keys");
		// console.log(keys);

		const tcc = [];
		keys.map((item) => {
			tcc.push({
				key: item,
				text: item,
				value: item,
			});
		});
		// console.log(tcc);
		this.setState({ countries: tcc });
	};

	getWorldData = () => {
		console.log("Fetching World Data");
		axios
			.get("https://pomber.github.io/covid19/timeseries.json")
			.then((response) => {
				console.log("World Response Received");
				console.log(response.data);
				this.setState({ wdata: response.data });
				this.fillCountries();

				let cdata = this.state.wdata["US"];
				console.log(cdata);
				this.setState({ cdata: cdata });
			});
	};

	componentDidMount() {
		console.log("Component Mounted");
		this.getIndianData();
		this.getWorldData();
	}

	handleChange = (e, { value }) => {
		console.log("Selected country: " + value);

		let cdata = this.state.wdata[value];
		console.log(cdata);
		this.setState({ cdata: cdata });
	};

	render() {
		if (!this.state.data) {
			return <h3>Loading....</h3>;
		}
		return (
			<Container>
				<h1>COVID-19 India </h1>
				<br></br>
				<Statistic.Group>
					<Statistic color="blue">
						<Statistic.Value>
							{this.state.data.summary.total}
						</Statistic.Value>
						<Statistic.Label>Confirmed</Statistic.Label>
					</Statistic>
					<Statistic color="green">
						<Statistic.Value>
							{this.state.data.summary.discharged}
						</Statistic.Value>
						<Statistic.Label>Recovered</Statistic.Label>
					</Statistic>
					<Statistic color="grey">
						<Statistic.Value>
							{this.state.data.summary.deaths}
						</Statistic.Value>
						<Statistic.Label>Deaths</Statistic.Label>
					</Statistic>
				</Statistic.Group>
				<h1>World Data</h1>
				<Dropdown
					placeholder="Select Country"
					selection
					search
					options={this.state.countries}
					onChange={this.handleChange}
					value={"US"}
				/>
				{this.state.cdata ? <CGraph data={this.state.cdata} /> : null}
			</Container>
		);
	}
}

export default App;
