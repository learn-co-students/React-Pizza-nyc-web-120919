import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    editedPizza: {
      topping: "",
      size: "",
      vegetarian: false
    }
   }

    componentDidMount() {
      fetch('http://localhost:3000/pizzas')
      .then(resp => resp.json())
      .then(data => {
        this.setState({pizzas: data})
      })
    }

    handleTopping = (e) => {
      console.log(e.target.value);
      // this.setState({...this.state.editedPizza, 
      //   editedPizza: {
      //     ...this.state.editedPizza, 
      //     topping: e.target.value
      //   }})
      this.setState({
        editedPizza: {
          ...this.state.editedPizza,
          topping: e.target.value
        }
      })
    }

    handleSize = (e) => {
      this.setState({...this.state.editedPizza, 
        editedPizza: {
          ...this.state.editedPizza, 
          size: e.target.value
        }})
}

  handleVegetarian = () => {
    this.setState({...this.state.editedPizza, 
      editedPizza: {
        ...this.state.editedPizza, 
        vegetarian: !this.state.editedPizza.vegetarian
      }})
  }

  findPizzaToEdit = (id) => {
    const foundPizza = this.state.pizzas.find(pizza => pizza.id === id);
    console.log("PIZZA", foundPizza);
    this.setState({editedPizza: foundPizza});
  }

  patchPizza = (e) => {
    // e.preventDefault() bc

    let id = this.state.editedPizza.id
    fetch(`http://localhost:3000/pizzas/${id}`, {
    method: "PATCH",
    headers: {"content-type": "application/json",
              Accept: "application/json"
    },
    body: JSON.stringify(this.state.editedPizza)
    }
    )
    .then(resp => resp.json())
    .then(pizzadata => {
      let editComp = this.state.pizzas.map(pizza => pizza.id === id ? {...pizza, ...pizzadata} : pizza)
      this.setState({pizzas: editComp})
    })
  }


  
  render() {
    
    console.log(this.state.pizzas)
    
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizzas={this.state.pizzas} handleClick={this.patchPizza} handleTopping={this.handleTopping} handleSize={this.handleSize} handleVegetarian={this.handleVegetarian} editedPizza={this.state.editedPizza} />
        <PizzaList pizzas={this.state.pizzas} findPizzaToEdit={this.findPizzaToEdit} />
      </Fragment>
    );
  }
}


export default App;
