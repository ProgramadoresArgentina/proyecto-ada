import { NextPage } from "next";
import { CommentsSection } from "../components";
import { ContactSection } from "../components/Contact/ContactSection";
import { Hero } from "../components/Hero/Hero";
import ProjectsSection from "../components/ProjectsSection";
import StaffSection from "../components/StaffSection";
import { commentsList } from "../data/dummy-data";

const Home: NextPage = () => (
	<div className="w-full min-h-screen">
		<Hero />
		<ProjectsSection />
		<CommentsSection commentsList={commentsList} />
		<StaffSection />
		<ContactSection />
	</div>
);

export default Home;
