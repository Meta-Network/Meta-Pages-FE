import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const Footer: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <StyledFooter>
      <p>{t('footer-copyright')}</p>
    </StyledFooter>
  )
}

const StyledFooter = styled.section`
  text-align: center;
  padding: 20px 0;
  /* border-top: 1px solid #00f3fd; */
  p {
    font-size: 14px;
    padding: 0;
    margin: 0;
    /* color: #717171; */
    color: #fff;
  }
  @media screen and (max-width: 768px) {
    padding: 10px 0;
    p {
      font-size: 12px;
    }
  }
`

export default Footer