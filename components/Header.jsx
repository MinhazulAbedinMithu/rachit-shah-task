import styles from "../styles/Header.module.css";

const Header = () => {
	return (
		<div className={styles.wrapperFull}>
			<div className={styles.container}>
				<h2 className={styles.title}>
					Job Task of <span>Rachit Shah</span>
				</h2>
			</div>
		</div>
	);
};

export default Header;
