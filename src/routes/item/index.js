import React from 'react';
import Item from './Item';
import Layout from '../../components/Layout';

export default {

  path: '/item/:identifier',

  async action({ fetch, params }) {
    const query = `
      *[identifier=="${params.identifier}"] {
        _id,
        _type,
        title,
        description,
        identifier,
        date,
        subjects,
        format,
        rights,
        imageAssets[] {
          _key,
          asset -> {url}
        },
        partOf[] -> {
          _id,
          _type,
          name,
          "references": *[references(^._id)] {name, title, imageAssets[] {asset -> {url}}},
          ...
        },
        creators[] -> {
          name,
          _id
        }
      }
    `;
    const result = await fetch(query, {});
    if (!result) {
      return {
        title: 'Error',
        component: <Layout>Not found</Layout>,
      };
    }
    return {
      title: result[0].title,
      component: <Layout><Item item={result[0]} /></Layout>,
    };
  },
};
