import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Subjects.css'

import Link from '../Link/Link'

class Subjects extends React.Component {
  static propTypes = {
    subjects: PropTypes.arrayOf(PropTypes.string.isRequired),
  };

  static defaultProps = {
    subjects: [],
  }

  static defaultProps = {
    onClick: null,
  };

  render() {
    const {subjects} = this.props
    return (
      <ul className={s.root}>
        {
          subjects && subjects.length > 0 && (
            <li className={s.subject}>
              Subjects:
              {
                subjects.map(subject => {
                  if (subject) {
                    return (
                      <Link key={subject} className={s.link} to={`/subject/${subject}`}>{subject || 'No subject'}</Link>
                    )
                  }
                  return <span /> //eslint-disable-line
                })
              }
            </li>
          )
        }
      </ul>
    )
  }
}

export default withStyles(s)(Subjects)
