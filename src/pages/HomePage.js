import React, { useState } from 'react';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";


import './HomePage.scss';

function HomePage() {
	const [tab, setTab] = useState(2)

	return (
		<div id="HomePage">

			<Navbar tab={tab} setTab={setTab} />

			<Container tab={tab} />

			<Footer />
		</div>
	);
}

export default HomePage;
