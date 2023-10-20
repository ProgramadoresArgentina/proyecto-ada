import { useEffect, useState } from 'react'
import CreateArticleForm from '../../../components/BlogPublishPage/CreateArticleForm'


import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/github-dark.css'

import { useCreateArticleForm } from '../../../hooks/useCreateArticleForm'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { launchToast } from '../../../helpers/launchToast'


export default function EditPage(routeInfo) {
    const { url } = routeInfo;
    const [isLoading, setLoading] = useState(false);
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
        "titleValue": "test 222"
    }
    
    const state = useCreateArticleForm(INITIAL_STATE);

    useEffect(() => {
        fetch(`/api/articles/getById/${url}`)
        .then(response => response.json())
        .then(data => {
            const setData = {
                "id": data.id,
                "contentPreview": JSON.parse(data.content),
                "coverImagePreview": data.image,
                "error": {},
                "hashtagsPreview": data.hashtags?.map(item => item.name),
                "postData": {
                    "content": null,
                    "coverImage": null,
                    "hashtags": [],
                    "title": null
                },
                "showSearchHashtagsForm": false,
                "showUploadCoverImgModal": false,
                "titleValue": data.title
            }
            state.setState(setData);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        })
        .catch(error => {
            console.log(error);
            launchToast("error","Error al cargar, intentelo nuevamente.");
            setLoading(false);
        });
    }, []);



    return (
        <main className='flex flex-col gap-4 font-manrope pt-4 text-[#FFF]' >
            <div className="mt-20 mx-auto w-3/4">
            <h1 className='text-4xl font-semibold mb-10'>Editar articulo</h1>
            {
                !isLoading && <CreateArticleForm {...state} />
            }
            {/* <Preview content={content} title={title} coverImage={coverImage} hashtags={hashtags} /> */}
            </div>
        </main>
    )
}



// export default withPageAuthRequired(EditPage, {
//     returnTo: '/blog/publish'
//   });