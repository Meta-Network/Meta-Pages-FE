import React, { useState, useCallback } from 'react'
import type { NextPage } from 'next'
import { Button, Input, Select, message } from 'antd'
import styled from 'styled-components'
import { ArrowRightOutlined } from '@ant-design/icons'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { HexagonIcon, DiceIcon } from '../components/Icon/Index'
import { FetchDomainFindAPI, FetchSiteConfigRandomAPI } from '../helpers/index'
import { StoreGet, StoreSet } from '../utils/store'
import { isEmpty, cloneDeep, trim } from 'lodash'
import { useMount, useDebounceFn } from 'ahooks'
import { useTranslation } from 'next-i18next'
import { useSpring, animated, useSpringRef, useChain } from 'react-spring'
import MediaLink from '../components/MediaLink/Index'
import Footer from '../components/Footer/Index'
import { DomainData } from '../typings/cms'
import HeaderCustom from '../components/HeaderCustom/Index'
import Item from '../components/Item'

type SelectValueState = 'result' | 'history'

const { Search } = Input
const { Option } = Select
const KeyMetaSpaceHistory = 'MetaSpaceHistoryV1'
const KeyMetaSpaceHistoryMax = 10

const Home: NextPage = () => {
  const { t } = useTranslation('common')

  // 搜索结果列表
  const [searchResultList, setTearchResultList] = useState<DomainData[]>([])
  // 搜索历史列表
  const [searchHistoryList, setSearchHistoryList] = useState<DomainData[]>([])
  // 搜索内容
  const [searchValue, setSearchValue] = useState<string>('')
  // 当前选择值
  const [selectValue, setSelectValue] = useState<SelectValueState>('result')
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false)

  const LogoAnimatedStyles = useSpring({
    from: { opacity: 0, x: -10 },
    to: { opacity: 1, x: 0 },
  })
  const LogoTextAnimatedStylesSpringRef = useSpringRef()
  const LogoTextAnimatedStyles = useSpring({
    from: { opacity: 0, x: 10 },
    to: { opacity: 1, x: 0 },
    delay: 400,
    ref: LogoTextAnimatedStylesSpringRef,
  })
  const LogoTextTagAnimatedStylesSpringRef = useSpringRef()
  const LogoTextTagAnimatedStyles = useSpring({
    from: { opacity: 0, y: 10 },
    to: { opacity: 1, y: 0 },
    ref: LogoTextTagAnimatedStylesSpringRef
  })
  useChain([LogoTextAnimatedStylesSpringRef, LogoTextTagAnimatedStylesSpringRef])

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
    let historyList: DomainData[] = JSON.parse(historyStringify || '[]')
    setSearchHistoryList(historyList.reverse())
  }, [])

  /**
   * 处理历史记录
   */
  const saveHistory = useCallback(
    (space: DomainData) => {

      if (!space) {
        return
      }

      const historyStringify = StoreGet(KeyMetaSpaceHistory)

      // 没有历史记录
      if (isEmpty(historyStringify)) {
        StoreSet(KeyMetaSpaceHistory, JSON.stringify([space]))
      } else {
        let historyList: DomainData[] = JSON.parse(historyStringify || '[]')
        const historyListIdx = historyList.findIndex(i => i.domain === space.domain)

        if (~historyListIdx) {
          const temp = cloneDeep(historyList[historyListIdx])
          historyList.splice(historyListIdx, 1)
          historyList.push(temp)
        } else {
          if (historyList.length >= KeyMetaSpaceHistoryMax) {
            historyList.shift()
          }
          historyList.push(space)
        }

        StoreSet(KeyMetaSpaceHistory, JSON.stringify(historyList))
      }

      fetchHistory()
    },
    [fetchHistory],
  )

  /**
   * 删除历史记录
   */
  const deleteHistory = useCallback(
    (space: DomainData) => {
      const historyStringify = StoreGet(KeyMetaSpaceHistory)
      let historyList: DomainData[] = JSON.parse(historyStringify || '[]')
      const historyListIdx = historyList.findIndex(i => i.domain === space.domain)

      if (~historyListIdx) {
        historyList.splice(historyListIdx, 1)
        StoreSet(KeyMetaSpaceHistory, JSON.stringify(historyList))
      }
      fetchHistory()
    },
    [fetchHistory],
  )

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
  const handleVisitEvent = () => {
    if (!searchValue) {
      message.info('Enter search content')
      return
    }

    if (!isEmpty(searchResultList) && searchResultList[0].domain) {
      window.open(`https://${searchResultList[0].domain}`, '_blank')
    } else {
      message.info(t('no-address-to-jump'))
    }
  }

  // init
  useMount(() => {
    fetchHistory()
  })

  return (
    <StyledWrapper>

      <HeaderCustom></HeaderCustom>

      <StyledHead>
        <animated.div style={LogoAnimatedStyles}>
          <StyledHeadIcon></StyledHeadIcon>
        </animated.div>

        <StyledHeadTitleBox style={LogoTextAnimatedStyles}>
          <StyledHeadSub style={LogoTextTagAnimatedStyles}>{t('launcher')}</StyledHeadSub>
          <StyledHeadTitle>Meta Space</StyledHeadTitle>
        </StyledHeadTitleBox>
      </StyledHead>


      <StyledSearchBox>
        <StyledSearchBoxInput>
          <StyledSearch>
            <StyledSearchInput
              placeholder={t('sub-domain')}
              style={{ width: 240 }}
              onSearch={fetchSearchResult}
              onChange={e => handleSearchChange(e)}
              value={searchValue} />
            <StyledSearchUrl>.{process.env.NEXT_PUBLIC_META_SPACE_DOMAIN_URL}</StyledSearchUrl>
          </StyledSearch>
          <StyledSearchButtonBox>
            <StyledSearchButton icon={<ArrowRightOutlined />}
              onClick={handleVisitEvent} ghost>{t('visit')}</StyledSearchButton>
            <StyledSearchButton
              ghost
              loading={loadingRandom}
              icon={<StyledHeadDiceIcon />}
              onClick={handleRandomEvent}>{t('random')}</StyledSearchButton>
          </StyledSearchButtonBox>
        </StyledSearchBoxInput>
        {
          searchValue
            ? <StyledSearchResult>
              <StyledSearchSelect
                value={selectValue}
                defaultValue="result" style={{ width: 120 }}
                onChange={(val: any) => setSelectValue(val as SelectValueState)}
                className="custom-search-select"
              >
                <Option value="result">{t('result')}</Option>
                <Option value="history">{t('history')}</Option>
              </StyledSearchSelect>
              <Item
                list={
                  selectValue === 'result' ? searchResultList : selectValue === 'history' ? searchHistoryList : []
                }
                isDelete={selectValue === 'history'}
                saveHistory={saveHistory}
                deleteHistory={deleteHistory}></Item>
            </StyledSearchResult>
            : <StyledSearchResult>
              <StyledSearchTitle>{t('history')}</StyledSearchTitle>
              <Item
                list={searchHistoryList}
                isDelete={true}
                saveHistory={saveHistory}
                deleteHistory={deleteHistory}></Item>
            </StyledSearchResult>
        }

      </StyledSearchBox>

      <StyledtutorialBox>
        <StyledtutorialText
          href={process.env.NEXT_PUBLIC_BUILD_SPACE_LEARN}
          target="_blank" rel="noopener noreferrer">{t('guide-build-space')}&nbsp;&nbsp;</StyledtutorialText>
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
  padding-top: 80px;
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
  color: #fff;
  @media screen and (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
  &:hover {
    animation: rotate .6s;
  }

  @keyframes rotate {
  from {
    transform: rotate(0); 
  }
  to {
    transform: rotate(360deg);
  }
}
`

const StyledHeadDiceIcon = styled(DiceIcon)`
  width: 16px;
  height: 16px;
`
const StyledHeadTitleBox = styled(animated.section)`
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
  color: #fff;
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`
const StyledHeadSub = styled(animated.span)`
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
    background-color: transparent !important;
    color: #fff;
    border: none !important;
  }
  .ant-select-arrow {
    color: #fff;
  }
  &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    box-shadow: none;
  }
`
const StyledSearchTitle = styled.span`
  font-size: 14px;
  color: #fff;
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
  border-bottom: 1px solid #fff;
  .ant-input {
    color: #fff;
  }
  .ant-btn,
  .ant-input {
    border: none;
  }
  .ant-btn {
    color: #fff !important;
  }
  .ant-btn,
  .ant-input-group-addon,
  .ant-input {
    background-color: transparent;
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
  color: #fff;
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
  color: #fff;
  text-decoration: underline;
  font-size: 14px;
  background: #302458;
  border: 1px solid #00f3fd;
  border-radius: 4px;
  padding: 10px;
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}

export default Home
