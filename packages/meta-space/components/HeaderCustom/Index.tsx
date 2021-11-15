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

  return <StyledHeader>
    <div className="logo" />
    <StyledMenu>
      <li>
        <Dropdown overlay={menu} trigger={['hover']}>
          <StyledItemWrapper>
            <GlobalOutlined />
            {t(language)}
          </StyledItemWrapper>
        </Dropdown>
      </li>
    </StyledMenu>
  </StyledHeader>
}

const StyledHeader = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`
export const StyledMenu = styled.ul`
  list-style: none;
`
export const StyledItemWrapper = styled.li`
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  .anticon {
    font-size: 16px;
    margin-right: 4px;
  }
`
export default HeaderCustom