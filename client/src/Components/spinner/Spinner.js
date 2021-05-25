import React from "react";
import "./Spinner.css";
function Spinner() {
	// source code https://codepen.io/siropkin/pen/ZEpwKVX and thank you
	return (
		<div className="spinner">
			<div className="inner one"></div>
			<div className="inner two"></div>
			<div className="inner three"></div>
		</div>
	);
}

export default Spinner;
