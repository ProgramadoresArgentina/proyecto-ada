import { useMemo, useRef, useState } from "react"
import { createAutocomplete } from "@algolia/autocomplete-core"

import { useCreateArticleForm } from "./useCreateArticleForm"

export const useAutocompleteForm = () => {
  const { handleGetHashtags } = useCreateArticleForm()
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  })

  const autocomplete = useMemo(() => createAutocomplete({
    placeholder: 'Buscar hashtags',
    autoFocus: true,
    onStateChange: ({ state }) => setAutocompleteState(state),
    getSources: () => [{
      sourceId: 'tags',
      getItems: ({ query }) => {
        if (!!query) {
          return handleGetHashtags(query)
        }
      }
    }]
  }), [handleGetHashtags])

  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const formProps: any = autocomplete.getFormProps({
    inputElement: inputRef.current
  })
  const inputProps: any = autocomplete.getInputProps({
    inputElement: inputRef.current
  })
  const panelProps: any = autocomplete.getPanelProps()
  const listProps: any = autocomplete.getListProps()

  return { autocompleteState, autocomplete, inputRef, panelRef, formProps, inputProps, panelProps, listProps }
}