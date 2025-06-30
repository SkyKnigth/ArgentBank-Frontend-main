export async function loginUser(email, password) {
  const response = await fetch('http://localhost:3001/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data.body.token;
}

export async function getUserProfile(token) {
  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du profil');
  }

  const data = await response.json();
  return data.body;
}

export async function updateUserName(token, userName) {
  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({ userName }),
  });

  if (!response.ok) {
    throw new Error("Échec de la mise à jour du nom d’utilisateur");
  }

  const data = await response.json();
  return data.body;
}