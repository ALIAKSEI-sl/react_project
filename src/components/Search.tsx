import { ChangeEvent, Component } from 'react';
import ErrorElement from './ErrorElement';

type SearchProp = {
  update: (searchTerm: string) => void;
};

type SearchState = {
  searchTerm: string;
  isError: boolean;
};

export default class Search extends Component<SearchProp, SearchState> {
  constructor(props: SearchProp) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('pokemon-searchTerm') ?? '',
      isError: false,
    };
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    const { update } = this.props;
    update(searchTerm);
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ searchTerm: value });
  };

  handleClick = () => {
    const { searchTerm } = this.state;
    const { update } = this.props;
    update(searchTerm);
    localStorage.setItem('pokemon-searchTerm', searchTerm);
  };

  throwError = () => {
    this.setState({ isError: true });
  };

  render() {
    const { searchTerm, isError } = this.state;
    if (isError) {
      return <ErrorElement />;
    }
    return (
      <div className="searchBlock">
        <input
          className="searchInput"
          value={searchTerm}
          onChange={this.handleChange}
        />
        <button
          type="button"
          className="searchButton"
          onClick={this.handleClick}
        >
          поиск
        </button>

        <button type="button" className="errorButton" onClick={this.throwError}>
          throw
          <br />
          error
        </button>
      </div>
    );
  }
}
