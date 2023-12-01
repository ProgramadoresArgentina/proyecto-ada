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
import { EyeIcon } from "@heroicons/react/20/solid";
import RickyLoader from "../../components/ricky-loader";

const Blog: NextPage = () => {
	const searchParams = useSearchParams();
    const [allHashtagQuery, setAllHashtagQuery] = useState([]);
	const { data, error, loading, fetchData } = useFetch();
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);
	const [perPage, setPerPage] = useState(6);
	const router = useRouter();

	useEffect(() => {
		let body = {};
        const hashtags = searchParams.getAll("hashtag");
        setAllHashtagQuery(hashtags);
		if (page === 1 && hashtags.length > 0) {
			body = { hashtag: hashtags.join(",") };
			fetchData(`/api/articles/${page}`, "POST", body);
		} else {
            onSetPage(1)
        }
	}, [searchParams]);

	useEffect(() => {
		if (data) {
			setPerPage(data.itemsPerPage);
			setTotal(data.total);
		}
	}, [data]);

    const onSetPage = (pageNr: number) => {
        setPage(pageNr);
        fetchData(`/api/articles/${pageNr}`, "GET");
    }

    const resetFilters = () => {
        onSetPage(1);
        setAllHashtagQuery([]);
    }

    const getNewPageBlog = (value: number) => {
		if (page === 1 && value < 0) return;
        onSetPage(page + value);
	};

	const articlesMap = Array.from({ length: 12 });
	return (
		<div className="w-full min-h-screen blog inline-block">
			<div className="blog-header bg-background-blog-header">
				<div className="content pt-20 lg:pt-0">
					<span className="badge">Artículos</span>
					<h2 className="text-[.75rem] max-w-full lg:max-w-[40%]">
						&quot; Toda línea de código tiene su historia &quot;
					</h2>
					<span>Articulos compartidos por la comunidad</span>
                    <div className="mt-5">
                        <Link className="shine-button" href="/blog/publish">
                            <i className="icon mr-2"><PlusIcon className="h-6 text-white" /> </i>
                            Crear un nuevo artículo
                        </Link>
                        <Link href="/blogs" className="text-sm flex justify-center mt-5 hover:underline">
                            <span>Mis Blogs</span>
                        </Link>
                    </div>
				</div>
			</div>
			<div className="blog-content mx-10 lg:mx-24 my-10">

				<div className="categories">
					<ul>
						{allHashtagQuery.length > 0 &&
							allHashtagQuery?.map((hashtag, index) => (
								<li key={index} id="active">
									#{hashtag}
								</li>
							))}
						<li id={allHashtagQuery && allHashtagQuery.length > 0 ? "" : "active"}
                        onClick={() => resetFilters()}>#Explorar</li>
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

                {
                    loading ?
                    <RickyLoader />
                    :
                    <div className="blogs-list">
                        <ul className="blogs grid-cols-1 lg:grid-cols-2c">
                            {data && data.result && data.result.map((article, i) => (
                                <motion.div
                                key={i}
                                style={{width: "100%"}}
                                transition={{duration: 1}}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}>
                                    <li className="flex-col lg:flex-row">
                                        <div className="article-header w-full lg:w-1/4">
                                            <img className="object-cover rounded-sm"
                                                src={article.image}
                                            />
                                            {/* <div className="badge">Design</div> */}
                                        </div>
                                        <div className="articles-content">
                                            <h6 onClick={() => router.push(`/blog/${article.url}`)}>
                                                {article.title}
                                            </h6>
                                            <div className="articles-hashtags">
                                                {
                                                    article.hashtags.slice(0, 5).map((h, hi) => <a key={hi}>{h.name}</a>)
                                                }
                                            </div>
                                            {/* <span className="time">10 MINUTE READ</span> */}
                                            <div className="article-author">
                                                <div className="article-author-image"
                                                style={{'backgroundImage': `url(${article.user.userSettings ? article.user.userSettings.avatar : ""})`}}></div>
                                                <div className="article-author-information">
                                                    <p className="author-title">
                                                        Creado por 
                                                        {
                                                            article.user.userSettings ?
                                                            <Link className="font-bold" href={`/pro/${article.user.userSettings.url}`}> {article.user.username}</Link>
                                                            :
                                                            <b> {article.user.username}</b>
                                                        }
                                                    </p>
                                                    <div className="flex text-sm gap-3">
                                                        {
                                                            article.user.userSettings &&
                                                            (
                                                            <>
                                                                <span>{article.user.userSettings.position}</span>
                                                                <span>|</span>
                                                            </>
                                                            )
                                                        }
                                                        <span className="flex gap-2"><EyeIcon className="w-3" /> {article.views} vistas</span>
                                                    </div>
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
                                disabled={data?.result?.length < 6}>
                                »
                            </button>
                        </div>

                        {/* <nav className="mb-20 text-end">
                            <ul className="inline-flex -space-x-px text-sm">
                                <a href="#" className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <BackwardIcon className="h-5" />
                                </a>
                                {
                                    Array.from({length: total/20}, (a, index) => {
                                        const pageNr = index+1;
                                        return (
                                            <li key={index}>
                                                <a href="#" onClick={() => onSetPage(pageNr)}
                                                className={`${page === pageNr ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-500'} flex items-center justify-center px-3 h-8 leading-tight border border-gray-700 hover:bg-gray-700 hover:text-white
                                                ${pageNr === 1 && 'rounded-l-lg'} ${pageNr === 7 && 'rounded-r-lg'}`}>{pageNr}</a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </nav> */}
				</div>
                }
			</div>
		</div>
	);
};
export default Blog;
