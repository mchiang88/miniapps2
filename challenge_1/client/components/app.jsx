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
        <Search />
        Rendering
      </div>
    )
  }
}

const Search = (props) => (
  <div>
    <input type='text' name='searchbar' placeholfrt='Search for events' onChange={props.searchChange} ></input>
  </div>
);

export default App;