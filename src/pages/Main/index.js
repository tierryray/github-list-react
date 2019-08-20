import React, { Component } from 'react';

import { toast } from 'react-toastify';

import { FaGithubAlt, FaPlus, FaSpinner, FaInfoCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    repoNotFound: false,
  };

  //  Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  //  Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();

      this.setState({ loading: true });

      const { newRepo, repositories } = this.state;

      const repoExists = repositories.find(
        repository => repository.name === newRepo
      );

      if (repoExists) {
        throw new Error('REPO_DUPLICATE');
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        repoNotFound: false,
      });

      toast.success('✅ Repositório adicionado com sucesso!', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      if (err.message === 'REPO_DUPLICATE') {
        toast.error('❌ Repositório duplicado!', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.error('❌ Repositório não encontrado!', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }

      this.setState({
        repoNotFound: true,
        loading: false,
      });
    }
  };

  render() {
    const { newRepo, repositories, loading, repoNotFound } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} repoNotFound={repoNotFound}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                <FaInfoCircle color="#7159c1" size={20} />
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
