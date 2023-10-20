import { useEffect, useState } from 'react'
import CreateArticleForm from '../../../components/BlogPublishPage/CreateArticleForm'


import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/github-dark.css'

import { useCreateArticleForm } from '../../../hooks/useCreateArticleForm'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'
import { launchToast } from '../../../helpers/launchToast'

import dynamic from 'next/dynamic'
 
const NoSSR = dynamic(() => import('./editForm'), { ssr: false })
export default function Page() {
	const router = useRouter();
    const { url } = router.query;
    return (
      <div>
        <NoSSR url={url}  />
      </div>
    )
}



