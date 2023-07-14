import axios from 'axios';

const api = axios.create({
  baseURL: 'https://graphql.cherre.com/graphql',
  headers: {
    Authorization: `Bearer YXBpLWNsaWVudC1hOGUzZGQxMS04MjFmLTRmYTctYmEyZC1mZmJhOWNmNDIzYTNAY2hlcnJlLmNvbToxVWJAKjR2IUFEdkpkMzd4YiNxcW9wS1ZkYVphTnJOc1dDenE2UUlGRTE4ZjZpNk1oekUmWG54SXJ5UVN0dFU2`,
  }
});

export default api;
