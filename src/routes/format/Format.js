import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Format.css'
import ReferenceGrid from '../../components/ReferenceGrid/ReferenceGrid'

class Format extends React.PureComponent {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
    })),
    format: PropTypes.string.isRequired,
  }

  static defaultProps = {
    items: [],
  }

  render() {
    const {items, format} = this.props
    return (
      <div className={s.container}>
        <h1 className={s.title}>{format}</h1>
        <ReferenceGrid references={items} />
      </div>
    )
  }
}

export default withStyles(s)(Format)
