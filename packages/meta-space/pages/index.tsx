import React, { useMemo, useState, useCallback } from 'react'
import type { NextPage } from 'next'
import { Button, Input, Empty, Select, message } from 'antd'
import styled from 'styled-components'
import { AudioOutlined, ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import { HexagonIcon, DiceIcon } from '../components/Icon/Index'
import { FetchDomainFindAPI, FetchSiteConfigRandomAPI } from '../helpers/index'
import { StoreGet, StoreSet } from '../utils/store'
import { isEmpty, cloneDeep, trim } from 'lodash'
import { useMount, useDebounceFn } from 'ahooks'
import HistoryList from '../components/HistoryList/Index'
import MediaLink from '../components/MediaLink/Index'

import Footer from '../components/Footer/Index'
import { DomainData } from '../typings/cms'
import { HistoryListState } from '../typings'


const { Search } = Input
const { Option } = Select

const KeyMetaSpaceHistory = 'MetaSpaceHistory'

const Home: NextPage = () => {
  // 搜索结果列表
  const [searchResultList, setTearchResultList] = useState<DomainData[]>([])
  // 搜索历史列表
  const [searchHistoryList, setSearchHistoryList] = useState<HistoryListState[]>([])
  // 搜索内容
  const [searchValue, setSearchValue] = useState<string>('')
  // 当前选择值
  const [selectValue, setSelectValue] = useState<'result' | 'history'>('result')
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false)

  /**
   * 获取搜索结果
   */
  const { run: fetchSearchResult } = useDebounceFn(
    async (value: string) => {
      if (!trim(value)) {
        return
      }

      const data = await FetchDomainFindAPI({
        prefix: trim(value),
        limit: 10
      })

      if (data) {
        setTearchResultList(data)
      }

      if (!isEmpty(data)) {
        handleHistory(value)
      }
    },
    { wait: 300 },
  )

  /**
   * 处理搜索改变
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e)
    const value = trim(e.target.value)
    setSearchValue(value)
    if (value) {
      fetchSearchResult(value)
    }
  }

  /**
 * 获取历史浏览
 */
  const fetchHistory = useCallback(() => {
    const historyStringify = StoreGet(KeyMetaSpaceHistory)
    let historyList: HistoryListState[] = historyStringify ? JSON.parse(historyStringify) : []
    setSearchHistoryList(historyList)
  }, [])

  /**
   * 处理历史记录
   */
  const handleHistory = useCallback(
    (domain: string) => {

      if (!domain) {
        return
      }

      const historyStringify = StoreGet(KeyMetaSpaceHistory)
      const historyData = {
        domain: trim(domain),
        lastTime: Date.now()
      }

      // 没有历史记录
      if (isEmpty(historyStringify)) {
        StoreSet(KeyMetaSpaceHistory, JSON.stringify([historyData]))
      } else {
        let historyList: HistoryListState[] = historyStringify ? JSON.parse(historyStringify) : []
        const historyListIdx = historyList.findIndex(i => i.domain === domain)

        if (~historyListIdx) {
          const temp = cloneDeep(historyList[historyListIdx])
          historyList.splice(historyListIdx, 1)
          historyList.push(temp)
        } else {
          if (historyList.length >= 10) {
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
    fetchSearchResult(value)
  }

  /**
   * 删除历史记录
   */
  const deleteHistory = useCallback(
    (item: HistoryListState) => {
      const historyStringify = StoreGet(KeyMetaSpaceHistory)
      let historyList: HistoryListState[] = historyStringify ? JSON.parse(historyStringify) : []
      const historyListIdx = historyList.findIndex(i => i.domain === item.domain)

      if (~historyListIdx) {
        historyList.splice(historyListIdx, 1)
        StoreSet(KeyMetaSpaceHistory, JSON.stringify(historyList))
      }
      fetchHistory()
    },
    [fetchHistory],
  )

  // init
  useMount(
    () => {
      fetchHistory()
    }
  )

  /**
   * 处理点击历史记录
   */
  const handleHistoryEventClick = (val: string) => {
    setSearchValue(val)
    handleSearch(val)
    setSelectValue('result')
  }

  /**
   * random click
   */
  const handleRandomEvent = async (): Promise<void> => {
    setLoadingRandom(true)
    const data = await FetchSiteConfigRandomAPI()
    setLoadingRandom(false)
    if (data) {
      const value = data.metaSpacePrefix
      setSearchValue(value)
      fetchSearchResult(value)
    }
  }

  /**
   * vist click
   */
  const handleVistEvent = () => {
    if (!searchValue) {
      message.info('请输入搜索内容')
      return
    }

    if (!isEmpty(searchResultList) && searchResultList[0].domain) {
      window.open(`https://${searchResultList[0].domain}`, '_blank')
    } else {
      message.info('没有可以跳转的地址')
    }
  }

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
            <StyledSearchInput
              placeholder="Sub Domain"
              style={{ width: 240 }}
              onSearch={handleSearch}
              onChange={e => handleSearchChange(e)}
              value={searchValue} />
            <StyledSearchUrl>.{process.env.NEXT_PUBLIC_META_SPACE_DOMAIN_URL}</StyledSearchUrl>
          </StyledSearch>
          <StyledSearchButtonBox>
            <StyledSearchButton icon={<ArrowRightOutlined />}
              onClick={handleVistEvent}>Vist</StyledSearchButton>
            <StyledSearchButton
              loading={loadingRandom}
              icon={<StyledHeadDiceIcon />}
              onClick={handleRandomEvent}>Random</StyledSearchButton>
          </StyledSearchButtonBox>
        </StyledSearchBoxInput>

        {/* History or Search result */}
        {
          searchValue
            ? <StyledSearchResult>
              <StyledSearchSelect value={selectValue} defaultValue="result" style={{ width: 120 }} onChange={(v: any) => setSelectValue(v)}
                dropdownClassName="1"
                className="custom-search-select"
              >
                <Option value="result">Result</Option>
                <Option value="history">History</Option>
              </StyledSearchSelect>

              {
                selectValue === 'result'
                  ? <>
                    <StyledSearchList>
                      {
                        searchResultList.map((i, key) => (
                          <li key={key}>
                            <StyledSearchListLink href={`https://${i.domain}`} target="_blank" rel="noopener noreferrer">
                              <StyledListIcon />
                              <StyledSearchListText>{i.siteInfo.title} - {i.siteInfo.author}</StyledSearchListText>
                            </StyledSearchListLink>
                          </li>
                        ))
                      }

                      {
                        searchResultList.length <= 0
                          ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                          : null
                      }
                    </StyledSearchList>
                  </>
                  : selectValue === 'history'
                    ? <HistoryList
                      list={searchHistoryList}
                      handleHistoryEventClick={handleHistoryEventClick}
                      deleteHistory={deleteHistory}></HistoryList>
                    : null
              }


            </StyledSearchResult>
            : <StyledSearchResult>
              <StyledSearchTitle>History</StyledSearchTitle>
              <HistoryList
                list={searchHistoryList}
                handleHistoryEventClick={handleHistoryEventClick}
                deleteHistory={deleteHistory}></HistoryList>
            </StyledSearchResult>
        }

      </StyledSearchBox>

      <StyledtutorialBox>
        <StyledtutorialText
          href={process.env.NEXT_PUBLIC_META_NETWORK_URL}
          target="_blank" rel="noopener noreferrer">【Guide】Build your owner Meta space in 5 minutes</StyledtutorialText>
      </StyledtutorialBox>

      <MediaLink></MediaLink>
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
  margin-left: auto;
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


export default Home
