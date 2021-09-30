import React from 'react'
import styled from 'styled-components'
import { Button, Input, Empty, Select } from 'antd'
import { HistoryListState } from '../../typings'
import { HexagonIcon } from '../Icon/Index'
import { CloseOutlined } from '@ant-design/icons'

interface Props {
  readonly list: HistoryListState[]
  handleHistoryEventClick: (val: string) => void
  deleteHistory: (val: HistoryListState) => void
}

const HistoryList: React.FC<Props> = ({ list, handleHistoryEventClick, deleteHistory }) => {

  /**
 * 处理删除历史记录
 */
  const handleDeleteHistory = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, item: HistoryListState) => {
    e.stopPropagation()
    deleteHistory(item)
  }

  return (
    <StyledSearchList>
      {
        list.map((i, key) => (
          <li key={key}>
            <StyledSearchListLink href={'javascript:;'} onClick={() => { handleHistoryEventClick(i.domain) }}>
              <StyledListIcon />
              <StyledSearchListText>{i.domain}</StyledSearchListText>
              <StyledListDeleteIcon onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => handleDeleteHistory(e, i)} />
            </StyledSearchListLink>
          </li>
        ))
      }
      {
        list.length <= 0
          ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          : null
      }
    </StyledSearchList>
  )
}

const StyledSearchList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  width: 240px;
`

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

export default HistoryList