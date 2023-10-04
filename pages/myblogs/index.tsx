import { useUser } from "@auth0/nextjs-auth0/client";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
	const [isDeleted, setIsDelete] = useState(false);

	const dialogRef = useRef(null);

	useEffect(() => {
		setIsDelete(false);
		user &&
			!userLoading &&
			!isDeleted &&
			fetchData(`/api/articles/getByUser`);
	}, [user, isDeleted]);

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
        url
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
					href={`/blog/${url}`}
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
        const localDate = newDate.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    
        return localDate;
	};

	const handleDelete = (id: number) => {
		dialogRef.current.showModal();
		dialogRef.current.id = id;
	};

	const handleConfirmModal = () => {
		let id = dialogRef.current.id;
		fetch(`/api/articles/delete/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status === 200) {
					launchToast("success", "Blog eliminado correctamente");
					setIsDelete(true);
				} else {
					launchToast("error", "No se pudo eliminar el blog");
				}
			})
			.finally(() => dialogRef.current.close());
	};

	if (!user && !userLoading)
		return (
			<NotFound
				title="Iniciar Sesión"
				content="Inicie sesión para explorar la lista de blogs. Si no tenes una cuenta, te invitamos a registrarse y tener la oportunidad de escribir tus propios blogs."
				url="/"
				buttonName="LogIn"
			/>
		);

	if (loading || userLoading) return <Spinner />;

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
					href={"/blog/publish"}
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
			<dialog
				className="w-screen h-screen shadow-2xl backdrop-blur-md bg-white/20 max-w-full max-h-full"
				ref={dialogRef}
				open={false}>
				<div className="m-auto w-full h-full flex flex-col justify-center items-center">
					<div className="bg-[#0D1116] mb-4 p-5 flex flex-col gap-5
                    border-t-4 border-[#FFC800] w-1/3">
						<div className="flex items-center gap-4 flex-row">
                            <img src="https://cdn-icons-png.flaticon.com/256/6324/6324052.png"
                            className="w-[50px]" />
                            <div className="text-white">
                                <h5 className="text-lg">Eliminar Artículo</h5>
                                <p className="text-base leading-6">
                                    Estás seguro de eliminar el blog?
                                </p>
                            </div>
                            </div>
						<div className="w-full flex items-center justify-end gap-5 border-t border-[#333] pt-5">
							<button
								className=" border-red-400 hover:text-white text-slate-400 font-bold rounded focus:outline-none focus:shadow-outline"
								onClick={() => dialogRef.current.close()}>
								Cancelar
							</button>
							<button
								onClick={handleConfirmModal}
								className="bg-[#f0d05d] hover:bg-[#FFC800] text-[#0D1116] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
								Eliminar
							</button>
						</div>
					</div>
				</div>
			</dialog>
			<ToastContainer />
		</div>
	);
};

export default MyBlogsList;
