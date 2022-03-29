import Header from "./Header";
import Sidebar from "./Sidebar";
import React from 'react';

import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
	return (
		<div className={`${styles.wrapperFull}`}>
			<div className={styles.sidebar}>
				<Sidebar />
			</div>
			<div className={styles.mainCont}>
				<Header />
				<main>{children}</main>
			</div>
		</div>
	);
}
