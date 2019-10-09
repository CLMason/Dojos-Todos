import React, { Component } from 'react'; 
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      tasks: [
        {title:"Learn React", isComplete: false},
        {title: "Buy a Unicorn", isComplete: true}
      ],
      task: "",
      valid: false,
      filteredTasks :[
        {title:"Learn React", isComplete: false},
        {title: "Buy a Unicorn", isComplete: true}
      ],
      filter: "All"
    };
  }
  setFilter = e => {
    this.setState({filter: e.target.value});
    this.filter(e.target.value);
  }
  changeTask = e =>{ 
    // when would we set this.state to valid? When the user is typing into the task
    let form_is_valid = e.target.value.length > 5;
    this.setState({task: e.target.value, valid : form_is_valid});
  }
  addTask = e => {
    e.preventDefault(); //preventing the form from submitting
    let newTask = {
      title: this.state.task,
      isComplete: false
    };
    let temp =[...this.state.tasks]; 
    temp.push(newTask); //adding new task to our temporary list of tasks
    this.setState({tasks: temp, task:""});
  }
  onToggle = i =>{
    console.log("toggle something", i);
    let temp = [...this.state.tasks];
    temp[i].isComplete =! temp[i].isComplete;
    this.setState({tasks:temp});
  }
  onDelete = i => {
    let temp = [...this.state.tasks];
    temp.splice(i, 1);
    this.setState({tasks:temp});
  }
  filter = thing =>{
    if(thing ==="All"){
      this.setState({filteredTasks: this.state.tasks});
    } else if(thing === "Complete"){
      this.setState({filteredTasks: this.state.tasks.filter(t => t.isComplete)});
    } else if(thing ==="Incomplete"){
      this.setState({filteredTasks: this.state.tasks.filter(t => !t.isComplete)});
    }
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Dojos Todos App</h1>
        </div>
        <div className="form-group">
          <select className="form-control" onChange={this.setFilter}>
            <option>All</option>
            <option>Complete</option>
            <option>Incomplete</option>
          </select>
        </div>
        <form onSubmit={this.addTask}>
          <div className="form-row align-itmes-center">
            <div className="col-auto">
              <label className="sr-only" htmlFor="inlineFormInput">Task</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Task</div>
                </div>
                <input 
                  type="text" 
                  className="form-control" 
                  id="inlineFormInputGroup" 
                  placeholder="Your Tasks..." 
                  // what event are we listening for when we type an event in the input?
                  onChange={this.changeTask}
                  value={this.state.task}
                />
              </div>
            </div>
              <div className="col-auto">
                {
                  this.state.valid ?
                  <button type="submit" className="btn btn-primary">Add Task</button> :
                  <button type="submit" disabled className="btn btn-primary">Add Task</button> 
                }
              </div>
          </div>
        </form>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Task</th>
              <th>Completed?</th>
              <th>Remove</th>
            </tr>
            {
              this.state.filteredTasks.map( (t, i) =>
              <tr key={i}>
                <td>{t.title}</td>
                <td>
                      {
                        t.isComplete?
                        <>
                        <input 
                        type="checkbox"
                        onClick={this.onToggle.bind(this, i)} //bind allows us to give extra parameters into a function without calling it. So if want to know what we're toggling we use bind
                        defaultChecked
                        />
                        <span>Complete</span>
                        </> :
                        <>
                        <input
                          type= "checkbox"
                          onClick ={this.onToggle.bind(this, i)}
                        />
                          <span>Incomplete</span>
                        </>
                      }
                </td>
                <td>
                  <button 
                    className="btn btn-danger"
                    onClick ={this.onDelete.bind(this, i)}
                  >
                      &times;
                    </button>
                  </td>
              </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
