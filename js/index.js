const form = document.querySelector('#github-form');
const search = document.querySelector('#search');
const userList = document.querySelector('#user-list');
const reposList = document.querySelector('#repos-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = search.value.trim();
  
  if (query) {
    // lets Make a request to the GitHub User Search Endpoint
    fetch(`https://api.github.com/search/users?q=${query}`)
      .then(response => response.json())
      .then(data => {
        // user information on the page
        userList.innerHTML = '';
        data.items.forEach(user => {
          const li = document.createElement('li');
          li.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" />
            <p><a href="${user.html_url}" target="_blank">${user.login}</a></p>
          `;
          userList.appendChild(li);
        });
      });
  }
});

userList.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    const username = e.target.textContent.toLowerCase();
    
    // Make a request to the GitHub User Repos Endpoint
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        // Display the repository information on the page
        reposList.innerHTML = '';
        data.forEach(repo => {
          const li = document.createElement('li');
          li.innerHTML = `
            <p><a href="${repo.html_url}" target="_blank">${repo.name}</a></p>
          `;
          reposList.appendChild(li);
        });
      });
  }
});