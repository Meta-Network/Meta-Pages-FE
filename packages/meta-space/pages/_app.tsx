import '../styles/globals.css'
import '../styles/custom.css'
import type { AppProps } from 'next/app'
import HeadInfo from '../components/HeadInfo/Index'
import { appWithTranslation } from 'next-i18next'

import 'antd/dist/antd.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <HeadInfo />
    <Component {...pageProps} />
  </>
}
export default appWithTranslation(MyApp)
