import styled from 'styled-components'
import { Empty } from 'antd'

import { HexagonIcon } from '../../components/Icon/Index'


export const StyledSearchList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  width: 280px;
  background-color: #302458;
  border-radius: 4px;
  border: 1px solid #00f3fd;
`
export const StyledSearchListLink = styled.a`
  display: flex;
  align-items: center;
  color: #fff;
  padding: 8px 10px;
  font-size: 14px;
  &:hover {
    color: #fff;
    background-color: #3f2f72;
    border-radius: 4px;
  }
`
export const StyledSearchListText = styled.span`
  margin-left: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const StyledListIcon = styled(HexagonIcon)`
  width: 26px;
  height: 26px;
  flex: 0 0 26px;
`

export const StyledEmpty = styled(Empty)`
  .ant-empty-description {
    color: #fff;
  }
`