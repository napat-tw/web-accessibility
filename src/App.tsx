import React, { useState } from 'react';
import Form from './components/Form.tsx';
import Navbar from './components/Navbar.tsx';
import ProjectInfo from './components/ProjectInfo.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'projectInfo'>('form');

  return (
    <div className='app-container'>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {activeTab === 'form' ? <Form /> : <ProjectInfo />}
      </main>
    </div>
  );
};

export default App;
