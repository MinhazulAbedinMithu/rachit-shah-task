import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdOutlineGroups, MdSearch, MdDateRange } from "react-icons/md";
import { SiBootstrap } from "react-icons/si";
import { BiLeftArrow, BiRightArrow, BiLogOut } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import SidebarMenu from "./SidebarMenu";

import styles from "../styles/Sidebar.module.css";

const routes = [
	{
		path: "/",
		name: "Home",
		icon: <FaHome />,
	},
	{
		path: "/clients",
		name: "Clients",
		icon: <MdOutlineGroups />,
	},
	{
		path: "/search",
		name: "Search",
		icon: <MdSearch />,
	},
	{
		path: "/status",
		name: "Status",
		icon: <MdDateRange />,
	},
	{
		path: "/finance",
		name: "Finance",
		icon: <AiTwotoneFileExclamation />,
		subRoutes: [
			{
				path: "/finance/account-statement",
				name: "Account Statement ",
			},
		],
	},
	{
		path: "/seller-support",
		name: "Seller Support",
		icon: <BsCartCheck />,
	},
	{
		path: "/settings",
		name: "Settings",
		icon: <BiCog />,
		exact: true,
		subRoutes: [
			{
				path: "/account",
				name: "Profile ",
			},
			{
				path: "/settings/user",
				name: "User",
			},
			{
				path: "/settings/account",
				name: "Account",
			},
			{
				path: "/settings/chat",
				name: "Chat",
			},
		],
	},
];

//create Animation with framer-motion
export const showAnimation = {
	hidden: {
		width: 0,
		opacity: 0,
		transition: {
			duration: 0.5,
		},
	},
	show: {
		opacity: 1,
		width: "auto",
		transition: {
			duration: 0.5,
		},
	},
};

const Sidebar = ({ children }) => {
	const [isOpen, setIsOpen] = useState(true);
	const router = useRouter();

	//Show and hide toggle
	const toggle = () => setIsOpen(!isOpen);

	return (
		<div className={styles.wrapperFull}>
			<motion.div
				animate={{
					width: isOpen ? "260px" : "75px",
					transition: { duration: 0.5, type: "spring", damping: 10 },
				}}
				className={styles.motionWrapper}
			>
				{/*Sidebar Header*/}
				<div className={styles.header}>
					<SiBootstrap className={styles.logo} />
					<AnimatePresence>
						{isOpen && (
							<motion.div
								variants={showAnimation}
								initial="hidden"
								animate="show"
								exit="hidden"
								className="text-4xl font-bold"
							>
								<h2>Name</h2>
								<h5>Dummy</h5>
							</motion.div>
						)}
					</AnimatePresence>
					<div className={styles.toggleBtn} onClick={toggle}>
						{isOpen ? <BiLeftArrow /> : <BiRightArrow />}
					</div>
				</div>

				{/*Sidebar items*/}
				<div className={styles.itemWrapper}>
					{routes.map((route, index) => {
						if (route.subRoutes) {
							return (
								<SidebarMenu
									isOpen={isOpen}
									setIsOpen={setIsOpen}
									route={route}
									showAnimation={showAnimation}
								/>
							);
						}
						return (
							<Link href={route.path} key={index}>
								<a
									className={`  ${!isOpen && styles.isClosedItem} ${
										styles.item
									} ${router.pathname == route.path && styles.activeItem}`}
								>
									<span>{route.icon}</span>
									<AnimatePresence>
										{isOpen && <motion.div>{route.name}</motion.div>}
									</AnimatePresence>
								</a>
							</Link>
						);
					})}
				</div>

				<div className={styles.logoutBtn}>
					<Link href="/logut">
						<a className={`  ${!isOpen && styles.isClosedItem} ${styles.item}`}>
							<span>
								<BiLogOut />
							</span>
							<AnimatePresence>
								{isOpen && <motion.div>Logout</motion.div>}
							</AnimatePresence>
						</a>
					</Link>
				</div>
			</motion.div>
		</div>
	);
};

export default Sidebar;
