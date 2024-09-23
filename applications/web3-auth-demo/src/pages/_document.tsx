import { Html, Head, Main, NextScript, DocumentProps, DocumentContext } from 'next/document'
import { DocumentHeadTags, DocumentHeadTagsProps, documentGetInitialProps } from '@mui/material-nextjs/v14-pagesRouter'

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head />
      <DocumentHeadTags {...props} />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  return await documentGetInitialProps(ctx)
}
