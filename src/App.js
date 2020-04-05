import React, { useEffect } from 'react';
import Axios from 'axios'

import Sidebar from "./components/Sidebar";
import Container from "./components/Container";

import './App.scss';

function App() {

	const url = 'http://ec2-3-7-38-181.ap-south-1.compute.amazonaws.com/v1/api/bot/'

	useEffect(() => {
		Axios.post(url, {language : 'hindi'})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return (
		<div id="App">
			<Sidebar />

			<Container />
		</div>
	);
}

export default App;
