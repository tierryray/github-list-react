/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import Loading from '../../components/Loading';
import { Owner, State, IssueList } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filter: 'all',
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'all',
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  componentDidUpdate(_, prevState) {
    const { filter } = this.state;
    if (prevState.filter !== filter) {
      this.fetchIssues();
    }
  }

  fetchIssues = async () => {
    const { match } = this.props;
    const { filter } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
      },
    });

    this.setState({
      issues: issues.data,
    });
  };

  handleListAllRepositories = () => {
    this.setState({
      filter: 'all',
    });
  };

  handleListOpenRepositories = () => {
    this.setState({
      filter: 'open',
    });
  };

  handleListClosedRepositories = () => {
    this.setState({
      filter: 'closed',
    });
  };

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#FFF" size={150} />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaArrowLeft color="#7159c1" size={18} />
            Voltar
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <State>
          <button
            type="button"
            onClick={this.handleListAllRepositories}
            autoFocus="true"
          >
            Todos
          </button>
          <button type="button" onClick={this.handleListOpenRepositories}>
            Abertos
          </button>
          <button type="button" onClick={this.handleListClosedRepositories}>
            Fechados
          </button>
        </State>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
