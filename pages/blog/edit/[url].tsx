import { useEffect } from 'react'
import CreateArticleForm from '../../../components/BlogPublishPage/CreateArticleForm'

import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/github-dark.css'

import { useCreateArticleForm } from '../../../hooks/useCreateArticleForm'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'

export default function Publish() {
	const router = useRouter();
	const { url } = router.query;
    const INITIAL_STATE = {
        "contentPreview": {
            "ops": [
                {
                    "insert": "\n"
                }
            ]
        },
        "coverImagePreview": null,
        "error": {},
        "hashtagsPreview": [],
        "postData": {
            "content": null,
            "coverImage": null,
            "hashtags": [],
            "title": null
        },
        "showSearchHashtagsForm": false,
        "showUploadCoverImgModal": false,
        "titleValue": ""
    }
    
    const state = useCreateArticleForm(INITIAL_STATE, true) // Esto se haria dentro del componente, por ahora se hace aqui para compartir el estado con el preview
    const { content, title, coverImage, hashtags } = state.postData
    useEffect(() => {

        console.log(state)
    }, []);



    return (
        <main className='flex flex-col gap-4 font-manrope pt-4 text-[#FFF]' >
            <div className="mt-20 mx-auto w-3/4">
            <h1 className='text-4xl font-semibold mb-10'>Crear nuevo articulo</h1>
            <CreateArticleForm {...state} />
            {/* <Preview content={content} title={title} coverImage={coverImage} hashtags={hashtags} /> */}
            </div>
        </main>
    )
}



// export default withPageAuthRequired(Publish, {
//     returnTo: '/blog/publish'
//   });

