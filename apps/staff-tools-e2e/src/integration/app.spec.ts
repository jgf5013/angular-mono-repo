import { getheader } from '../support/app.po';

describe('staff-tools', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getheader().contains('Demo Org');
  });
});
