import { style } from '@vanilla-extract/css'
import { vars, responsiveStyle } from '@0xsequence/design-system'

export const groupItems = style({
  display: "grid",
  gridColumnGap: vars.space[4],
  gridRowGap: vars.space[4],
  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  '@media': responsiveStyle({
    lg: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    xl: {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    }
  })
})