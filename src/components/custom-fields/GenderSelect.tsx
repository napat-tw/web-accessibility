import React from 'react';

interface GenderSelectProps {
  gender: string;
  setGender: (gender: string) => void;
  errorMessage?: string;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ gender, setGender, errorMessage }) => {
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ]

  return (
    <fieldset className='form-group' aria-invalid={!!errorMessage}>
      <legend id='genderLegend'>Gender</legend>
      <div role='radiogroup' aria-label='Gender Options' className='radio-group'>
        {genderOptions.map((option, idx) => (
          <label key={`gender-${idx}`} htmlFor={`gender-${option.value}`}>
            <input
              id={`gender-${option.value}`}
              type='radio'
              name='gender'
              value={option.value}
              checked={gender === option.value}
              onChange={(e) => setGender(e.target.value)}
              // For custom control field should have
              // role='radio'
              // aria-checked={gender === option.value}
            />
            {option.label}
          </label>
        ))}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <small id='genderError' role='alert' aria-live='assertive' className='error-message'>
          {' ! '}{errorMessage}
        </small>
      )}
    </fieldset>
  );
};

export default GenderSelect;
