import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { projectsMock } from "../../data/dummy-data";
import { openInNewTab } from "../../helpers/openInNewTab";
import { Certifications } from "../../interfacesModels/Certifications";
import { Education } from "../../interfacesModels/Education";
import { Experience } from "../../interfacesModels/Experience";
import BadgeBlogs from "../../public/portfolio/blogger.svg";
import IconCert from "../../public/portfolio/certification.svg";
import BadgeProfile from "../../public/portfolio/complete-profile.svg";
import BadgeCv from "../../public/portfolio/cv.svg";
import IconEdu from "../../public/portfolio/education.svg";
import IconExp from "../../public/portfolio/experience.svg";
import GitHub from "../../public/portfolio/github.svg";
import IconInfo from "../../public/portfolio/information.svg";
import LinkPortfolio from "../../public/portfolio/link.svg";
import Linkedin from "../../public/portfolio/linkedin.svg";
import BadgeMember from "../../public/portfolio/member.svg";
import IconProy from "../../public/portfolio/proyects.svg";
import IconSocials from "../../public/portfolio/socials.svg";
import { launchToast } from "../../helpers/launchToast";
import { saveAs } from 'file-saver';
import { useQuill } from "react-quilljs";
import hljs from "highlight.js";
import { formatsOptions } from "../../constants/quilljs.config";

