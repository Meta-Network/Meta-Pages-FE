import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import HexagonImage from '../../assets/images/hexagon.png'
import MetaImage from '../../assets/images/meta.png'

interface Props {
}

// 友情链接
const LinkList = [
  {
    logo: HexagonImage,
    text: 'Meta Space Wiki',
    url: 'https://github.com/Meta-Network',
  },
  {
    logo: MetaImage,
    text: 'Meta Network',
    url: process.env.NEXT_PUBLIC_META_NETWORK_URL
  },
  {
    logo: MetaImage,
    text: 'Meta.io',
    url: 'https://meta.io'
  }
]

const MediaLink: React.FC<Props> = () => {
  return (
    <StyledLinkBox>
    {
      LinkList.map((i, idx) => (
        <StyledLink href={i.url} rel="noopener noreferrer" target="_blank" key={idx}>
          <StyledLinkLogo>
            <Image src={i.logo} alt={'logo'} layout="fill" objectFit="contain" />
          </StyledLinkLogo>
          <StyledLinkText>{i.text}</StyledLinkText>
        </StyledLink>
      ))
    }
  </StyledLinkBox>
  )
}

const StyledLinkBox = styled.section`
  width: 780px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (max-width: 768px) {
    max-width: 90%;
  }
`
const StyledLinkLogo = styled.section`
  position: relative;
  width: 20px;
  height: 20px;
  @media screen and (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`
const StyledLink = styled.a`
  padding: 8px 10px;
  margin: 10px 10px 0 10px;
  display: flex;
  align-items: center;
  background: #302458;
  border: 1px solid #00f3fd;
  border-radius: 4px;
`

const StyledLinkText = styled.span`
  font-size: 14px;
  /* color: #595959; */
  color: #fff;
  font-weight: 400;
  margin-left: 4px;
  &:hover {
    color: #fff;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`

export default MediaLink