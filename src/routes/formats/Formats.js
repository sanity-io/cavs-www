import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Menu from '../works/Menu'
import Link from '../../components/Link/Link'
import s from './Formats.css'

class Home extends React.Component {
  static propTypes = {
    formats: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    formats: [],
  }
  render() {
    const {formats} = this.props
    return (
      <div>
        <Menu />
        <div className={s.container}>
          <ul className={s.list}>
            {
            formats.map(format => (
              <li className={s.item} key={format}>
                <Link className={s.link} to={`/format/${format}`}>{format}</Link>
              </li>
              ))
          }
          </ul>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Home)
