'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid';

export function StyledProvider({ children, }: { children: React.ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') {
    return (
      <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
        {children}
      </StyleSheetManager>
    )
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance} shouldForwardProp={prop => isPropValid(prop)}>
      {children}
    </StyleSheetManager>
  )
}
