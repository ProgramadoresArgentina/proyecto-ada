import { useUser } from "@auth0/nextjs-auth0/client";
import { NextPage } from "next";
import Link from "next/link";
import { use, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { NotFound } from "../../components/NotFound/NotFound";
import Spinner from "../../components/Spinner";
import { launchToast } from "../../helpers/launchToast";
import { useFetch } from "../../hooks/useFetch";
import { ArticleTableProps, ColumnTableProps } from "../../interface/types";

const listColumns = [
	{
		id: 1,
		header: "Imagen",
	},
	{
		id: 2,
		header: "Titulo",
	},
	{
		id: 3,
		header: "Publicado",
	},
	{
		id: 4,
		header: "Vistas",
	},
	{
		id: 5,
		header: "Acción",
	},
];

const MyBlogsList: NextPage = () => {
	const { user, isLoading: userLoading } = useUser();
	const { data, error, loading, fetchData } = useFetch();

	useEffect(() => {
		user &&
			!userLoading &&
			user.email &&
			fetchData(`/api/articles/getByUser/${user.email}`);
	}, [user]);

	const Headers = ({ header }: ColumnTableProps) => (
		<th
			scope="col"
			className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
			{header}
		</th>
	);

	const Articles = ({
		id,
		image,
		title,
		createdAt,
		views,
	}: ArticleTableProps) => (
		<tr className="border-b bg-gray-900 border-gray-700">
			<th
				scope="row"
				className="px-6 py-4 font-medium  whitespace-nowrap text-white">
				<img src={image} alt="" className="h-6 w-6 rounded-full" />
			</th>
			<td className="px-6 py-4 truncate max-w-[250px]">{title}</td>
			<td className="px-6 py-4">{getTime(createdAt)}</td>
			<td className="px-6 py-4">{views}</td>
			<td className="px-6 py-4 flex flex-row">
				<Link
					href={`/blog/${id}`}
					className="font-medium text-blue-500 hover:underline mr-4">
					Ver
				</Link>
				<Link
					href={`/article/edit/${id}`}
					className="font-medium text-blue-500 hover:underline mx-4">
					Editar
				</Link>
				<div
					onClick={() => handleDelete(id)}
					className="font-medium t text-red-500 hover:underline ml-1 cursor-pointer">
					Eliminar
				</div>
			</td>
		</tr>
	);

	const getTime = (updateAt: Date) => {
		const newDate = new Date(updateAt);
		const localTime = newDate.toLocaleTimeString();
		const localDate = newDate.toLocaleDateString();
		return ` ${localTime} - ${localDate}`;
	};

	const handleDelete = (id: number) => {
		fetch(`/api/articles/delete/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				launchToast("success", "Blog eliminado correctamente");
				fetchData(`/api/articles/getByUser/${user.email}`);
			} else {
				launchToast("error", "No se pudo eliminar el blog");
			}
		});
	};

	if (loading || userLoading) return <Spinner />;

	if (!user && loading)
		return (
			<NotFound
				title="Iniciar Sesión"
				content="Inicie sesión para explorar la lista de blogs. Si no tenes una cuenta, te invitamos a registrarse y tener la oportunidad de escribir tus propios blogs."
				url="/"
				buttonName="LogIn"
			/>
		);

	if (error)
		return (
			<NotFound
				title="Error"
				content="Ocurrió un error al cargar la lista de blogs. Por favor, intente nuevamente más tarde."
				url="/"
				buttonName="Volver al inicio"
			/>
		);

	if (user && data?.length === 0)
		return (
			<NotFound
				title="No existen blogs"
				content={`¡Hola ${
					user.name.split(" ")[0]
				}! Parece que todavía no has publicado ningún blog. ¿Por qué no creas uno ahora y compartes tus conocimientos?`}
				url="/blog"
				buttonName="Crear mi primer blog"
				showRegister={false}
			/>
		);

	return (
		<div className="min-h-screen bg-[#0D1116] pt-32 font-ibm flex justify-center ">
			<div className="overflow-x-auto shadow-md max-w-[1000px] flex flex-col ">
				<Link
					href={"/article/create"}
					className="rounded-md px-3 py-2  text-sm hover:text-indigo-800 plain-button my-3 self-end">
					+ Crear Blog
				</Link>
				<table className="w-full text-sm text-left text-gray-500 ">
					<thead className="text-xs uppercase bg-gray-700 text-gray-400 ">
						<tr>
							{listColumns.map((column: ColumnTableProps) => (
								<Headers key={column.id} {...column} />
							))}
						</tr>
					</thead>
					<tbody>
						{data?.map((article: ArticleTableProps) => (
							<Articles key={article.id} {...article} />
						))}
					</tbody>
				</table>
			</div>
			<ToastContainer />
		</div>
	);
};

export default MyBlogsList;
