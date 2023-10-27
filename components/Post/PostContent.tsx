import { useQuill } from "react-quilljs";
import { PostUSerType } from "../../interface/postTypes";
import PostContentFooter from "./PostContentFooter";
import PostContentHeader from "./PostContentHeader";
import PostContentUserInfo from "./PostContentInfo";
import hljs from "highlight.js";
import { useEffect } from 'react'
import { formatsOptions } from "../../constants/quilljs.config";

export default function PostContent({ post }: PostUSerType) {
	const { createdBy, hashtags, image, title, user, views } = post;
	let { content } = post;
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

    useEffect(() => {
      if (quill && content) {
        if (typeof content === 'string') content = JSON.parse(content);
        quill.setContents(content)
      }
    }, [quill, content])

	return (
		<article className="w-full max-w-[45rem] min-h-screen flex flex-col gap-6">
			<PostContentUserInfo
				content={content}
				createdBy={createdBy}
				views={views}
			/>
			<div className="flex flex-col gap-6">
				<PostContentHeader title={title} coverImage={image} />
				<div className="flex flex-col gap-3">
					<h1 className=" font-bold tracking-tight font-roboto text-5xl text-white ">
						{title}
					</h1>
					<div className="break-words leading-8 whitespace-pre-line text-lg pt-3 text-gray-100">
                        <div ref={quillRef}></div>
					</div>
					<PostContentFooter hashtags={hashtags} />
				</div>
			</div>
		</article>
	);
}
