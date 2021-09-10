import styled, { css } from 'styled-components'


const sizes = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}

// // Iterate through the sizes and create a media template
// export const media = Object.keys(sizes).reduce((acc, label) => {
//   acc[label] = (...args) => css`
//     @media (max-width: ${sizes[label]}px) {
//       ${css(...args)}
//     }
//   `

//   return acc
// }, {})