export const Portfolio: FC<any> = ({ user }) => {
	const {
		getDataFromArticles,
		getDataFromCv,
		getDataFromUser,
		getDataFromUserSettings,
		getProyectsFromUser = null,
	} = user;

    function capitalizeArray(arr) {
        return arr.map(function(element) {
            return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
        });
    }

    const downloadResume = () => {
        fetch('api/create-pdf')
            .then(response => {
                if (response.status !== 200) throw Error();
                return response.blob()
            })
            .then(blob => {
                launchToast("error", "Descargado");
                saveAs(blob, "hello world.pdf");
            })
            .catch(error => {
                launchToast("error", "No has creado tu primer cv aún");
            });
    }

	const HeaderTitle = ({ url, name }) => (
		<div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
			<Image className="w-5 h-5" alt={name} src={url} />
			<span className="tracking-wide text-[#F78001]">{name}</span>
		</div>
	);
	const SocialDisplay = ({ url, redirectTo }) => (
		<div className="text-center my-2">
			<Link className="bg-gray-700 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
            href={redirectTo} target="_blank">
				<Image
					alt="Programadores Argentina"
					className="w-5 h-5 fill-current"
					src={url}
				/>
			</Link>
		</div>
	);
	const BadgesDisplay = ({ url, name }) => (
		<div className="group flex relative w-9 justify-center items-center">
			<Image alt="Blogs" className="w-8 h-8" src={url} />
			<span className="group-hover:opacity-100 transition-opacity bg-gray-800 text-sm text-center text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mx-auto px-3 py-2">
				{name}
			</span>
		</div>
	);
	const ArticleCard = ({
		id,
		title,
		content,
		hashtags,
		createdAt,
		image,
        url
	}) => {
        const { quill, quillRef } = useQuill({
            readOnly: true,
            modules: {
              toolbar: false,
              syntax: {
                highlight: (text: string) => hljs.highlightAuto(text).value,
              },
            },
            formats: formatsOptions,
        })
        if (quill) quill.setContents(JSON.parse(content))
         
        return (
            <div className="flex max-w-[24rem] flex-col rounded-md bg-gray-800 text-white shadow-md p-4">
			<img
				title={title}
				src={image}
				alt={title}
				className="w-full object-cover rounded-lg h-44"
			/>
			<h4 className="text-xl font-semibold text-gray-100 mt-4 truncate">
				{title}
			</h4>
			<p className="overflow-hidden text-l font-normal text-gray-500 mt-4 line-clamp-4 h-24">
                <div ref={quillRef}></div>
			</p>
			<Link href={`/blog/${url}`}
				className="text-blue-600 font-lg text-semibold cursor-pointer mt-6">
				Ir al blog
			</Link>
			<div className="flex items-center justify-between pt-6">
				<div className="flex items-center space-x-3">
					{hashtags.map((hashtag) => (
						<Link
							href={`/blog?hashtag=${hashtag.name}`}
							key={hashtag.name}
							className="text-sm">
							#{hashtag.name}
						</Link>
					))}
				</div>
				<p className="text-xs">{convertToDate(createdAt)}</p>
			</div>
		</div>
        )
    };

	const ProyectCard = ({ title, techs, description, link, source }) => (
		<div className="w-full">
			<div className="bg-gray-800 rounded-md p-3">
				<div className="w-full overflow-hidden">
					<Image
						width={500}
						height={100}
						className="h-auto max-w-full rounded-md"
						src="https://picsum.photos/500/300"
						alt=""
					/>
				</div>
				<h1 className="text-white font-bold text-xl leading-8 my-1">
					{title}
				</h1>
				<h3 className="text-gray-500 font-lg text-semibold leading-6">
					- {techs.map((tech: String) => `${tech} - `)}
				</h3>
				<p className="text-sm text-gray-300 leading-6">{description}</p>
				<h3
					onClick={() => openInNewTab(link)}
					className="text-blue-600 font-lg text-semibold leading-6 cursor-pointer">
					Preview
				</h3>
				<h3
					onClick={() => openInNewTab(source)}
					className="text-blue-600 font-lg text-semibold leading-6 cursor-pointer">
					Source
				</h3>
			</div>
		</div>
	);
	const CertificationCard = ({
		title,
		institution = null,
		link = null,
		startYear,
		endYear,
		description,
	}) => (
		<li>
			<div className="text-gray-100">{title}</div>
			{institution && (
				<div className="text-gray-500 text-xs">{institution}</div>
			)}
			{link && (
				<div
					onClick={() => openInNewTab(link)}
					className="text-gray-500 text-xs">
					{link}
				</div>
			)}
			<div className="text-gray-500 text-xs">
				{convertToDate(startYear)} -{" "}
				{endYear ? convertToDate(endYear) : "Actualidad"}
			</div>
			<div className="text-gray-500 text-xs">{description}</div>
		</li>
	);
	const ExperienceCard = ({ title, startYear, endYear, description }) => (
		<li>
			<div className="text-white">{title}</div>
			<div className="text-gray-500 text-xs">
				{convertToDate(startYear)} -
				{endYear ? convertToDate(endYear) : "Actualidad"}
			</div>
			<div className="text-gray-500 text-xs">{description}</div>
		</li>
	);
	const EducationCard = ({ title, startYear, endYear, description }) => (
		<li>
			<div className="text-white">{title}</div>
			<div className="text-gray-500 text-xs">
				{convertToDate(startYear)} -{" "}
				{endYear ? convertToDate(endYear) : "Actualidad"}
			</div>
			<div className="text-gray-500 text-xs">{description}</div>
		</li>
	);

	const Divider = () => <div className="my-4"></div>;

	const convertToDate = (date: Date) => {
		return new Date(date).toLocaleDateString();
	};

	return (
		<div className="bg-[#0D1116] min-h-screen pt-16 font-ibm">
			<div className="container mx-auto xl:p-5 mt-5">
				<div className="md:flex no-wrap md:-mx-0">
					{/* LEFT CARD */}
					<div className="w-full md:w-3/12 md:mx-2">
						<div className="bg-[#161B22] p-3 border-t-4 border-[#673fd7]">
							<div className="image overflow-hidden">
								<img
									width={100}
									height={100}
									className="h-auto w-full mx-auto"
									src={getDataFromUserSettings.avatar}
									alt={getDataFromUserSettings.firstName}
								/>
							</div>
							{/* LEFT CARD DESCRIPTION */}
							<h1 className="text-white font-bold text-xl leading-8 my-1">
								{getDataFromUserSettings.firstName}{" "}
								{getDataFromUserSettings.lastName}
							</h1>
							<h3 className="text-gray-500 font-lg text-semibold leading-6">
								Web Developer
							</h3>
							<p className="text-sm text-gray-300 hover:text-gray-600 leading-6">
								{getDataFromUserSettings.description}
							</p>
							{/* END LEFT CARD DESCRIPTION */}

							{/* LEFT CARD STATUS */}
							<ul className="bg-gray-800 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
								<li className="flex items-center md:flex-col lg:flex-row md:items-start py-3">
									<span className="text-white">CV</span>
									<span className="ml-auto md:ml-0 md:items-start lg:ml-auto">
										<button className="plain-button py-1 px-2 rounded text-gray-300 text-sm"
                                        onClick={() => downloadResume()}>
											Descargar
										</button>
									</span>
								</li>
								<li className="flex items-center md:flex-col lg:flex-row md:items-start py-3">
									<span className="text-white">Estado</span>
									<span className="ml-auto md:ml-0 md:items-start lg:ml-auto">
										<span className="py-1 px-2 rounded text-gray-300 text-sm">
											{getDataFromUserSettings.status ===
											"BUSCANDO"
												? "En búsqueda"
												: getDataFromUserSettings.status}
										</span>
									</span>
								</li>
								<li className="flex items-center md:flex-col md:items-start  lg:flex-row py-3">
									<span className="text-white">Miembro desde </span>
									<span className="ml-auto md:ml-0 lg:ml-auto text-gray-300">
										{convertToDate(
											getDataFromUser.createdAt
										)}
									</span>
								</li>
								<li className="flex items-center md:flex-col md:items-start  lg:flex-row py-3">
									<span className="text-white">Logros</span>
									<div className="grid grid-cols-1 ml-auto md:ml-0 lg:ml-auto text-gray-300">
										{/* <BadgesDisplay
											url={BadgeBlogs}
											name={"5+ Blogs"}
										/>
										<BadgesDisplay
											url={BadgeCv}
											name={"CV Completo"}
										/> */}
										<BadgesDisplay
											url={BadgeMember}
											name={"Miembro de PA"}
										/>
										{/* <BadgesDisplay
											url={BadgeProfile}
											name={"Perfil Completo"}
										/> */}
									</div>
								</li>
							</ul>

							{/*END LEFT CARD STATUS */}
						</div>
						<Divider />
						<div className="bg-[#161B22] p-3 hover:shadow">
							<HeaderTitle url={IconSocials} name={"Redes"} />
							<div className="grid grid-cols-3">
                                {
                                    getDataFromUserSettings.linkedin && getDataFromUserSettings.linkedin !== '' &&
                                    <SocialDisplay url={Linkedin} redirectTo={`https://www.linkedin.com/in/${getDataFromUserSettings.linkedin}`} />
                                }
                                {
                                    getDataFromUserSettings.github && getDataFromUserSettings.github !== '' &&
                                    <SocialDisplay url={GitHub} redirectTo={`https://github.com/${getDataFromUserSettings.github}`} />
                                }
								{/* <SocialDisplay url={FaBehance} redirectTo={getDataFromUserSettings.behance} /> */}
							</div>
						</div>
					</div>
					{/* END LEFT CARD */}
					<Divider />
					{/* RIGHT CARD */}
					<div className="w-full md:w-9/12 md:mx-2 h-auto">
						{/* USER INFO */}
						<div className="bg-[#161B22] p-3 shadow-sm rounded-sm">
							<HeaderTitle url={IconInfo} name={"Información"} />
							<div className="text-gray-700">
								<div className="grid grid-cols-1 md:grid-cols-2 text-sm">
									<div className="flex flex-row justify-start items-center">
										<div className="min-w-[60px] py-2 font-semibold text-gray-300">
											Nombre
										</div>
										<div className="px-2 lg:px-4 py-2 text-gray-300">
											{getDataFromUser?.username}
										</div>
									</div>
									{/* <div className="flex flex-row justify-start items-center overflow-x-scroll no-scrollbar">
										<div className="min-w-[60px] md:px-1 py-2 font-semibold text-gray-300">
											Email
										</div>
										<div className="mx-2 md:-mx-9 xl:mx-2 py-2">
											<a
												className="text-blue-800"
												href="mailto:jane@example.com">
												{getDataFromUser.email}
											</a>
										</div>
									</div> */}
									<div className="flex flex-row justify-start items-center">
										<div className="min-w-[60px] py-2 font-semibold text-gray-300 ">
											Posición
										</div>
										<div className="px-2 lg:px-4 py-2 text-gray-300">
											{
                                                capitalizeArray(getDataFromUserSettings.position).join(', ')
                                            }
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* END USER INFO */}
						{/* EXP && EDUCATION */}
						<div className="bg-[#161B22] p-3 pb-0 shadow-sm rounded-sm">
							<div className="grid grid-cols-1 md:grid-cols-2">
								{/* EXP */}
								{getDataFromCv?.experience.length > 0 && (
									<>
										<Divider />

										<div>
											<HeaderTitle
												name={"Experiencia"}
												url={IconExp}
											/>
											<ul className="list-inside space-y-2">
												{getDataFromCv.experience.map(
													(
														experience: Experience
													) => (
														<ExperienceCard
															key={experience.id.toString()}
															{...experience}
														/>
													)
												)}
											</ul>
										</div>
									</>
								)}
								{/* EDUCATION */}
								{getDataFromCv?.education.length > 0 && (
									<div className="mt-4 md:mt-0">
										<HeaderTitle
											name={"Education"}
											url={IconEdu}
										/>
										<ul className="list-inside space-y-2">
											{getDataFromCv.education.map(
												(education: Education) => (
													<EducationCard
														key={education.id.toString()}
														{...education}
													/>
												)
											)}
										</ul>
									</div>
								)}
							</div>
						</div>
						{/*END EXP && EDUCATION  */}
						{/* CARTIFICATES */}
						{getDataFromCv?.certifications.length > 0 && (
							<>
								<Divider />
								<div className="bg-[#161B22] p-3 shadow-sm rounded-sm">
									<div className="grid grid-cols-1">
										<HeaderTitle
											name={"Certificaciones"}
											url={IconCert}
										/>
										<ul className="list-inside space-y-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
											{getDataFromCv.certifications.map(
												(
													certifaction: Certifications
												) => (
													<CertificationCard
														key={certifaction.id.toString()}
														{...certifaction}
													/>
												)
											)}
										</ul>
									</div>
								</div>
							</>
						)}
						{/* END CARTIFICATES */}
						{/* LAST ARTICLES */}
						{getDataFromArticles?.length > 0 && (
							<>
								<Divider />
								<div className="bg-[#161B22] p-3 shadow-sm rounded-sm">
									<div className="grid grid-cols-1">
										<HeaderTitle
											name={"Últimos Articulos"}
											url={IconProy}
										/>
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
											{getDataFromArticles?.map(
												(article, index) => (
													<ArticleCard
														key={article.createdAt}
														{...article}
													/>
												)
											)}
										</div>
									</div>
								</div>
							</>
						)}

						{/* END LAST ARTICLES */}
						{/* HIGHLIGHTED PROYECTS  */}
						{getProyectsFromUser?.length > 0 && (
							<>
								<Divider />
								<div className="bg-[#161B22] p-3 shadow-sm rounded-sm">
									<div className="grid grid-cols-1">
										<HeaderTitle
											name={"Proyectos Destacados"}
											url={IconProy}
										/>
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
											{projectsMock.map((project) => (
												<ProyectCard
													key={project.id}
													{...project}
												/>
											))}
										</div>
										{/* END PROYECTOS DESTACADOS */}
									</div>
								</div>
							</>
						)}
						{/* END HIGHLIGHTED PROYECTS  */}
						<Divider />
					</div>
					{/*END RIGHT CARD */}
				</div>
			</div>
		</div>
	);
};
