import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Footer } from "../components";
import ButtonUp from "../components/ButtonUp";
import Navbar from "../components/navbar";
import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Tooltip } from "react-tooltip";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { wrapper } from "../store/store";
import { useStore } from "react-redux";
import { setAuthState } from "../store/auth.reducer";

const MyApp: NextPage = ({ Component, pageProps }: AppProps) => {
    const store: any = useStore();

    const getUserInfo = () => {
        fetch('/api/auth/session')
          .then(response => response.json())
          .then(data => {
            store.dispatch(setAuthState(data)); 
        })
          .catch(error => {
            console.log(error)
        });
    }

    useEffect(() => {
        getUserInfo();
    }, []);

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

export default wrapper.withRedux(MyApp);
