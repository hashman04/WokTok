document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginform');
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const loginData = { username, password };
      const response = await axios.post('https://academia-s-2.azurewebsites.net//login', loginData);
      const authToken = response.data.token;

      // Second request with the authentication token
      const courseData = null;

      const courseResponse = await axios.post('https://academia-s-2.azurewebsites.net//course-user', courseData, {
        headers: {
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Content-Length': '0',
          'Origin': 'https://a.srmcheck.me',
          'Pragma': 'no-cache',
          'Referer': 'https://a.srmcheck.me/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'cross-site',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'content-type': 'application/json',
          'x-access-token': authToken
        }
      });

      console.log(courseResponse.data);
      window.location.href = 'select';

      console.log('Login successful:', response.data);
      // Redirect to a success page or perform other actions upon successful login
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  });
});