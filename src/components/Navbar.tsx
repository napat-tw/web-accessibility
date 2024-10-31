import React from 'react';

interface NavbarProps {
  activeTab: 'form' | 'projectInfo';
  setActiveTab: (tab: 'form' | 'projectInfo') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, tab: 'form' | 'projectInfo') => {
    // https://www.w3.org/TR/uievents-key/#named-key-attribute-values
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tab);
    }
  };

  return (
    <nav aria-label='Main Navigation' className='navbar'>
      <ul role='tablist' aria-label='Pages' className='nav-list'>
        <li
          role='tab'
          aria-label='Form Page'
          aria-selected={activeTab === 'form'}
          // aria-setsize={3}
          // aria-posinset={1}
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
          // aria-setsize={3}
          // aria-posinset={2}
          tabIndex={0}
          onClick={() => setActiveTab('projectInfo')}
          onKeyDown={(e) => handleKeyDown(e, 'projectInfo')}
          className={`nav-item ${activeTab === 'projectInfo' ? 'active' : ''}`}
        >
          Project Information
        </li>

        {/* Not Allow for Screen Reader */}
        <li
          role='tab'
          // aria-setsize={3}
          // aria-posinset={3}
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
