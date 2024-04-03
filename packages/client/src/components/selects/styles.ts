import { CSSObjectWithLabel } from 'react-select'

export const controlStyles = (baseStyles: CSSObjectWithLabel) => ({
  ...baseStyles,
  fontSize: '1rem',
  fontFamily: 'Roboto',
  width: '30vw',
  height: '50px',

  '@media (max-width: 600px)': {
    width: '100%',
  },
})

export const menuListStyles = (baseStyles: CSSObjectWithLabel) => ({
  ...baseStyles,
  height: '200px',
})

export const placeholderStyles = (baseStyles: CSSObjectWithLabel) => ({
  ...baseStyles,
  fontSize: '1rem',
  '@media (max-width: 600px)': {
    fontSize: '0.8rem',
  },
})
