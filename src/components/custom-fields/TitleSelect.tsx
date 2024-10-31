import React from 'react';

interface TitleSelectProps {
  title: string;
  setTitle: (title: string) => void;
  errorMessage?: string;
}

const TitleSelect: React.FC<TitleSelectProps> = ({ title, setTitle, errorMessage }) => {
  const titleOptions = [
    { label: 'Select a title', value: '' },
    { label: 'Mr.', value: 'mr' },
    { label: 'Ms.', value: 'ms' },
    { label: 'Mrs.', value: 'mrs' }
  ]

  return (
    <div role='group' aria-label='Title Field' className='form-group'>
      <label htmlFor='title'>Title:</label>
      <select
        id='title'
        value={title}
        aria-label='Title Options'
        aria-describedby='titleHelp'
        aria-invalid={!!errorMessage}
        aria-required='true'
        required
        onChange={(e) => setTitle(e.target.value)}
      >
        {/*
          For custom control field should have

          For Dropdown box
          role='button'
          aria-haspopup='listbox'
          aria-expanded={isOpen}

          For <ul>
          role='listbox'

          For <li>
          and role='option'
          aria-selected={title === option.value}
        */}
        {titleOptions.map((option, idx) => (
          <option key={`title-${idx}`} value={option.value}>{option.label}</option>
        ))}
      </select>
      <small id='titleHelp' role='note' className='form-text'>
        Please enter your title.
      </small>

      {/* Error Message */}
      {errorMessage && (
        <small id='titleError' role='alert' aria-live='assertive' className='error-message'>
          {' ! '}{errorMessage}
        </small>
      )}
    </div>
  );
};

export default TitleSelect;
