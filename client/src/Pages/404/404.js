import React from "react";
import "./404.css";

export function PageNotFound() {
	return (
		<div className="container">
			<div className="error404">
				<img src="/images/404/404.gif" alt="page not found" />
				<div className="col-12 text-center"> page not found </div>
			</div>
		</div>
	);
}
