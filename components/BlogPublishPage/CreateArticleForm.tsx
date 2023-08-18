import ErrorModal from './ErrorModal'
import UpdateCoverImgModal from './UpdateCoverImgModal'
import CreateArticleFormToolbar from './CreateArticleFormToolbar'
import CreateArticleFormActions from './CreateArticleFormActions'

// import { useCreateArticleForm } from '../../hooks/useCreateArticleForm'

export default function CreateArticleForm(state) {
  return (
    <form className='flex flex-col gap-8 w-full mb-8' onSubmit={state.handleSubmit} >
      <div className='ql-editor-container flex flex-col text-base min-h-[65vh] pb-2 rounded shadow-[0_15px_30px_#0001] bg-[#f8fafc]' >
        <CreateArticleFormToolbar />
        <CreateArticleFormActions {...state} />
        <div ref={state.quillRef} onChange={e => console.log(e)}></div>
      </div>
      <div className='flex items-center justify-end mt-8'>
        <button className='button-primary text-xl'>Publicar</button>
      </div>
      {state.showUploadCoverImgModal && <UpdateCoverImgModal handleShowUploadCoverImgModal={state.handleShowUploadCoverImgModal} handleCoverImgChange={state.handleCoverImgChange} />}
      {state.error.type && <ErrorModal {...state} />}
    </form>
  )
}