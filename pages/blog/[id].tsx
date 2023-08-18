import { NextPage } from "next";
import PostAside from "../../components/Post/PostAside";
import PostContent from "../../components/Post/PostContent";

import { usePosts } from "../../hooks/usePosts";
import { UsePostsStateType } from "../../interface/postTypes";

import { NotFound } from "../../components/NotFound/NotFound";
import Spinner from "../../components/Spinner";

const Post: NextPage = () => {
	const { post, isLoading, onError }: UsePostsStateType = usePosts();

	if (isLoading)
		return (
			<div className="full-screen-center-container bg-[#0D1116]">
				<Spinner />
			</div>
		);

	if (onError)
		return (
			<NotFound
				title={"Blog no encontrado"}
				content={
					"No existe registro del blog en nuestra base de datos. Si formas parte de Programadores Argentina, te invitamos a crear un blog que refleje tus mayores intereses."
				}
				url={"/publish"}
				buttonName={"Crear Blog"}
			/>
		);

	return (
		<section className="relative z-20  text-[#151515] bg-[#0D1116] pt-20 pb-5">
			<div className="w-full min-h-[80vh] flex flex-col-reverse md:flex-row items-start justify-evenly px-4 gap-8 max-w-[80rem] m-auto">
				<PostContent post={post} />
				<PostAside post={post} />
			</div>
		</section>
	);
};

export default Post;
