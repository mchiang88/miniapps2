import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: ''
    }

    this.searchChange = this.searchChange.bind(this);
  }

  searchChange(e) {
    this.setState({searchInput: e.target.value}, () => console.log(this.state.searchInput));
  }

  render() {
    return (
      <div>
        <div id='search-container'>
          <Search searchChange={this.searchChange} />
        </div>
        Rendering
      </div>
    )
  }
}

const Search = (props) => (
  <div>
    <input id='searchbar' type='search' name='searchbar' placeholder='Search for events' onChange={props.searchChange}></input>
  </div>
);

export default App;