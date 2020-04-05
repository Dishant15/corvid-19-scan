import React, { useState } from 'react';

import Sidebar from "./components/Sidebar";
import Container from "./components/Container";

import { AppProvider } from "./utils/data";

import './App.scss';

function App() {

	const [app_state, setAppState] = useState({language : 'english', index : -1, tab : 1})
	const [tab, setTab] = useState(1)

	return (
		<div id="App">

			<AppProvider value={{app_state, setAppState}}>
				<Sidebar tab={tab} setTab={setTab} />

				<Container tab={tab} />
			</AppProvider>
		</div>
	);
}

export default App;
