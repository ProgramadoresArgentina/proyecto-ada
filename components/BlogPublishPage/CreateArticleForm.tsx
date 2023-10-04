import ErrorModal from './ErrorModal'
import UpdateCoverImgModal from './UpdateCoverImgModal'
import CreateArticleFormToolbar from './CreateArticleFormToolbar'
import CreateArticleFormActions from './CreateArticleFormActions'
import Spinner from '../Spinner'
import { useRouter } from 'next/router'
import { useState } from "react"
import { launchToast } from '../../helpers/launchToast'

// import { useCreateArticleForm } from '../../hooks/useCreateArticleForm'

export default function CreateArticleForm(state) {
    const router = useRouter()
    const [loading, setLoading] = useState(false); 


    const publishBlog = () => {
        setLoading(true);
        const body = {
            title: state.titleValue,
            content: JSON.stringify(state.contentPreview),
            image: state.coverImagePreview,
            hashtags: state.hashtagsPreview
        }
        fetch('/api/articles/post', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                window.localStorage.removeItem('state');
                setLoading(false);
                launchToast("success", "Blog creado correctamente");
                router.push(`/blog/${data.article.url}`)
                
                // setData(data);
            })
            .catch(error => {
                launchToast("error","Error al cargar, intentelo nuevamente.");
                console.log(error)
                setLoading(false);
            });
    }

    const buttonDisabled = () => {
        if (loading) return true;
        if (state) {
            if (!state.titleValue || state.titleValue.trim() === null) return true; // title empty
            if (!state.contentPreview || (state.postData.quillRef && state.postData.quillRef.current &&
                (state.postData.quillRef.current.outerText == ''
                || state.postData.quillRef.current.outerText == "\n"))) return true; // content empty
        };
        return false;
    }


    return (
        <form className='flex flex-col gap-8 w-full mb-8' onSubmit={state.handleSubmit} >
            <div className='ql-editor-container flex flex-col text-base min-h-[65vh] pb-2 rounded shadow-[0_15px_30px_#0001] bg-[#10151C]' >
                <CreateArticleFormToolbar />
                <CreateArticleFormActions {...state} />
                <div ref={state.quillRef} onChange={e => console.log(e)}></div>
            </div>
            <div className="flex items-center justify-end">
                <button className='rounded-md text-lg px-5 py-2 hover:text-indigo-800 plain-button flex items-center gap-4'
                    onClick={() => publishBlog()} disabled={buttonDisabled()}>
                    Publicar
                    {
                        loading &&
                        <div className="w-5 aspect-square m-auto rounded-full border-4 border-solid border-l-indigo-500 border-t-indigo-500 animate-spin"></div>
                    }
                </button>
            </div>
            {state.showUploadCoverImgModal && <UpdateCoverImgModal handleShowUploadCoverImgModal={state.handleShowUploadCoverImgModal} handleCoverImgChange={state.handleCoverImgChange} />}
            {state.error.type && <ErrorModal {...state} />}
        </form>
    )
}