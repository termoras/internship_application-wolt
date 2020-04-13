import React, { Component} from 'react';
import './styling/restaurants.scss';
import { decode } from "blurhash";


class RestaurantDetail extends Component {


  componentDidMount() {

    // Displaying our blurhash, bonus
    this.displayBlurhash(this.props.blurhash)
    
    // If offline, lower opacity
    if(!this.props.isOnline) {
      this.refs.wrap.classList += " offline"
    }

  }

  displayBlurhash(hashValue) {

    // Modified but basically from blurhash github
    const canvas = this.refs.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext("2d");

    const pixels = decode(hashValue, width, height);
    const imageData = ctx.createImageData(width, height);
    
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
  }


  render() {

      /* Props provided from RestaurantSorting */
      const {restaurant} = this.props

      return (
      <div ref="wrap" className={ `wrapper__restaurant ${ this.props.className }` }>

          <div className="container__restaurant">

            <div className="container__image">
                {/* Blurhash, loads first */}
                <canvas className="restaurant__image" ref="canvas" width="100%" height="100%" />
                {/* Restaurant image, loads on top of generated blurhash */}
                <img className="restaurant__image" src={restaurant.image} width="100%" alt={restaurant.name} />
                
                {/* Restaurant location, link opens to google view of given location */}
                <p className="label-location">
                  <a target="_blank" href={`https://google.com/maps/place/${restaurant.location[1]},${restaurant.location[0]}/@${restaurant.location[1]},${restaurant.location[0]},20z` }>{restaurant.city}</a>
                </p>
  
                {/* Delivery price */}
                <p className="label-delivery_price">
                  {restaurant.delivery_price.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",") + '€'}
                </p>
            </div>
            
            {/* Restaurant information */}
            <div className="container__restaurant-description">
                {/* Restaurant name */}
                <h3 className="restaurant__title">{restaurant.name}</h3>
                <p>{restaurant.description}</p>

                  {/* Restaurant tags */}
                  <div className="container__restaurant-tags">
                    <ul className="tagList">
                      {restaurant.tags.map((tag, index) => {
                      return <li key={`tag-list-key ${index}`}>{tag}</li>
                      })}
                    </ul>
                  </div>
            </div>
        </div>
      </div>
    );
  }
}

export default RestaurantDetail;
