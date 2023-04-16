import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import { formatsOptions } from '../../constants/quilljs.config'
import hljs from 'highlight.js'

import CreateArticleForm from '../../components/BlogPublishPage/CreateArticleForm'
import HashtagsList from '../../components/BlogPublishPage/HashtagsList'

import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/github-dark.css'

import { useCreateArticleForm } from '../../hooks/useCreateArticleForm'

// Componente para previsualizar el articulo (Solo para Tests)
function Preview({ content, title, coverImage, hashtags }) {
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
      quill.setContents(content)
    }
  }, [quill, content])

  return (
    <div className='flex flex-col gap-2 w-[45rem] mt-8 m-auto'>
      <h2 className='text-3xl font-semibold text-center'>Preview (para test)</h2>
      {content && <section>
        {coverImage && <div
          className='aspect-[16/6] overflow-hidden rounded-xl'
        >
          <picture title={title} className='w-full transition-all aspect-[16/6] overflow-hidden'>
            <img src={coverImage} alt='Programadores Argentina' width={2000} height={2000} className='w-full h-full object-cover' />
          </picture>
        </div>
        }
        <div className='flex flex-col gap-3'>
          <h1 className='font-semibold text-5xl tracking-tighter break-all pt-4 px-4'>{title}</h1>
          <div ref={quillRef}></div>
        </div>
      </section>}
      {hashtags.length > 0 && <HashtagsList hashtags={hashtags} />}
    </div>
  )
}

export default function Publish() {
  const state = useCreateArticleForm() // Esto se haria dentro del componente, por ahora se hace aqui para compartir el estado con el preview
  const { content, title, coverImage, hashtags } = state.postData

  return (
    <main className='flex flex-col gap-4 m-auto max-w-screen-lg font-manrope pt-4 text-[#151515]' >
      <h1 className='text-4xl font-semibold'>Crear nuevo articulo</h1>
      <CreateArticleForm {...state} />
      <Preview content={content} title={title} coverImage={coverImage} hashtags={hashtags} />
    </main>
  )
}
