import { NextPage } from "next";
import { Hero } from "../components/Hero/Hero";

const Home: NextPage = () => (
		<div className="w-full min-h-screen">
			<Hero />
		</div>
	);

export default Home;
