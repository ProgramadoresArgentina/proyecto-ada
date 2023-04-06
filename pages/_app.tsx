import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Footer } from "../components";
import ButtonUp from "../components/ButtonUp";
import Navbar from "../components/navbar";
import "../styles/globals.css";

const MyApp: NextPage = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/static/favicon.ico" />
				<title>Programadores Argentina - Comunidad</title>
			</Head>
			<Navbar />
			<Component {...pageProps} />
			<ButtonUp />
			<Footer />
		</>
	);
};

export default MyApp;
