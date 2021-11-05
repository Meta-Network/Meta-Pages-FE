import styled from 'styled-components'
import { HexagonIcon } from '../../components/Icon/Index'

export const StyledSearchList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  width: 280px;
`
export const StyledSearchListLink = styled.a`
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