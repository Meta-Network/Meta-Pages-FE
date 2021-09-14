import React from 'react'
import styled from 'styled-components'

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <p>© 2021 Meta Network All Rights Served</p>
    </StyledFooter>
  )
}

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
export default Footer