import React from 'react'
import {
  Image,
  Item,
  Header
} from 'semantic-ui-react'
import StarRatingComponent from 'react-star-rating-component'

import style from './ProductDetailHeader.scss'

const ProductDetailHeader = (props) => {
  const userFullName = (!props.userName && !props.userLastName) ? 'Usuario anónimo' : `${props.userName} ${props.userLastName}`
  return (
    <Item.Group>
      <Item className={style.item}>
        <div className={style.imageRating}>
          <Item.Image size="tiny" shape="circular" src={props.productImg}></Item.Image>
          {
            props.productRating && <StarRatingComponent name="rate1" starCount={5} value={props.productRating}/>
          }
        </div>

        <Item.Content className={style.itemContent}>
          <Item.Header>{props.productName}</Item.Header>
          <Item.Meta className={style.itemMeta}>{userFullName}</Item.Meta>
          <Item.Extra className={style.itemExtra}>{props.userAddress}</Item.Extra>
          <Item.Description>{props.productDescription}</Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default ProductDetailHeader
