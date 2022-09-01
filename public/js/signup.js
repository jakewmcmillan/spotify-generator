const signUpBtn = document.querySelector('#signup-btn');

const signupFormHandler = async function(event) {
    event.preventDefault();
  
 
    const username = document.querySelector('#username-input-signup').value.trim();
    const password = document.querySelector('#password-input-signup').value.trim();
    console.log(username);
    console.log(password);
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        username, password
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
      alert('You are now signed up!')
    } else {
      alert('Failed to sign up');
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
signUpBtn.addEventListener('click', signupFormHandler);