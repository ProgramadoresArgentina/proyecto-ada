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
import Script from "next/script";
import { ToastContainer } from "react-toastify";

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

            <Script src="https://www.googletagmanager.com/gtag/js?id=G-90V0GHL08C" />
            <Script id="gtm-script" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-90V0GHL08C');
            `}
            </Script>
            <ToastContainer />
		</UserProvider>
	);
};

export default MyApp;
