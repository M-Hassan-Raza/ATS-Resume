import '/styles/globals.css'
import { ResumesProvider } from '../contexts/ResumesContext'

export default function App({ Component, pageProps }) {
  return (
    <ResumesProvider>
      <Component {...pageProps} />
    </ResumesProvider>
  )
}
