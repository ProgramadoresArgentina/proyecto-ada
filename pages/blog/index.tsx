import {
	BackwardIcon,
	ForwardIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { NextPage } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

const Blog: NextPage = () => {
	const searchParams = useSearchParams();
	const allHastagQuery = searchParams.getAll("hashtag");
	const { data, error, loading, fetchData } = useFetch();
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);
	const [perPage, setPerPage] = useState(20);
	const router = useRouter();

	useEffect(() => {
		/* if (allHastagQuery.length > 0) {
			let body = { hashtag: allHastagQuery.join(",") };
			fetchData("/api/articles", "POST", body);
            setTotal(data.total);
			//TODO recibir articles en data y mostrarlos
		}
        fetchData(`/api/articles/${page}`, "GET"); */
	}, []);

	useEffect(() => {
		let body = {};
		if (page === 1 && allHastagQuery.length > 0) {
			body = { hashtag: allHastagQuery.join(",") };
			fetchData(`/api/articles/${page}`, "POST", body);
		} else {
			fetchData(`/api/articles/${page}`, "GET");
		}
	}, [page]);

	console.log(allHastagQuery);

	useEffect(() => {
		if (data) {
			setPerPage(data.itemsPerPage);
			setTotal(data.total);
		}
	}, [data]);

	const getNewPageBlog = (value: number) => {
		if (page === 1 && value < 0) return;
		console.log(data.total);
		// if (value === 1 && data.total < 20) return;
		setPage(page + value);
	};

	const articlesMap = Array.from({ length: 12 });
	return (
		<div className="w-full min-h-screen blog inline-block">
			<div className="blog-header">
				<motion.div
					style={{ width: "100%" }}
					transition={{ duration: 0.5 }}
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
						<Link className="animated-button" href="/blog/publish">
							<span>
								<i className="icon mr-2">
									<PlusIcon className="h-6 text-white" />{" "}
								</i>
								Crear un nuevo artículo
							</span>
						</Link>
						<Link
							href="/blogs"
							className="text-sm flex justify-center mt-5 hover:underline">
							<span>Mis Blogs</span>
						</Link>
					</div>
				</div>
			</div>
			<div className="blog-content">
				<div className="categories">
					<ul>
						{allHastagQuery.length > 0 &&
							allHastagQuery?.map((hashtag, index) => (
								<li key={index} id="active">
									#{hashtag}
								</li>
							))}
						<li id="active">#Explorar</li>
					</ul>
				</div>
				<div className="blogs-list">
					<ul className="blogs">
						{data &&
							data.result.map((article, i) => (
								<motion.div
									key={i}
									style={{ width: "100%" }}
									transition={{ duration: 1 }}
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}>
									<li>
										<div className="article-header w-1/4">
											<img
												className="object-cover rounded-sm"
												src={article.image}
											/>
											{/* <div className="badge">Design</div> */}
										</div>
										<div className="articles-content">
											<h6
												onClick={() =>
													router.push(
														`/blog/${article.url}`
													)
												}>
												{article.title}
											</h6>
											<div className="articles-hashtags">
												{article.hashtags.map(
													(h, hi) => (
														<a key={hi}>{h.name}</a>
													)
												)}
											</div>
											{/* <span className="time">10 MINUTE READ</span> */}
											<div className="article-author">
												<div className="article-author-image bg-background-blog-world"></div>
												<div className="article-author-information">
													<p className="author-title">
														By{" "}
														<b>
															{
																article.user
																	.username
															}
														</b>
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
					<div className="w-full flex justify-center items-center gap-10">
						<button
							onClick={() => getNewPageBlog(-1)}
							className="plain-button"
							disabled={page === 1}>
							«
						</button>
						<button
							onClick={() => getNewPageBlog(1)}
							className="plain-button"
							disabled={data?.total < 20}>
							»
						</button>
					</div>
					{/* <nav className="mb-20 text-end">
						<ul className="inline-flex -space-x-px text-sm">
							<a
								href="#"
								className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
								<BackwardIcon className="h-5" />
							</a>
							{Array.from({ length: total / 20 }, (a, index) => {
								const pageNr = index + 1;
								return (
									<li key={index}>
										<a
											href="#"
											onClick={() => setPage(pageNr)}
											className={`${
												page === pageNr
													? "bg-gray-700 text-white"
													: "bg-gray-800 text-gray-500"
											} flex items-center justify-center px-3 h-8 leading-tight border border-gray-700 hover:bg-gray-700 hover:text-white
                                            ${pageNr === 1 && "rounded-l-lg"} ${
												pageNr === 7 && "rounded-r-lg"
											}`}>
											{pageNr}
										</a>
									</li>
								);
							})}
						</ul>
					</nav> */}
				</div>
			</div>
		</div>
	);
};
export default Blog;
