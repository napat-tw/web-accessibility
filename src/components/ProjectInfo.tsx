import React from 'react';

const ProjectInfo: React.FC = () => {
  return (
    <section 
      aria-labelledby='project-info-title' 
      role='document' 
      className='project-info'
    >
      <h1 id='project-info-title'>Project Information</h1>
      <p>
        This project is a demonstration of web accessibility using React. It includes a form that captures
        user information with appropriate ARIA roles and validation feedback for users of assistive technologies.
      </p>

      <h2 id='key-features'>Key Features</h2>
      <ul aria-labelledby='key-features'>
        <li>Semantic HTML and proper use of ARIA roles</li>
        <li>Form validation with live error messages for accessibility</li>
        <li>Support for screen readers</li>
        <li>Responsive design for various screen sizes</li>
        <li>Lazy loading of modal components</li>
        <li>Accessibility testing using Jest and Cypress</li>
      </ul>

      <img 
        src='https://www.searchenginejournal.com/wp-content/uploads/2020/08/9-ways-you-can-make-your-website-more-accessible-5f3f5d3bd7a34.png' 
        alt='Sample description' 
        className='project-image' 
      />

      <a 
        href='https://www.w3.org/WAI/fundamentals/accessibility-intro/' 
        target='_blank' 
        rel='noopener noreferrer'
        aria-label='Visit official documentation for more details about Introduction to Web Accessibility'
      >
        Official Documentation
      </a>
    </section>
  );
};

export default ProjectInfo;
