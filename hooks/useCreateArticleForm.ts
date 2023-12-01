import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, } from "react"
import { useQuill } from "react-quilljs"
import hljs from "highlight.js"

import { useAutosizeTextArea } from "./useAutosizeTextArea"

import { formatsOptions } from "../constants/quilljs.config"
import { AUTOCOMPLETE_HASHTAGS } from '../constants/autocompleteHashtags'
import { CREATE_ARTICLE_ERROR_TYPES } from "../constants/constants"

import { useLocalStorage } from "./useLocalStorage"
import BlotFormatter from "quill-blot-formatter"

const INITIAL_STATE = {
    contentPreview: null,
    coverImagePreview: null,
    error: {},
    hashtagsPreview: [],
    postData: {
        content: null,
        coverImage: null,
        hashtags: [],
        title: null,
    },
    showSearchHashtagsForm: false,
    showUploadCoverImgModal: false,
    titleValue: '',
}

export const useCreateArticleForm = (customValue?) => {
    const textareaRef = useRef()
    const [state, setState] = useLocalStorage(customValue || INITIAL_STATE)

    const { quill, quillRef, Quill } = useQuill({
        modules: {
            // blotFormatter: {},
            toolbar: {
                container: '#toolbar'
            },
            syntax: {
                highlight: (text: string) => hljs.highlightAuto(text).value,
            },
        },
        placeholder: 'Escribe el contenido de tu articulo...',
        formats: formatsOptions,
    })
    // /* if (Quill && !quill) {
    //     Quill.register('modules/blotFormatter', BlotFormatter);
    // } */

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                const contentPreview = quill.getContents()
                setState(prev => ({ ...prev, contentPreview }))
            })
        }
    }, [quill, setState])

    useEffect(() => {
        if (state.contentPreview && quill) {
            quill.setContents(state.contentPreview)
        }
    }, [quill])

    useAutosizeTextArea(textareaRef ? textareaRef.current : null, state.titleValue)

    const handleTitleValueChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setState(prev => ({ ...prev, titleValue: e.target.value }))
    }, [setState])

    const handleCoverImgChange = useCallback((img: Blob) => {
        if (!img) {
            setState(prev => ({ ...prev, coverImagePreview: img, showUploadCoverImgModal: false }))
            return
        }

        const fr = new FileReader()
        fr.readAsDataURL(img)
        fr.onloadend = () => {
            const coverImagePreview = fr.result
            setState(prev => ({ ...prev, coverImagePreview, showUploadCoverImgModal: false }))
        }

    }, [setState])

    const handleShowUploadCoverImgModal = useCallback(() => {
        setState(prev => ({ ...prev, showUploadCoverImgModal: !prev.showUploadCoverImgModal }))
    }, [setState])

    const handleShowSearchHashtagsForm = useCallback(() => {
        setState(prev => ({ ...prev, showSearchHashtagsForm: !prev.showSearchHashtagsForm }))
    }, [setState])

    const handleGetHashtags = useCallback((query: String) => {
        const results = AUTOCOMPLETE_HASHTAGS.filter((hashtag) => {
            const { title } = hashtag
            return title.toLowerCase().includes(query.toLowerCase())
        })

        if (!results.length) return [{ title: query }]
        return results
    }, [])

    const handleAddHashtag = useCallback((hashtag: string) => {
        setState(prev => ({ ...prev, hashtagsPreview: [...prev.hashtagsPreview, hashtag] }))
    }, [setState])

    const handleRemoveHashtag = useCallback((hashtag: string) => {
        setState(prev => ({ ...prev, hashtagsPreview: prev.hashtagsPreview.filter(stateHashtag => stateHashtag != hashtag) }))
    }, [setState])

    const handleClearError = useCallback(() => {
        setState(prev => ({ ...prev, error: '' }))
    }, [setState])

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault()
        if (!state.titleValue) {
            const error = {
                type: CREATE_ARTICLE_ERROR_TYPES.TITLE_REQUIRED,
            }

            setState(prev => ({ ...prev, error: error }))
            return
        }

        const postData = {
            content: quill.getContents(),
            coverImage: state.coverImagePreview,
            hashtags: state.hashtagsPreview,
            title: state.titleValue,
        }

        setState(prev => ({ ...prev, postData }))
    }, [quill, state.coverImagePreview, state.titleValue, state.hashtagsPreview, setState])


    function setContent(content: string) {
        quill.setContents(state.contentPreview)
    }


    return { ...state, quillRef, textareaRef, handleCoverImgChange, handleGetHashtags, handleSubmit, handleTitleValueChange, handleAddHashtag, handleRemoveHashtag, handleShowUploadCoverImgModal, handleClearError, handleShowSearchHashtagsForm, setState }
}