import { getheader } from '../support/app.po';

describe('support-tickets-interface', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getheader().contains('Bright Computing');
  });
});
