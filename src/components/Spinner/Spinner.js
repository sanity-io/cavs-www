import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Spinner.css'

class Spinner extends React.Component {
  render() {
    return (
      <div className={s.loader}>
        <span />
        <span />
        <span />
      </div>
    )
  }
}

export default withStyles(s)(Spinner)
