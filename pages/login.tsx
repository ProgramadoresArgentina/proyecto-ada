import { NextPage } from "next";
import Link from "next/link";

const Login: NextPage = () => (
	<div className="flex justify-center">
        <Link href="/api/auth/login">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                Login
            </button>
        </Link>
	</div>
);

export default Login;