import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LinkResolver from '../Link/Resolver'

import s from './Item.css'

class Item extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      _type: PropTypes.string.isRequired,
      imageAssets: PropTypes.array
    }).isRequired
  }

  shouldComponentUpdate(prevProps) {
    return prevProps.item._id !== this.props.item._id
  }

  renderImage() {
    const {item} = this.props
    const {asset} = item.imageAssets[0]
    const {url, metadata} = asset
    const {width, height} = metadata.dimensions

    const length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
    const scale = 500 / length
    const scaledWidth = Math.round(width * scale)

    return (
      <img
        src={`${url}?w=${scaledWidth}`}
        srcSet={`
          ${url}?w=${scaledWidth} 1x,
          ${url}?w=${scaledWidth * 2} 2x
        `}
        alt=""
      />
    )
  }

  render() {
    const {item} = this.props

    return (
      <div className={s.root}>
        {
          item.link && (
            <LinkResolver item={item.link} className={s.link}>
              {this.renderImage()}
            </LinkResolver>
          )
        }
        {
          !item.link && (
            this.renderImage()
          )
        }
      </div>
    )
  }
}

export default withStyles(s)(Item)
