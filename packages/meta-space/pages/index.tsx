import React, { useMemo, useState, useCallback } from 'react'
import type { NextPage } from 'next'
import { Button, Input, AutoComplete, Select } from 'antd'
import { SelectProps } from 'antd/es/select'
import styled from 'styled-components'
import { AudioOutlined, ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import { HexagonIcon, DiceIcon } from '../components/Icon/Index'
import HexagonImage from '../assets/images/hexagon.png'
import MetaImage from '../assets/images/meta.png'
import Image from 'next/image'
import { fetchInviteCodeAPI } from '../helpers/index'
import { StoreGet, StoreSet } from '../utils/store'
import { isEmpty, cloneDeep, trim } from 'lodash'
import { useMount, useDebounceFn } from 'ahooks'

import Footer from '../components/Footer/Index'

interface SearchResultListProps {
  subdomain: string
}

const { Search } = Input
const { Option } = Select

const KeyMetaSpaceHistory = 'MetaSpaceHistory'

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
    url: 'https://meta-network.mttk.net'
  },
  {
    logo: MetaImage,
    text: 'Meta.io',
    url: 'https://meta.io'
  }
]

const Home: NextPage = () => {
  // 搜索结果列表
  const [searchResultList, setTearchResultList] = useState<SearchResultListProps[]>([])
  // 搜索历史列表
  const [searchHistoryList, setSearchHistoryList] = useState<SearchResultListProps[]>([])
  // 搜索内容
  const [searchValue, setSearchValue] = useState<string>('')
  // 当前选择值
  const [selectValue, setSelectValue] = useState<'result' | 'history'>('result')

  /**
   * 获取搜索结果
   */
  const fetchSearchResult = useCallback(
    async (value: string) => {
      if (!value) {
        return
      }

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

  // 搜索结果活着历史记录列表
  const resultOrHistoryList = useMemo(() => {
    let list = {
      result: searchResultList,
      history: searchHistoryList,
    }

    return list[selectValue] || list['history']
  }, [selectValue, searchHistoryList, searchResultList])


  /**
   * 处理选择切换改变
   */
  const handleSelectChange = (value: any): void => {
    setSelectValue(value)
  }

  /**
   * 处理搜索改变
   */
  const { run: handleSearchChange } = useDebounceFn(
    (e: any) => {
      console.log(e)
      const value = trim(e.target.value)
      setSearchValue(value)
      if (value) {
        handleHistory(value)
        fetchSearchResult(value)
      }
    },
    {
      wait: 300,
    },
  )

  /**
 * 获取历史浏览
 */
  const fetchHistory = useCallback(() => {
    const historyStringify = StoreGet(KeyMetaSpaceHistory)
    let historyList: SearchResultListProps[] = historyStringify ? JSON.parse(historyStringify) : []
    setSearchHistoryList(historyList)
  }, [])

  /**
   * 处理历史记录
   */
  const handleHistory = useCallback(
    (subdomain: string) => {

      if (!subdomain) {
        return
      }

      const historyStringify = StoreGet(KeyMetaSpaceHistory)
      const historyData = {
        subdomain: trim(subdomain)
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

  /**
   * 处理搜索回车
   */
  const handleSearch = (value: string) => {
    console.log(value)
    handleHistory(value)
    fetchSearchResult(value)
  }

  /**
   * 删除历史记录
   */
  const deleteHistory = useCallback(
    (item: SearchResultListProps) => {
      const historyStringify = StoreGet(KeyMetaSpaceHistory)
      let historyList: SearchResultListProps[] = historyStringify ? JSON.parse(historyStringify) : []
      const historyListIdx = historyList.findIndex(i => i.subdomain === item.subdomain)

      if (~historyListIdx) {
        historyList.splice(historyListIdx, 1)
        StoreSet(KeyMetaSpaceHistory, JSON.stringify(historyList))
      }
      fetchHistory()
    },
    [fetchHistory],
  )

  /**
   * 处理删除历史记录
   */
  const handleDeleteHistory = (e: any, item: SearchResultListProps) => {
    e.preventDefault()
    deleteHistory(item)
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
        <StyledSearchBoxInput>
          <StyledSearch>
            <StyledSearchInput placeholder="Sub Domain" style={{ width: 240 }} onSearch={handleSearch} onChange={handleSearchChange} />
            <StyledSearchUrl>.metaspaces.me</StyledSearchUrl>
          </StyledSearch>
          <StyledSearchButtonBox>
            <StyledSearchButton icon={<ArrowRightOutlined />}>Vist</StyledSearchButton>
            <StyledSearchButton icon={<StyledHeadDiceIcon />}>Random</StyledSearchButton>
          </StyledSearchButtonBox>
        </StyledSearchBoxInput>

        {/* History or Search result */}
        {
          searchValue
            ? <StyledSearchResult>
              <StyledSearchSelect value={selectValue} defaultValue="result" style={{ width: 120 }} onChange={handleSelectChange}
                dropdownClassName="1"
                className="custom-search-select"
              >
                <Option value="result">Result</Option>
                <Option value="history">History</Option>
              </StyledSearchSelect>
              <StyledSearchList>
                {
                  resultOrHistoryList.map((i, key) => (
                    <li key={key}>
                      <StyledSearchListLink href="https://meta-cms.vercel.mttk.net" target="_blank" rel="noopener noreferrer">
                        <StyledListIcon />
                        <StyledSearchListText>Sub Domain - {i.subdomain}</StyledSearchListText>
                        {
                          selectValue === 'history'
                            ? <StyledListDeleteIcon onClick={(e: any) => handleDeleteHistory(e, i)} />
                            : null
                        }
                      </StyledSearchListLink>
                    </li>
                  ))
                }
              </StyledSearchList>
            </StyledSearchResult>
            : <StyledSearchResult>
              <StyledSearchTitle>History</StyledSearchTitle>
              <StyledSearchList>
                {
                  searchHistoryList.map((i, key) => (
                    <li key={key}>
                      <StyledSearchListLink href="https://meta-cms.vercel.mttk.net" target="_blank" rel="noopener noreferrer">
                        <StyledListIcon />
                        <StyledSearchListText>Sub Domain - {i.subdomain}</StyledSearchListText>
                        <StyledListDeleteIcon onClick={(e: any) => handleDeleteHistory(e, i)} />
                      </StyledSearchListLink>
                    </li>
                  ))
                }
              </StyledSearchList>
            </StyledSearchResult>
        }

      </StyledSearchBox>

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

      <Footer></Footer>
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
  width: 600px;
  margin: 100px auto 40px;
  @media screen and (max-width: 768px) {
    max-width: 90%;
    margin-top: 60px;
  }
`
const StyledSearchBoxInput = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`


const StyledSearchResult = styled.section`
  /* width: 780px;
  margin: 20px auto 0;
  @media screen and (max-width: 768px) {
    max-width: 90%;
  } */
  margin-top: 20px;
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
  font-size: 14px;
  &:hover {
    color: #333;
    background-color: #f5f5f5;
  }
`
const StyledSearchListText = styled.span`
  margin-left: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const StyledListIcon = styled(HexagonIcon)`
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
`
const StyledListDeleteIcon = styled(CloseOutlined)`
  margin-left: 10px;
`

const StyledSearch = styled.section`
  display: flex;
  align-items: flex-end;
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
  margin-left: auto;
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



export default Home
