import React, { useState } from 'react';

import Navbar from "./components/Navbar";
import Container from "./components/Container";


import './App.scss';

function App() {
	const [tab, setTab] = useState(1)

	return (
		<div id="App">

			<Navbar tab={tab} setTab={setTab} />

			<Container tab={tab} />
		</div>
	);
}

export default App;
