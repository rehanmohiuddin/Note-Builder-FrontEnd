
const API='http://192.168.0.9:8000/api/'

export const createNote = (userId, token, note) => {
    console.log(note)
    return fetch(`${API}/note/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(note)
    })
      .then(response => {
          console.log(response)
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const deleteNote = (noteId, userId,token) => {
    return fetch(`${API}/note/${noteId}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
          console.log(response)
   
      })
      .catch(err => console.log(err));
  };

  export const UpdateNote = (noteId, userId,token,updateNote) => {
    return fetch(`${API}/note/${noteId}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify(updateNote)
    })
      .then(response => {
          console.log('Res',response.json())
   
      })
      .catch(err => console.log(err));
  };