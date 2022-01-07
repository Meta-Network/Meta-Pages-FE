import type { FC } from 'react'
import React, { useMemo } from 'react'
import { Menu, Dropdown } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import { GlobalOutlined } from '@ant-design/icons'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { LanguageProps } from '../../typings/i18n.d'
import { setCookie } from '../../utils/cookie'

const languageList = ['en-US', 'zh-CN']
const COOKIE_NEXT_LOCALE = 'NEXT_LOCALE'
const COOKIE_NEXT_LOCALE_EXPIRES = 365

const HeaderCustom: FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const language = useMemo((): LanguageProps => {
    return router.locale as LanguageProps
  }, [router.locale])
  const menu = (
    <Menu>
      {
        languageList.map((i, idx) => (
          <Menu.Item key={idx} onClick={() => setCookie(COOKIE_NEXT_LOCALE, i, COOKIE_NEXT_LOCALE_EXPIRES)}>
            <Link
              href='/'
              passHref
              locale={i}
            >
              {t(i)}
            </Link>
          </Menu.Item>
        ))
      }
    </Menu>
  )

  return <section className='flex justify-between p-5'>
    <div className="logo" />
    <section className='flex items-center'>
      <Dropdown overlay={menu} trigger={['hover']}>
        <span className='flex items-center text-sm text-white cursor-pointer'>
          <GlobalOutlined className='flex items-center text-base mr-1' />
          {t(language)}
        </span>
      </Dropdown>
      <a href={process.env.NEXT_PUBLIC_META_CMS_URL} target="_blank" rel="noopener noreferrer">
        <button className='ml-4 text-sm bg-[#cfff38] hover:bg-[#9cbe29] text-black px-5 py-2 rounded-full'>Launch APP</button>
      </a>
    </section>
  </section>
}


export default HeaderCustom