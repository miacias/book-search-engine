import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
          }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
          token
        }
      }
`;

export const ADD_BOOK = gql`
    mutation addBook($id: ID!, $title: String!, $description: String!, $bookId: String!) {
        addBook(_id: $id, title: $title, description: $description, bookId: $bookId) {
          _id
        }
      }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($id: ID!, $bookId: String!) {
        removeBook(_id: $id, bookId: $bookId) {
          _id
          username
          savedBooks {
            title
          }
        }
      }
`;