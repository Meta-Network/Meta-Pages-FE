import React from 'react'
import styled from 'styled-components'
import { Empty } from 'antd'
import { HistoryListState } from '../../typings'
import { HexagonIcon } from '../Icon/Index'
import { CloseOutlined } from '@ant-design/icons'
import { StyledSearchList, StyledSearchListLink, StyledSearchListText, StyledListIcon } from '../../styles/pages/index.styles'

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
          ? <StyledEmpty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          : null
      }
    </StyledSearchList>
  )
}

const StyledListDeleteIcon = styled(CloseOutlined)`
  margin-left: auto;
`

const StyledEmpty = styled(Empty)`
  .ant-empty-description {
    color: #fff;
  }
`

export default HistoryList