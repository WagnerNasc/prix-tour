import { CSSObjectWithLabel } from 'react-select'

export const controlStyles = (
  baseStyles: CSSObjectWithLabel,
  height: string,
  width: string
) => ({
  ...baseStyles,
  fontSize: '1rem',
  fontFamily: 'Roboto',
  width: width,
  height: height,

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
