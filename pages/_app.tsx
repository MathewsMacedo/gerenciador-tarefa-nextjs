import type { AppProps } from 'next/app';
import '../styles/app.scss';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
          <Component {...pageProps} />
          <ToastContainer/>
        </>
}

export default MyApp
