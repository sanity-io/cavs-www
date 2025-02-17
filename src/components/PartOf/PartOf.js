import React from 'react'
import PropTypes from 'prop-types'
import {findLast} from 'lodash'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LinkResolver from '../Link/Resolver'
import s from './PartOf.css'

function abbr(text) {
  if (text === 'Center for Advanced Visual Studies') {
    return <abbr title={text}>CAVS</abbr>
  }
  if (text === 'Massachusetts Institute of Technology') {
    return <abbr title={text}>MIT</abbr>
  }

  if (text === 'Center for Advanced Visual Studies, Massachusetts Institute of Technology') {
    return <abbr title={text}>CAVS, MIT</abbr>
  }
  return text
}

class PartOf extends React.Component {
  static propTypes = {
    partOf: PropTypes.arrayOf(PropTypes.shape({
      references: PropTypes.array,
      _id: PropTypes.string,
      _type: PropTypes.string,
    })),
  };

  static defaultProps = {
    partOf: [],
  }

  static defaultProps = {
    onClick: null,
  };

  renderParts() {
    const {partOf} = this.props
    const parts = partOf.map((part) => { // eslint-disable-line
      const image = part.references
        && part.references.length
        && part.references.map(reference => {
          if (reference.imageAssets && reference.imageAssets.length) {
            return findLast(reference.imageAssets, asset => {
              if (asset && asset.asset && asset.asset.url) {
                return asset.asset.url
              }
              return false
            })
          }
          return false
        },
      )[0]
      if (part._id) {
        return (
          <li key={part._id} className={s.part}>
            {
              image && image.asset && image.asset.url && (
                <img className={s.image} src={`${image.asset.url}?w=100`} alt={part.name || part.title} />
              )
            }
            <span className={s.workTitle}>
              <LinkResolver item={part} />
            </span>
            {
              part.creators && part.creators.length > 0 && (
                <span>
                  &nbsp;by&nbsp;
                  {
                    part.creators.map((person, i) => {
                      let seperator = part.creators.length > 1 && ', '
                      if (part.creators.length > 1 && i === part.creators.length - 1) {
                        seperator = ' and '
                      }
                      return (
                        <span className={s.creator} key={person._id} >
                          {i > 0 && seperator}
                          <LinkResolver item={person}>{abbr(person.name)}</LinkResolver>
                        </span>
                      )
                    })
                  }
                </span>
              )
            }
          </li>
        )
      }
    })

    return parts
  }

  render() {
    const {partOf} = this.props
    if (!partOf.length) {
      return (
        <div />
      )
    }

    return (
      <div className={s.root}>
        {
          partOf && partOf.length > 0 && (
            <div className={s.inner}>
              Part of: &nbsp;
              <ul className={s.list}>
                {this.renderParts()}
              </ul>
            </div>
          )
        }

      </div>
    )
  }
}

export default withStyles(s)(PartOf)
