import React, {useState, useEffect} from "react";
import SensorForm from "./SensorForm"
import firebaseDb from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import imagen from '../imagenes/minecraft.gif'; 
import PopChart from "./PopChart"

const Sensores = ({ idNave }) => {

const [printDataH,setprintDataH] = useState([]);
const [printDataT,setprintDataT] = useState([]);
const [printDataI,setprintDataI] = useState([]);


let [sensoresObjets,setsensoresObjects] = useState(0);
let [CurrentId,setCurrentId] = useState("");

useEffect(()=> {
  
  firebaseDb.child(`naves/nave${idNave}/sensores`).on('value', snapshot=> {
    if (snapshot.val()!=null){
      setsensoresObjects({
        ...snapshot.val()
      })

      if(snapshot.val().Humedad.datoSensor ){

      }

        setprintDataH(printDataH.push(snapshot.val().Humedad.datoSensor))
        setprintDataI(printDataI.push(snapshot.val()[ 'Indice de calor' ].datoSensor))
        setprintDataT(printDataT.push(snapshot.val().Temperatura.datoSensor))
      
    }else{
      setsensoresObjects({})
    }
  })
},[])

  const addorEdit = obj =>{
    if(obj.tipoSensor == ""){obj.tipoSensor = "Humedad"}
    
    if(CurrentId == "" && obj.tipoSensor)
      firebaseDb.child(`naves/nave${idNave}/sensores/${obj.tipoSensor}`).update(
        obj,
          err => {
            if(err)
            console.log('error')
            else
            setCurrentId("")
          }
      )
    else
    firebaseDb.child(`naves/nave${idNave}/sensores/${CurrentId}`).set(
      obj,
        err => {
          if(err)
          console.log('error')
          else
          setCurrentId("")
        }
    )
  }

  const onDelete = key=>{
    if(window.confirm('Estas seguro que deseas borrar este sensor?')){
      firebaseDb.child(`naves/nave${idNave}/sensores/${key}`).remove(
          err => {
            if(err)
            console.log('error')
            else
            setCurrentId("")
          }
      )
    }
  }


  return(
  <div className = "container-fluid">
  <div className="jumbotron jumbotron-fluid jumbo-container container-fluid">
  <h1 className="display-4 text-left font-weight-bold">Nave{idNave}</h1>
      <p className = "text-right" ></p>
      <img className = "imagen display-4 text-right" src={imagen} alt="Logo"/>;
  </div>

    <div className = "row mainform">
      <div className = "col-sm-4">
            <SensorForm {...({addorEdit,CurrentId,sensoresObjets})}/>
      </div>
        <div className="col-sm-8">
          <table className = "table table-borderless table-stripped">
            <thead className = "thead-light">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Fecha Creado</th>
                <th>Limites</th>
                <th>Ultimo Valor</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
                {
                  Object.keys(sensoresObjets).map(ids=>{
                    return <tr key = {ids}>
                      <td>{sensoresObjets[ids].id}</td>
                      <td>{sensoresObjets[ids].nombresensor}</td>
                      <td>{sensoresObjets[ids].tipoSensor}</td>
                      <td>{sensoresObjets[ids].dateCreated}</td>
                      <td>{sensoresObjets[ids].valorMin} - {sensoresObjets[ids].valorMax}</td>
                      <td>{sensoresObjets[ids].datoSensor}</td>
                      
                      <td>
                        <a className = "btn text-primary" onClick = {() => {setCurrentId(ids)}}>
                            <FontAwesomeIcon icon = {faPencilAlt}/>
                        </a>
                        <a className = "btn text-primary" onClick = {()=>{onDelete(ids)}}>
                            <i className = "">X</i>
                        </a>
                      </td>
                    </tr>
                  })
                }
            </tbody>
          </table>
        </div>
    </div>
    <br></br><br></br><br></br><br></br>
    <div className = "container-fluid">
      <div className = "col-md-12 container">
        <PopChart dataH = {printDataH} dataI = {printDataI} dataT = {printDataT}/></div>
    </div>
    </div>
  );
}

export default Sensores;
