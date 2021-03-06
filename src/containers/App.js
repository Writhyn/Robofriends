import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import 'tachyons';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchfield: '',
      robots: []
    }
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});
  }

  onCardClick = (event) => {
    this.setState({searchfield: event.target.id});
  }


  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({robots: users}))
  }

  render() {
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
    return (
      <div className='tc'>
        <h1 className='f1'>Robofriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} cardClick={this.onCardClick} />
          </ErrorBoundary>
        </Scroll>
      </div>
    )
  }

}

export default App;