import React, { useMemo } from 'react'
import type { NextPage } from 'next'
import { Button, Input } from 'antd'
import styled from 'styled-components'
import { AudioOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { HexagonIcon, DiceIcon } from '../components/Icon/Index'
import HexagonImage from '../assets/images/hexagon.png'
import MetaImage from '../assets/images/meta.png'
import Image from 'next/image'

const { Search } = Input


const Home: NextPage = () => {

  const LinkList = useMemo(() => {
    return [
      {
        logo: HexagonImage,
        text: 'Meta Space Wiki',
        url: 'https://github.com/Meta-Network',
      },
      {
        logo: MetaImage,
        text: 'Meta Network',
        url: 'https://meta-network.mttk.net'
      },
      {
        logo: MetaImage,
        text: 'Meta.io',
        url: 'https://meta.io'
      }
    ]
  }, [])

  const onSearch = (value: string) => console.log(value)

  return (
    <StyledWrapper>
      <StyledHead>
        <StyledHeadIcon></StyledHeadIcon>
        <StyledHeadTitleBox>
          <StyledHeadSub>launcher</StyledHeadSub>
          <StyledHeadTitle>Meta Space</StyledHeadTitle>
        </StyledHeadTitleBox>
      </StyledHead>


      <StyledSearchBox>
        <StyledSearch>
          <StyledSearchInputt placeholder="Sub Domain" onSearch={onSearch} style={{ width: 180 }} />
          <StyledSearchUrl>.metaspaces.me</StyledSearchUrl>
        </StyledSearch>
        <StyledSearchButtonBox>
          <StyledSearchButton icon={<ArrowRightOutlined />}>Vist</StyledSearchButton>
          <StyledSearchButton icon={<StyledHeadDiceIcon />}>Random</StyledSearchButton>
        </StyledSearchButtonBox>
      </StyledSearchBox>

      <StyledtutorialBox>
        <StyledtutorialText>【Guide】Build your owner Meta space in 5 minutes</StyledtutorialText>
      </StyledtutorialBox>

      <StyledLinkBox>
        {
          LinkList.map((i, idx) => (
            <StyledLink href={i.url} rel="noopener noreferrer" target="_blank" key={idx}>
              <StyledLinkLogo>
                <Image width={40} height={40} src={i.logo} alt={'logo'} layout="fill" objectFit="contain"  />
              </StyledLinkLogo>
              <StyledLinkText>{i.text}</StyledLinkText>
            </StyledLink>
          ))
        }
      </StyledLinkBox>

      <StyledFooter>
        <p>© 2021 Meta Network All Rights Served</p>
      </StyledFooter>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const StyledHead = styled.section`
  width: 780px;
  margin: 0 auto;
  padding-top: 120px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    max-width: 90%;
    padding-top: 60px;
  }
`
const StyledHeadIcon = styled(HexagonIcon)`
  width: 100px;
  height: 100px;
  @media screen and (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`
const StyledHeadDiceIcon = styled(DiceIcon)`
  width: 16px;
  height: 16px;
`
const StyledHeadTitleBox = styled.section`
  position: relative;
  margin-left: 10px;
`
const StyledHeadTitle = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 60px;
  line-height: 1.1;
  font-weight: bold;
  letter-spacing: 2px;
  word-spacing: 6px;
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`
const StyledHeadSub = styled.span`
  background: #16adf3;
  display: inline-block;
  color: #fff;
  padding: 2px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
`

const StyledSearchBox = styled.section`
  width: 780px;
  margin: 100px auto 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    max-width: 90%;
    margin-top: 60px;
  }
`
const StyledSearch = styled.section`
  display: flex;
  align-items: flex-end;
  margin-right: 20px;
  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 20px;
  }
`
const StyledSearchInputt = styled(Search)`
  border-bottom: 1px solid #333;
  .ant-btn,
  .ant-input {
    border: none;
  }
  .ant-input:focus, .ant-input-focused {
    box-shadow: none;
  }
  .ant-btn::after {
    display: none;
  }
`
const StyledSearchUrl = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.2;
  color: #333;
  letter-spacing: 1px;
`
const StyledSearchButtonBox = styled.section`
  display: flex;
  align-items: center;
`
const StyledSearchButton = styled(Button)`
  margin-left: 10px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    &:nth-of-type(1) {
      margin-left: 0;
    }
  }
`

const StyledtutorialBox = styled.section`
  width: 780px;
  margin: auto auto 0;
  @media screen and (max-width: 768px) {
    max-width: 90%;
  }
`
const StyledtutorialText = styled.a`
  color: #595959;
  text-decoration: underline;
  font-size: 14px;
  &:hover {
    color: #333;
    text-decoration: underline;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`

const StyledLinkBox = styled.section`
  width: 780px;
  margin: 40px auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    max-width: 90%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`
const StyledLinkLogo = styled.section`
  position: relative;
  width: 30px;
  height: 30px;
  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`
const StyledLink = styled.a`
  padding: 0;
  margin-top: 10px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  &:nth-last-of-type(1) {
    margin-right: 0;
  }
`

const StyledLinkText = styled.span`
  font-size: 14px;
  color: #595959;
  font-weight: 400;
  margin-left: 4px;
  &:hover {
    color: #333;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`

const StyledFooter = styled.section`
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid #f1f1f1;
  p {
    font-size: 14px;
    padding: 0;
    margin: 0;
    color: #717171;
  }
  @media screen and (max-width: 768px) {
    padding: 10px 0;
    p {
      font-size: 12px;
    }
  }
`

export default Home
