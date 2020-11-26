import React, { useState, useEffect } from 'react';
import './App.css';
import Sensores from './Components/Sensores';
import firebaseDb from "./firebase";
import NaveForm from './Components/NaveForm';
// import NaveForm from "./Components/NaveForm"

function App() {
let [naveObjets,setnaveObjects] = useState([]);

useEffect(()=> {
  firebaseDb.child(`naves/`).on('value', snapshot=> {
    let naves = [];
    snapshot.forEach(snap =>{
      naves.push(snap.val())
    });

      setnaveObjects(naves);
    
  })
}, [])

const [startApp, setStartApp] = useState(typeof naveObjets[0] !== "undefined" ? true : false)
const [indexNaves, addindexNaves] = useState(1);

  return (
    <div className="container-fluid">
        { !startApp ? 
          
          (
              <div className = "col-md-12 inicial">
                <h1>Bienvenido</h1>
                <h4>Haz click para iniciar</h4>
                <button type="button" className="btn btn-danger btnPlus"  onClick={() => {
                  setStartApp(true);}}>+</button>
              </div>
          ) : 
          
          (
              <div className = "col-md-12">
                  <Sensores key = {1} idNave = {1}/>
                  <br></br>
                  { indexNaves >= 2 ? <Sensores key = {2} idNave = {2}/> : <></>}
                  { indexNaves >= 3 ? <Sensores key = {3} idNave = {3}/> : <></>}
                  { indexNaves >= 4 ? <Sensores key = {4} idNave = {4}/> : <></>}
                  <button type="button" className="btn btn-danger btnPlus"  onClick={() => 
                  {
                    addindexNaves(indexNaves + 1);
                  }
                  
                  }>+</button>
                  <br></br>
                  <button type="button" className="btn btn-warning"  onClick={() => 
                  {
                    addindexNaves(indexNaves - 1);
                  }
                  
                  }>- Borrar</button>
                  <br></br>
                  <br></br>
                  
              </div>  
          )}
    </div>
  );
}

export default App;


