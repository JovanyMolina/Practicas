import React from 'react'
import form from './form'

describe('<form />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // cy.visit('http://localhost:3000/practica8Todo')
    cy.visit('http://10.0.0.6:3000/')

    cy.mount(<form />)
  })
})