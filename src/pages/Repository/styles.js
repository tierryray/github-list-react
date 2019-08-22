import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    display: flex;
    align-self: flex-start;
    background: transparent;
    color: #7159c1;
    font-size: 16px;
    margin: 0;
    padding: 10px;
    text-decoration: none;
    border-radius: 4px;
    transition: 0.2s;

    &:hover {
      background: #7159c1;
      color: #fff;

      svg {
        fill: #fff;
      }
    }

    svg {
      margin-right: 10px;
      transition: 0.2s;
    }
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const State = styled.div`
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: center;
  margin-top: 30px;

  .active {
    background-color: #7159c1;
    color: #fff;
  }

  button {
    margin: 0;
    background: transparent;
    border: 1px solid #7159c1;
    border-radius: 4px;
    padding: 10px 20px;
    text-decoration: none;
    color: #7159c1;
    font-size: 16px;

    & + button {
      margin-left: 20px;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  margin: 10px;
  padding: 0;
  border: none;
  background: transparent;

  &[disabled] {
    opacity: 0.5;
  }
`;
