import { NextPage } from "next";
import { Hero } from "../../components/BlogPage/Hero/Hero";
import PostAsideSuggestions from "../../components/Post/PostAsideSuggestions";

const Blog: NextPage = () => {
	const articlesMap = Array.from({ length: 16 });
	return (
		<div className="w-full min-h-screen blog inline-block">
			<div className="blog-header">
				<div className="blog-header-img bg-background-blog-header left"></div>
				<div className="blog-header-img bg-background-blog-header right"></div>
				<div className="content">
					<span className="badge">Artículos</span>
					<h2>
						&quot; Toda línea de código tiene su historia &quot;
					</h2>
					<span>Articulos compartidos por la comunidad</span>
					<button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-3 h-3">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
						Crear un nuevo artículo
					</button>
				</div>
			</div>
			<div className="blog-content">
				<div className="banners">
					<Image alt="" src={BannerBlog} />
					<Image alt="" src={BannerBlog} />
				</div>

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
					<div className="arrow-right">
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
					<ul>
						{articlesMap.map((_, i) => (
							<li key={i}>
								<div className="article-header">
									<img
										src={`https://source.unsplash.com/random/200x200?sig=${i}`}
									/>
									<div className="badge">Design</div>
								</div>
								<div className="articles-content">
									<h6>
										Lorem ipsum dolor sit amet consectetur.
									</h6>
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
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
export default Blog;
