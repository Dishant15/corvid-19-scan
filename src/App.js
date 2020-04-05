import React, { useState } from 'react';

import Sidebar from "./components/Sidebar";
import Container from "./components/Container";


import './App.scss';

function App() {
	const [tab, setTab] = useState(1)

	return (
		<div id="App">

			<Sidebar tab={tab} setTab={setTab} />

			<Container tab={tab} />
		</div>
	);
}

export default App;
