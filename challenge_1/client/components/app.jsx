import React from 'react';
import Paginate from 'react-paginate';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      searchResults: [],
      offset: 0
    }

    this.searchChange = this.searchChange.bind(this);
    this.loadResults = this.loadResults.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  searchChange(e) {
    this.setState({searchInput: e.target.value});
  }

  loadResults() {
    if (this.state.searchInput.trim() !== '') {
      axios.get(`/events?q=${this.state.searchInput}&_start=${this.state.offset}&_limit=10`)
        .then((results) => {
          console.log(results);
          this.setState({
            searchResults: results.data,
            pageCount: Math.ceil(results.headers['x-total-count'] / 10)
          });
        });
    }
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);

    this.setState({offset: offset}, () => {
      this.loadResults();
    });
  };

  render() {
    return (
      <div>
        <div>
          <Search 
            searchChange={this.searchChange} 
            loadResults={this.loadResults}
          />
        </div>
        <List data={this.state.searchResults} />
        {this.state.searchResults.length ? 
          <Paginate previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"} /> : ''
        }
        
      </div>
    )
  }
}

const Search = (props) => (
  <div id='search-container'>
    <input id='searchbar' type='search' name='searchbar' placeholder='Search for events' onChange={props.searchChange}></input>
    <button onClick={props.loadResults}>
      <svg viewBox="0 0 24 24" focusable="false" id="searchSvg">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
      </svg>
    </button>
  </div>
);

const List = (props) => (
  <div id='list'>
    {props.data.map((item, i) => (
      <div className='listitem' key={i}>
        <b>Description:</b> {item.description}
      </div>))}

  </div>
);

export default App;