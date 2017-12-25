import React from 'react'
import PropTypes from 'prop-types'
import {Comment} from 'semantic-ui-react'

import style from './ProductComments.scss'

const ProductComments = (props) => {
  return (<Comment.Group>
    {
      props.comments.length > 0 && props.comments.map((comment, key) => {
        return (<Comment key={key}>
          <Comment.Avatar src={comment.user.avatarUrl} className={style.commentAvatar}/>
          <Comment.Content>
            <Comment.Author className={style.commentAuthor}>{comment.user.name}</Comment.Author>
            <Comment.Metadata>{comment.publicationDate}
            </Comment.Metadata>
            <Comment.Text>{comment.comment}</Comment.Text>
          </Comment.Content>
        </Comment>)
      })
    }
  </Comment.Group>)
}

export default ProductComments
