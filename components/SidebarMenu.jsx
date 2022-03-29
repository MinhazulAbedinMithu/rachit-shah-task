import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

import styles from "../styles/SidebarMenu.module.css";

const SidebarMenu = ({ isOpen, setIsOpen, route }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
		setIsOpen(true);
	};

	useEffect(() => {
		if (!isOpen) {
			setIsMenuOpen(false);
		}
	}, [isOpen]);

	return (
		<div className={styles.wrapper} onClick={toggleMenu}>
			<div className={styles.contWrapper}>
				<div
					className={` ${!isOpen && styles.isClosedItem} ${styles.item} ${
						router.pathname == route.path && activeItem
					}`}
				>
					<span>{route.icon}</span>
					<AnimatePresence>
						{isOpen && <motion.div>{route.name}</motion.div>}
					</AnimatePresence>
				</div>
				<FaArrowDown className={isOpen ? styles.arrowDown : styles.arrowHidden} />
			</div>
			{isMenuOpen && (
				<div className="pl-3">
					{route.subRoutes.map((subRoute, index) => (
						<Link href={subRoute.path} key={index}>
							<a
								className={`  ${!isOpen && styles.isClosedItem} ${
									styles.itemDropdown
								} ${
									router.pathname == subRoute.path && styles.activeItem
								}`}
							>
								<span>{subRoute.icon}</span>
								<AnimatePresence>
									{isOpen && <motion.div>{subRoute.name}</motion.div>}
								</AnimatePresence>
							</a>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default SidebarMenu;
