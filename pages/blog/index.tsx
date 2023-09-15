import { NextPage } from "next";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import BannerBlog from "../../public/banner-blog.png";
import { PlusIcon, BackwardIcon, ForwardIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion"

const Blog: NextPage = () => {
	const searchParams = useSearchParams();
	const allHastagQuery = searchParams.getAll("hashtag");
	const { data, error, loading, fetchData } = useFetch();

	useEffect(() => {
		if (allHastagQuery.length > 0) {
			let body = { hastagag: allHastagQuery.join(",") };
			fetchData("/api/articles", "POST", body);
			//TODO recibir articles en data y mostrarlos
		}
	}, [searchParams]);

	const articlesMap = Array.from({ length: 12 });
	return (
		<div className="w-full min-h-screen blog inline-block">
			<div className="blog-header">
                <motion.div
                style={{width: "100%"}}
                transition={{duration: .5}}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}>
                    <div className="blog-header-img bg-background-blog-header left"></div>
				    <div className="blog-header-img bg-background-blog-header right"></div>
                </motion.div>
				<div className="content">
					<span className="badge">Artículos</span>
					<h2>
						&quot; Toda línea de código tiene su historia &quot;
					</h2>
					<span>Articulos compartidos por la comunidad</span>
                    <div className="mt-12">
                        <button className="animated-button">
                            <span>
                                <i className="icon mr-2"><PlusIcon className="h-6 text-white" /> </i>
                                Crear un nuevo artículo
                                </span>
                        </button>
                    </div>
				</div>
			</div>
			<div className="blog-content">

				<div className="categories">
					<ul>
						<li id="active">#Explorar</li>
						<li>#Software</li>
						<li>#Historias</li>
						<li>#Testing</li>
						<li>#Herramientas</li>
						<li>#Python</li>
						<li>#DevOps</li>
						<li>#Cursos</li>
						<li>#Eventos</li>
						<li>#Comunidad</li>
					</ul>
					<div className="arrow-right text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 4.5l7.5 7.5-7.5 7.5"
							/>
						</svg>
					</div>
				</div>

				<div className="blogs-list">
					<ul className="blogs">
						{articlesMap.map((_, i) => (
                            <motion.div
                            style={{width: "100%"}}
                            transition={{duration: 1}}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}>
                                <li key={i}>
                                    <div className="article-header">
                                        <img
                                            src={`https://source.unsplash.com/random/200x200?sig=${i}`}
                                        />
                                        {/* <div className="badge">Design</div> */}
                                    </div>
                                    <div className="articles-content">
                                        <h6>
                                            Lorem ipsum dolor sit amet consectetur.
                                        </h6>
                                        <div className="articles-hashtags">
                                            <a>PHP</a>
                                            <a>Java</a>
                                            <a>Python</a>
                                            <a>Testing</a>
                                        </div>
                                        <span className="time">10 MINUTE READ</span>
                                        <div className="article-author">
                                            <div className="article-author-image bg-background-blog-world"></div>
                                            <div className="article-author-information">
                                                <p className="author-title">
                                                    By <b>Daniel Lima</b>
                                                </p>
                                                <span>UX UI Designer</span>
                                            </div>
                                            {/* <ArrowBox  link={'/ai'} color={'white'} /> */}
                                        </div>
                                    </div>
                                </li>
                            </motion.div>
						))}
					</ul>

                    
                    <nav className="mb-20 text-end">
                        <ul className="inline-flex -space-x-px text-sm">
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <BackwardIcon className="h-5" />
                                </a>
                                </li>
                                <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                                </li>
                                <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                                </li>
                                <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <ForwardIcon className="h-5" />
                                </a>
                            </li>
                        </ul>
                    </nav>

				</div>
			</div>
		</div>
	);
};
export default Blog;
