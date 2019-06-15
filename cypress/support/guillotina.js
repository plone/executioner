const baseUrl = 'http://localhost:8081';
export function setupGuillotina() {
  const headers = {
    Authorization: 'Basic cm9vdDpyb290',
    'Content-Type': 'application/json',
  };
  const api_url = baseUrl + '/db';

  /*cy.request({
    method: 'POST',
    url: api_url,
    headers,
    body: { '@type': 'Container', id: 'container' },
  }).then(response => console.log('container created'));

  /*cy.request({
    method: 'POST',
    url: `${api_url}/container/@addons`,
    headers,
    body: { id: 'cms' },
  }).then(response => console.log('cms add-on installed'));

  cy.request({
    method: 'POST',
    url: `${api_url}/container/@addons`,
    headers,
    body: { id: 'dbusers' },
  }).then(response => console.log('dbusers add-on installed'));*/

  /*cy.request({
    method: 'POST',
    url: `${api_url}/container/users`,
    headers,
    body: {
      '@type': 'User',
      username: 'admin',
      email: 'foo@bar.com',
      password: 'secret',
    },
  }).then(response => console.log('default user created'));

  cy.request({
    method: 'POST',
    url: `${api_url}/container/@sharing`,
    headers,
    body: {
      roleperm: [
        {
          setting: 'AllowSingle',
          role: 'guillotina.Anonymous',
          permission: 'guillotina.ViewContent',
        },
        {
          setting: 'AllowSingle',
          role: 'guillotina.Anonymous',
          permission: 'guillotina.AccessContent',
        },
      ],
      prinrole: [
        {
          setting: 'Allow',
          role: 'guillotina.Manager',
          principal: 'admin',
        },
        {
          setting: 'Allow',
          role: 'guillotina.Owner',
          principal: 'admin',
        },
      ],
    },
  }).then(response => console.log('permissions for default user set'));*/
}

export function tearDownGuillotina() {
  const headers = {
    Authorization: 'Basic cm9vdDpyb290',
    'Content-Type': 'application/json',
  };
  const api_url = 'http://localhost:8081/db';

  cy.request({
    method: 'DELETE',
    url: `${api_url}/cycontainer`,
    headers,
  }).then(response => console.log('container deleted'));
}

export function deleteGuillotinaContainer() {
  const headers = {
    Authorization: 'Basic cm9vdDpyb290',
    'Content-Type': 'application/json',
  };
  const api_url = baseUrl + '/db/cycontainer';

  cy.request({
    method: 'DELETE',
    url: `${api_url}`,
    headers,
  }).then(response => console.log('container deleted'));
}

export function createGuillotinaContainer() {
  const headers = {
    Authorization: 'Basic cm9vdDpyb290',
    'Content-Type': 'application/json',
  };
  const api_url = baseUrl +'/db';

  cy.request({
      method: 'POST',
      url: api_url,
      headers,
      body: { '@type': 'Container', id: 'cycontainer' },
    }).then(response => console.log('container created'));
}
