import React, { useMemo, useState, useCallback } from 'react'
import type { NextPage } from 'next'
import { Button, Input, AutoComplete, Select } from 'antd'
import { SelectProps } from 'antd/es/select'
import styled from 'styled-components'
import { AudioOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { HexagonIcon, DiceIcon } from '../components/Icon/Index'
import HexagonImage from '../assets/images/hexagon.png'
import MetaImage from '../assets/images/meta.png'
import Image from 'next/image'
import { fetchInviteCodeAPI } from '../helpers/index'
import { StoreGet, StoreSet } from '../utils/store'
import { isEmpty, cloneDeep } from 'lodash'
import { useMount } from 'ahooks'


interface SearchResultListProps {
  subdomain: string
}

const { Search } = Input
const { Option } = Select

const KeyMetaSpaceHistory = 'MetaSpaceHistory'

const Home: NextPage = () => {
  const [searchResultList, setTearchResultList] = useState<SearchResultListProps[]>([])
  const [searchHistoryList, setSearchHistoryList] = useState<SearchResultListProps[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

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

  const fetchSearchResult = useCallback(
    async (value: string) => {
      // const data = await fetchInviteCodeAPI()
      const data = [
        {
          'subdomain': `xxxxx ${value}`,
        },
        {
          'subdomain': `xxxxrrr ${value}`,
        },
        {
          'subdomain': `xiaotian ${value}`,
        }
      ]
      if (data) {
        setTearchResultList(data)
      }
    },
    [],
  )

  const onSelect = (value: string) => {
    console.log('onSelect', value)
  }

  const handleChange = (value: string): void => {
    console.log(`selected ${value}`)
  }

  const handleSearchChange = (value: any): void => {
    console.log(value)
    setSearchValue(value.target.value)
  }

  /**
 * 获取历史浏览
 */
  const fetchHistory = useCallback(() => {
    const historyStringify = StoreGet(KeyMetaSpaceHistory)
    let historyList: SearchResultListProps[] = historyStringify ? JSON.parse(historyStringify) : []
    setSearchHistoryList(historyList)
  }, [])

  const handleHistory = useCallback(
    (subdomain: string) => {
      const historyStringify = StoreGet(KeyMetaSpaceHistory)
      const historyData = {
        subdomain: subdomain
      }

      // 没有历史记录
      if (isEmpty(historyStringify)) {
        StoreSet(KeyMetaSpaceHistory, JSON.stringify([historyData]))
      } else {
        let historyList: SearchResultListProps[] = historyStringify ? JSON.parse(historyStringify) : []
        const historyListIdx = historyList.findIndex(i => i.subdomain === subdomain)

        if (~historyListIdx) {
          const temp = cloneDeep(historyList[historyListIdx])
          historyList.splice(historyListIdx, 1)
          historyList.push(temp)
        } else {
          if (historyList.length >= 5) {
            historyList.shift()
          }
          historyList.push(historyData)
        }

        StoreSet(KeyMetaSpaceHistory, JSON.stringify(historyList))
      }

      fetchHistory()
    },
    [fetchHistory],
  )

  const onSearch = (value: string) => {
    console.log(value)
    handleHistory(value)
    fetchSearchResult(value)
  }


  // init
  useMount(
    () => {
      fetchHistory()
    }
  )


  return (
    <StyledWrapper>
      <StyledHead>
        <StyledHeadIcon></StyledHeadIcon>
        <StyledHeadTitleBox>
          <StyledHeadSub>Launcher</StyledHeadSub>
          <StyledHeadTitle>Meta Space</StyledHeadTitle>
        </StyledHeadTitleBox>
      </StyledHead>


      <StyledSearchBox>
        <StyledSearch>
          <StyledSearchInput placeholder="Sub Domain" style={{ width: 240 }} onSearch={onSearch} onChange={handleSearchChange} />
          <StyledSearchUrl>.metaspaces.me</StyledSearchUrl>
        </StyledSearch>
        <StyledSearchButtonBox>
          <StyledSearchButton icon={<ArrowRightOutlined />}>Vist</StyledSearchButton>
          <StyledSearchButton icon={<StyledHeadDiceIcon />}>Random</StyledSearchButton>
        </StyledSearchButtonBox>
      </StyledSearchBox>
      <StyledSearchResult>

        {
          searchValue
            ?
            <StyledSearchSelect defaultValue="result" style={{ width: 120 }} onChange={handleChange}
              dropdownClassName="1"
              className="custom-search-select"
            >
              <Option value="result">Result</Option>
              <Option value="history">History</Option>
            </StyledSearchSelect>
            : <StyledSearchTitle>History</StyledSearchTitle>
        }
        {
          1 ? <StyledSearchList>
            {
              (searchValue ? searchResultList : searchHistoryList).map((i, key) => (
                <li key={key}>
                  <StyledSearchListLink href="https://meta-cms.vercel.mttk.net">
                    <StyledListIcon />
                    <StyledSearchListText>Sub Domain - {i.subdomain}</StyledSearchListText>
                  </StyledSearchListLink>
                </li>
              ))
            }
          </StyledSearchList> : null
        }
      </StyledSearchResult>

      <StyledtutorialBox>
        <StyledtutorialText>【Guide】Build your owner Meta space in 5 minutes</StyledtutorialText>
      </StyledtutorialBox>

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
  justify-content: center;
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
  /* justify-content: center; */
  @media screen and (max-width: 768px) {
    max-width: 90%;
    margin-top: 60px;
  }
`

const StyledSearchResult = styled.section`
  width: 780px;
  margin: 20px auto 0;
  @media screen and (max-width: 768px) {
    max-width: 90%;
  }
`
const StyledSearchSelect = styled(Select)`
  .ant-select-selector {
    border: none !important;
  }
  &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    box-shadow: none;
  }
`
const StyledSearchTitle = styled.span`
  font-size: 14px;
`
const StyledSearchList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  width: 240px;
`
const StyledSearchListLi = styled.li``
const StyledSearchListLink = styled.a`
  display: flex;
  align-items: center;
  color: #333;
  padding: 6px 4px;
  &:hover {
    color: #333;
    background-color: #f5f5f5;
  }
`
const StyledSearchListText = styled.span`
  font-size: 14px;
  margin-left: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const StyledListIcon = styled(HexagonIcon)`
  width: 20px;
  height: 20px;
  /* @media screen and (max-width: 768px) {
    width: 70px;
    height: 70px;
  } */
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

const StyledSearchInput = styled(Search)`
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
  text-align: center;
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
  padding: 0;
  margin: 10px 10px 0 10px;
  display: flex;
  align-items: center;
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
