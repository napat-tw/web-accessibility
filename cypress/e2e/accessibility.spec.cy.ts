describe('Accessibility and Functional Coverage Tests', () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit('/');
    
    // Inject the axe-core library
    cy.injectAxe();
  });

  it('Should have no detectable accessibility violations on initial load', () => {
    cy.checkA11y();
  });

  it('Should navigate between Form and Project Information tabs without accessibility issues', () => {
    // Check initial accessibility
    cy.checkA11y();

    // Navigate to Project Information tab
    cy.findByRole('tab', { name: /^project information$/i })
      .click()
      .should('have.attr', 'aria-selected', 'true');

    // Check accessibility after navigation
    cy.checkA11y();

    // Navigate back to Form tab using keyboard
    cy.findByRole('tab', { name: /^form$/i })
      .focus()
      .type('{enter}')
      .should('have.attr', 'aria-selected', 'true');

    // Final accessibility check
    cy.checkA11y();
  });

  it('Should submit the form successfully when all fields are valid', () => {
    // Fill out the form
    cy.findByLabelText(/title/i)
      .select('Mr.');

    cy.findByLabelText(/name/i)
      .type('John Doe');

    cy.findByLabelText(/email/i)
      .type('john.doe@example.com');

    cy.findByLabelText(/^male$/i)
      .check();

    // Submit the form
    cy.findByRole('button', { name: /^submit$/i })
      .click();

    // Check for success message
    cy.findByText(/^form submitted successfully!$/i)
      .should('be.visible');

    // Accessibility check after form submission
    cy.checkA11y();
  });

  it('Should display error messages when form is submitted with invalid inputs', () => {
    // Attempt to submit the form without filling any fields
    cy.findByRole('button', { name: /^submit$/i })
      .click();

    // Check for error messages
    cy.findByText(/^title is required.$/i)
      .should('be.visible');

    // Accessibility check for errors
    cy.checkA11y();
  });

  it('Should open and close the Help modal with accessibility considerations', () => {
    // Open the Help modal
    cy.findByRole('button', { name: /^help$/i })
      .click();

    // Ensure the modal is visible
    cy.findByRole('dialog', { name: /^help information$/i })
      .should('be.visible');

    // Check accessibility inside the modal
    cy.checkA11y();

    // Close the modal using the close button
    cy.findByRole('button', { name: /^close help modal$/i })
      .click();

    // Ensure the modal is closed
    cy.findByRole('dialog', { name: /^help information$/i })
      .should('not.exist');

    // Accessibility check after closing modal
    cy.checkA11y();
  });

  it('Should verify ARIA attributes are correctly set', () => {
    // Verify Navbar ARIA roles and properties
    cy.findByRole('navigation', { name: /^main navigation$/i })
      .within(() => {
        cy.findAllByRole('tab')
          .should('have.length', 3) // Including the non-available tab
          .each(($tab, index) => {
            if (index < 2) {
              cy.wrap($tab)
                .should('have.attr', 'aria-selected')
                .and('match', /true|false/);
            } else {
              cy.wrap($tab)
                .should('not.have.attr', 'aria-selected');
            }
          });
      });

    // Verify form fields have aria attributes
    cy.findByLabelText(/name/i)
      .should('have.attr', 'aria-required', 'true');

    cy.findByLabelText(/email/i)
      .should('have.attr', 'aria-required', 'true');

    cy.findByLabelText(/title/i)
      .should('have.attr', 'aria-required', 'true');

    cy.findByRole('radiogroup', { name: /gender/i })
      .should('have.attr', 'aria-labelledby', 'genderLegend');

    // Accessibility check for ARIA attributes
    cy.checkA11y();
  });

  it('Should ensure links have discernible names and appropriate attributes', () => {
    cy.findByRole('tab', { name: /^project information$/i })
      .click()

    cy.findByRole('link', { name: /official documentation/i })
      .should('have.attr', 'href', 'https://www.w3.org/WAI/fundamentals/accessibility-intro/')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
      .and('have.attr', 'aria-label', 'Visit official documentation for more details about Introduction to Web Accessibility');

    // Accessibility check for links
    cy.checkA11y();
  });
});
