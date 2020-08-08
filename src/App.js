import React, { useEffect, useState, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './css/Nav.css'
import NavBar from './NavBar';
import { getUser } from './Auth/helper';
import Expand from 'react-expand-animated';
import { Redirect } from 'react-router-dom';
import "./css/Form.css"
import { MDBContainer } from 'mdbreact';
import { createNote, deleteNote,UpdateNote } from './coreAPI';

let parsedData,noteID;
function App(props) {

  const [notes,setNotes] = useState([])
  const [expand,setExpand] = useState(false);
  const[user,setUser] = useState({
    userId:'',
    token:''
  })
  const [updateNote,setUpdateNote]=useState({
    title:'',
    description:''
  })
  const [isUpdate,setisUpdate]=useState(false)

  const [note,setNote] = useState({
    title:'',
    description:'',
    userId:''
  })
  const toggle = () => {
    setExpand(!expand)
  };

  useEffect(()=>{
   // console.log(localStorage.getItem('jwt'))
    const data=localStorage.getItem('jwt')
    parsedData=JSON.parse(data)
    //console.log(parsedData.user._id)
   // alert(data)
    if(data===null){
      props.history.push("/signin");
    }
    else {
      getUser(parsedData.user._id,parsedData.token)
      .then(Notes=> {
        console.log(Notes)
        setNotes(Notes)
        setNote({...note,userId:parsedData.user._id})
        setUser({...user,userId:parsedData.user._id,token:parsedData.token})
      })
    }
 

  },[])
  const deleteNOTE=()=>{
    deleteNote(noteID,parsedData.user._id,parsedData.token)
    .then(()=>{
      getUser(user.userId,user.token)
      .then(Notes=> {
        console.log(Notes)
        setNotes(Notes)
      })
    })
}

const updateNOTE=()=>{
  UpdateNote(noteID,parsedData.user._id,parsedData.token,updateNote)
  .then(()=>{
    getUser(user.userId,user.token)
    .then(Notes=> {
      console.log(Notes)
      setNotes(Notes)
      setUpdateNote({...updateNote,title:'',description:''})
      setNote({...note,title:'',description:''})
      setExpand(false)
    })
  })
}
  const handleChange = name => event => {
    if(updateNote.title===''){
      setNote({ ...note,[name]:event.target.value});
    }
    else{
      setUpdateNote({ ...updateNote,[name]:event.target.value});
    }
    console.log(updateNote)
  };

  const onSubmit = event => {
    event.preventDefault();
   console.log(user.userId,user.token,note)
   if(updateNote.title===''){
    createNote(user.userId,user.token,note)
    .then(response=>{
     getUser(user.userId,user.token)
     .then(Notes=> {
       console.log(Notes)
       setNotes(Notes)
       setNote({...note,title:'',description:''})
       setExpand(false)
     })
    })
   }
   else{
     
    updateNOTE()
   }
  
  };

  return (
    <div>
    <NavBar />
 
     <div className="App">

        <h3 onClick={toggle}>Add a Note Here...</h3>
        <Expand open={expand}>
          <div style={{ width: 'auto', height: '400px', color: 'red',display:"flex",justifyContent:'center' }}>

          <MDBContainer>
        <form style={{backgroundColor:'#333945'}} className="box">
          
         <div className="row">
        <div className="col-md-3">
        <input 
              onChange={handleChange("title")}
              className="form-control"
              placeholder="Title"
              defaultValue={updateNote.title}
              type="text" />
        </div>
        <div className="col-md-9">
        <textarea  
      onChange={handleChange("description")}
      className="form-control"
      type="text"
      defaultValue={updateNote.description}
      placeholder='Description'
      cols="10"
      rows='10'
      />
   
        </div>
         </div>
          {
            updateNote.title===''?  <div>
              <input type="submit" onClick={onSubmit} name="" value="Create" />
           
            </div> :
            <input type="submit" onClick={onSubmit} name="" value="Update" />
          }
        </form>
        </MDBContainer>

          </div>
        </Expand>
      <div className="row">
      {
        notes.map((note,index)=>{
          return (
            <div className="column">
                <div className="container h">

<div  onClick="" className="card1">
    <div  className="face face1">
        <div className="content">
            <h3>{note.title}</h3>
        </div>
         </div>
        <div className="face face2">
            <div className="content">
                <p>{note.description}</p>
                <a  onClick={()=>{
                    noteID=note._id
                    setUpdateNote({...updateNote,title:note.title,description:note.description})
                    toggle()
                    
                }} >Update</a>
                <a onClick={()=>{
                    noteID=note._id
                    deleteNOTE()
                }} href="#" >Delete</a>
            </div>
        </div>
    </div>


</div>
              </div>
          )
        })
      }
      </div>
     </div>


    </div>
  );
}

export default App;
