import React, { useState, lazy, Suspense } from 'react';
import TitleSelect from './custom-fields/TitleSelect.tsx';
import GenderSelect from './custom-fields/GenderSelect.tsx';

const HelpModal = lazy(() => import('./HelpModal.tsx'));

const Form: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const validateForm = (): boolean => {
    let error = '';
    let valid = true;

    if (title.trim() === '') {
      error = 'Title is required.';
      valid = false;
    } else if (name.trim() === '') {
      error = 'Name is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error = 'Email is required, Please enter a valid email address.';
      valid = false;
    } else if (gender.trim() === '') {
      error = 'Gender is required.';
      valid = false;
    }

    setErrorMessage(error);

    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setSuccessMessage('Form submitted successfully!');
      setErrorMessage('');

      // Reset form fields after submission
      setTitle('');
      setName('');
      setEmail('');
      setGender('male');
    } else {
      setSuccessMessage('');
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <section aria-labelledby='form-title' className='form-section'>
      <h1 id='form-title'>Register Form</h1>
      <form onSubmit={handleSubmit} noValidate className='user-form'>
        <fieldset>
          <legend id='personalInfoLegend'>Personal Information</legend>

          {/* Title Selection Field */}
          <TitleSelect
            title={title}
            setTitle={setTitle}
            errorMessage={errorMessage.includes('Title') ? errorMessage : undefined}
          />

          {/* Name Field */}
          <div className='form-group' aria-labelledby='personalInfoLegend'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby='nameHelp'
              aria-invalid={errorMessage.includes('Name') ? 'true' : 'false'}
              aria-required='true'
              required
            />
            <small id='nameHelp' className='form-text'>
              Please enter your full name.
            </small>

            {/* Error Message */}
            {errorMessage.includes('Name') && (
              <small id='nameError' role='alert' aria-live='assertive' className='error-message'>
                {' '}{errorMessage}
              </small>
            )}
          </div>

          {/* Email Field */}
          <div className='form-group' aria-labelledby='personalInfoLegend'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby='emailHelpHidden'
              aria-invalid={errorMessage.includes('Email') ? 'true' : 'false'}
              aria-required='true'
              required
            />
            {/* <small id='emailHelp' className='form-text'>
              Please enter a valid email address.
            </small> */}
            <span id="emailHelpHidden" className="visually-hidden">
              This is a custom message that you can map to your variable and format as text that is not visible on the screen.
            </span>

            {/* Error Message */}
            {errorMessage.includes('email') && (
              <small id='emailError' role='alert' aria-live='assertive' className='error-message'>
                {' '}{errorMessage}
              </small>
            )}
          </div>

          {/* Gender Selection Field */}
          <GenderSelect 
            gender={gender} 
            setGender={setGender} 
            errorMessage={errorMessage.includes('Gender') ? errorMessage : undefined} 
          />

          {/* Success Message Live Region */}
          {successMessage && (
            <div id='formSuccess' aria-live='polite' role='alert' className='success-message'>
              {successMessage}
            </div>
          )}

          {/* Help and Submit Buttons */}
          <div className='button-group'>
            <button
              type='button'
              onClick={handleOpenModal}
              aria-haspopup='dialog'
              aria-expanded={isModalOpen}
              className='btn btn-help'
            >
              Help
            </button>

            <button
              type='submit'
              aria-disabled={!(title && name && email && gender)}
              className='btn btn-submit'
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>

      {/* Modal for Help Information */}
      {isModalOpen && (
        <Suspense fallback={<div className='modal-loading'>Loading...</div>}>
          <HelpModal handleClose={handleCloseModal} />
        </Suspense>
      )}
    </section>
  );
};

export default Form;
