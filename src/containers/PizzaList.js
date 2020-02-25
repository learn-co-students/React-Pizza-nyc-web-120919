import React, { Component } from 'react';
import Pizza from '../components/Pizza'
class PizzaList extends Component {

  state={
    pizzas: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
      .then(resp => resp.json())
      .then(pizzasArray => {this.setState({
        pizzas: pizzasArray
      })})
  }

  componentDidUpdate() {
    fetch('http://localhost:3000/pizzas')
      .then(resp => resp.json())
      .then(pizzasArray => {this.setState({
        pizzas: pizzasArray
      })})
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.pizzas.map(pizza => <Pizza handleEditPizzaClick={this.props.handleEditPizzaClick} key={pizza.id} {...pizza}/>)
          }
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
