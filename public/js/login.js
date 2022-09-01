const loginBtn = document.querySelector('#login-btn')

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(username, password);
    if (username && password) {
      const payload = {
        username: username, 
        password: password }
        console.log(payload);
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
};


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
loginBtn.addEventListener('click', loginFormHandler);

// const signupFormHandler = async (event) => {
//     event.preventDefault();
  
//     const username = document.querySelector('#username-signup').value.trim();
//     const password = document.querySelector('#password-signup').value.trim();
  
//     if (username && password) {
//       const response = await fetch('/api/users/signup', {
//         method: 'POST',
//         body: JSON.stringify({ username, password }),
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert(response.statusText);
//       }
//     }
// };


// document
//   .querySelector('.signup-form')
//   .addEventListener('submit', signupFormHandler);

   