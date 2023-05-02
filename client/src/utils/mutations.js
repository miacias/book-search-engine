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
    # mutation addBook($id: ID!, $authors: [String!], $description: String!, $bookId: String!,  $image: String, $link: String, $title: String!) {
         # addBook(_id: $id, authors: [$authors], description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
          # _id
        # }
      # }
      mutation addBook($id: ID!, $description: String!, $bookId: String!, $title: String!, $authors: [String!], $image: String, $link: String) {
        addBook(_id: $id, description: $description, bookId: $bookId, title: $title, authors: $authors, image: $image, link: $link) {
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