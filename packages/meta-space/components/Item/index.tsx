import React from 'react'
import styled from 'styled-components'
import { Empty, Image } from 'antd'
import { HistoryListState } from '../../typings'
import { HexagonIcon } from '../Icon/Index'
import { CloseOutlined } from '@ant-design/icons'
import { StyledSearchList, StyledSearchListLink, StyledSearchListText, StyledListIcon, StyledEmpty } from '../../styles/pages/index.styles'
import { DomainData } from '../../typings/cms'

interface Props {
  readonly list: DomainData[]
  readonly isDelete?: boolean
  saveHistory: (val: DomainData) => void
  deleteHistory: (val: DomainData) => void
}

const Item: React.FC<Props> = ({ list, isDelete = false, saveHistory, deleteHistory }) => {

  return (
    <StyledSearchList>
      {
        list.map((i, key) => (
          <li key={key} onClick={() => saveHistory(i)}>
            <StyledSearchListLink href={`https://${i.domain}`} target="_blank" rel="noopener noreferrer">
              {
                i.siteInfo.favicon
                  ? <Image
                    src={i.siteInfo.favicon}
                    width={26}
                    height={26}
                    alt={i.siteInfo.title}
                    preview={false}
                    style={{ objectFit: 'contain' }} />
                  : <StyledListIcon />
              }
              <StyledSearchListText>{i.siteInfo.title} - {i.siteInfo.author}</StyledSearchListText>
              {
                isDelete && <StyledListDeleteIcon onClick={e => {
                  e.stopPropagation
                  deleteHistory(i)
                }} />
              }

            </StyledSearchListLink>
          </li>
        ))
      }
      {
        list.length <= 0 && <StyledEmpty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </StyledSearchList>
  )
}

const StyledListDeleteIcon = styled(CloseOutlined)`
  margin-left: auto;
`


export default Item