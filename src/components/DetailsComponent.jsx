import React, { Component } from 'react';
import LoaderComponent from './LoaderComponent';

export default class DetailsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      loading: true,
      openIdx: 0,

    }

    this.handleOpenDetails = this.handleOpenDetails.bind(this);

  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  handleOpenDetails(e, idx) {
    e.preventDefault();
    this.setState({ openIdx: idx });
  }

  render() {
    const { content, loading } = this.state;

    if (!!loading) {
      return (<LoaderComponent></LoaderComponent>);
    }

    return (
      <div>
        {content.map((qa, idx) => (
          <details key={idx} open={idx == this.state.openIdx} onClick={e => this.handleOpenDetails(e, idx)}>
            <summary>{qa.question}</summary>
            <p className="p-3">{qa.answer}</p>
          </details>
        ))}
      </div>
    )
  }
}
