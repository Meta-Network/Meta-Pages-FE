import '../styles/globals.css'
import type { AppProps } from 'next/app'
import HeadInfo from '../components/HeadInfo/Index'

import 'antd/dist/antd.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <HeadInfo />
    <Component {...pageProps} />
  </>
}
export default MyApp
