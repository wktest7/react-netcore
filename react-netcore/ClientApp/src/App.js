import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Test from './components/Test';
import Add from './components/Add';
import Edit from './components/Edit';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    <Route path='/test' component={Test} />
    <Route path='/add' component={Add} />
    <Route path='/edit/:id' component={Edit} />
    
  </Layout>
);
