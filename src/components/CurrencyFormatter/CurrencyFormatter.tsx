import { type FunctionComponent } from 'react'

import classes from './currency-formatter.module.scss'


interface Props {
  amount: number
}

export const CurrencyFormatter: FunctionComponent<Props> = ({ amount }) => {
  const formattedAmount = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'usd'
  })

  return <span className={classes.currency}>{formattedAmount}</span>
}