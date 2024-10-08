import React from 'react';

interface NavbarProps {
  activeTab: 'form' | 'projectInfo';
  setActiveTab: (tab: 'form' | 'projectInfo') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, tab: 'form' | 'projectInfo') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tab);
    }
  };

  return (
    <nav aria-label='Main Navigation' className='navbar'>
      <ul role='tablist' className='nav-list'>
        <li
          role='tab'
          aria-selected={activeTab === 'form'}
          tabIndex={0}
          onClick={() => setActiveTab('form')}
          onKeyDown={(e) => handleKeyDown(e, 'form')}
          className={`nav-item ${activeTab === 'form' ? 'active' : ''}`}
        >
          Form
        </li>
        <li
          role='tab'
          aria-selected={activeTab === 'projectInfo'}
          tabIndex={0}
          onClick={() => setActiveTab('projectInfo')}
          onKeyDown={(e) => handleKeyDown(e, 'projectInfo')}
          className={`nav-item ${activeTab === 'projectInfo' ? 'active' : ''}`}
        >
          Project Information
        </li>

        {/* Non Allow for Screen Reader */}
        <li
          role='tab'
          tabIndex={-1}
          className='nav-item'
        >
          Not Available
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
