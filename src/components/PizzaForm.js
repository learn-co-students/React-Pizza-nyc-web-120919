import React from "react"

class PizzaForm extends React.Component {

  
  render() {
    // console.log(this.state.size)
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" placeholder="Pizza Topping" onChange={this.props.handleTopping} value={this.props.editedPizza.topping}
              />
        </div>
        <div className="col">
          <select onChange={this.props.handleSize} value={this.props.editedPizza.size} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input onChange={this.props.handleVegetarian} className="form-check-input" type="radio" value="Vegetarian" checked={this.props.editedPizza.vegetarian && true}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input onChange={this.props.handleVegetarian} className="form-check-input" type="radio" value="Not Vegetarian" checked={!this.props.editedPizza.vegetarian && true}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={this.props.handleClick}>Submit</button>
        </div>
      </div>

  )
}
}

export default PizzaForm
