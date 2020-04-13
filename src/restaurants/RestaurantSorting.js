import React, { Component } from 'react'
import RestaurantData_ from '../data/restaurants.json'
import RestaurantDetail from './RestaurantDetail'

// We have to do this because the data is inside the first property of the object in the json file.
const RestaurantData = RestaurantData_[Object.keys(RestaurantData_)[0]];


class RestaurantSorting extends Component {
  constructor (props) {
    super(props)
    this.onSorting = this.onSorting.bind(this)
    this.onViewing = this.onViewing.bind(this)
    this.state = {
      restaurantList: [],
      colAmount: 3
    }
  }

  // Method to sort our data, alphabetically ascending or descending, activates everytime our select is changed
  onSorting (event) {
    const {restaurantList} = this.state
    let newRestaurantList = restaurantList

    // Getting the select element
    var index_ = event.nativeEvent.target.selectedIndex;
    // Getting the option value
    var value = event.nativeEvent.target[index_].value

    // Should we sort alphabetically, ascending or descending
    if(value === "asc") {
      newRestaurantList = restaurantList.sort((a, b) => a.name.localeCompare(b.name))
    } else if (value === "desc") {
      newRestaurantList = restaurantList.sort((b, a) => a.name.localeCompare(b.name))
    }

    this.setState({
      restaurantList: newRestaurantList
    })
  }

  onViewing(event) {
    var index_ = event.nativeEvent.target.selectedIndex;
    var value = event.nativeEvent.target[index_].value


    if(value === "grid") {
      this.setState({
        colAmount: 3
      })
    } else {
      this.setState({
        colAmount: 12
      })
    }
  }

  // Default sorting is alphabetically from a-->, eg. ascending
  componentDidMount () {
    const restaurantList = RestaurantData
    this.setState({
      restaurantList: restaurantList.sort((a, b) => a.name.localeCompare(b.name))
    })
  }
  render () {
    const {restaurantList} = this.state
    return (
    <div className="wrapper__restaurants container">
        
        { /* Information about this assignment, and our ordering and viewing options */ }
        <div className="col-12 ordering">
          <ul>
            <li>
              <h5>Hover on images for blurhash</h5>
            </li>
            <li>
              <h5>Click on location for mapview (Redirection to google maps)</h5>
            </li>
            <li>
              <h5>Offline restaurants with opacity <i>0.7</i></h5>
            </li>
          </ul>
          <hr/>


          { /* Ordering and viewing optinons */ }
            <label htmlFor="orderBy">Order By:</label>
            <select id="orderBy" onChange={this.onSorting}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <label htmlFor="listView">View:</label>
            <select id="listView" onChange={this.onViewing}>
              <option value="grid">Grid</option>
              <option value="list">List</option>
            </select>

        </div>

        { /* Generating our list of restaurants */ }
        {restaurantList.map((restaurant, index) => {
          return <RestaurantDetail
            className={ `col-${ this.state.colAmount }` }
            restaurant={restaurant}
            blurhash={restaurant.blurhash}
            isOnline={restaurant.online}
            key={`restaurant-list-key ${index}`} />
        })}
      </div>
    )
  }
}

export default RestaurantSorting
