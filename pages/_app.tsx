import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Footer } from "../components";
import ButtonUp from "../components/ButtonUp";
import Navbar from "../components/navbar";
import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Tooltip } from "react-tooltip";
import { Analytics } from '@vercel/analytics/react';

const MyApp: NextPage = ({ Component, pageProps }: AppProps) => {
	return (
		<UserProvider>
			<Head>
				<link rel="shortcut icon" href="/static/favicon.ico" />
				<title>Programadores Argentina - Comunidad</title>
			</Head>
			<Navbar />
			<Component {...pageProps} />
			<ButtonUp />
			<Footer />
            <Tooltip id="tooltip" />
            <Analytics />
		</UserProvider>
	);
};

export default MyApp;
