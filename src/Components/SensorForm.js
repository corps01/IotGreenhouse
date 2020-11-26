import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilSquare, faHome, faUserCircle, faThermometerThreeQuarters, faCalendar, faMinusCircle ,faPlusCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const SensorForm = (props) => {
const initialFieldValues = {
  id: (new Date().getTime() + Math.floor(Math.random() * 1000)),
  nombresensor: "",
  tipoSensor: "",
  dateCreated: new Date(),
  datoSensor: "",
  valorMin: "", 
  mensajeMin: "",
  valorMax: "",
  mensajeMax: ""
}

let [values, setValues] = useState(initialFieldValues);

useEffect(()=>{
  if(props.CurrentId=="")
  setValues({
    ...initialFieldValues
    })
    else
    setValues({
      ...props.sensoresObjets[props.CurrentId]
    })
},[props.CurrentId, props.sensoresObjets])

const handleInputChange = e => {
  let {name, value} = e.target
  setValues({
    ...values,
    [name]: value
  })
}

const handleFormSubmit = e =>{
  e.preventDefault();
  props.addorEdit(values)
}

  return(
      <form autoComplete = "off" onSubmit = {handleFormSubmit}>
        <h4>Registrar</h4>
        <div className = "form-group input-group">
          <div className = "input-group-pretend">
            <div className = "input-group-text">
            <FontAwesomeIcon color="black" icon= {faUserCircle} size="lg"/>
            </div>
          </div>
          <input className = "form-control" placeholder = "nombre del sensor" name = "nombresensor"
            value = {values.nombresensor}
            onChange = {handleInputChange}
            >
            
          </input>
        </div>

      <div className = "form-row">

        <div className = "form-group input-group col-md-6">
          <div className = "input-group-pretend">
            <div className = "input-group-text">
              <FontAwesomeIcon color="black" icon= {faThermometerThreeQuarters} size="lg"/>
            </div>
          </div>
          <select className = "form-control selectpicker" placeholder = "tipo" name = "tipoSensor"
            value = {values.tipoSensor}
            onChange = {handleInputChange}>
              <option>Humedad</option>
              <option>Temperatura</option>
              <option>Indice de calor</option>
          </select>
        </div>
        
        <div className = "form-group input-group col-md-6">
          <div className = "input-group-pretend">
            <div className = "input-group-text">
            <FontAwesomeIcon color="black" icon= {faCalendar} size="lg"/>
            </div>
          </div>
          <input className = "form-control" placeholder = "fecha creado" name = "dateCreated"
            value = {values.dateCreated}
            onChange = {handleInputChange}
            disabled
            >
          </input>
        </div>

        </div>
        <br></br>
        <h4>Parametros</h4>

        
        <div className = "form-row">

        <div className = "form-group input-group col-md-6">
          <div className = "input-group-pretend">
            <div className = "input-group-text">
            <FontAwesomeIcon color="black" icon= {faMinusCircle} size="lg"/>
            </div>
          </div>
          <input className = "form-control" placeholder = "valor minimo" name = "valorMin"
            value = {values.valorMin}
            onChange = {handleInputChange}>
          </input>
        </div>
        
        <div className = "form-group input-group col-md-6">
          <div className = "input-group-pretend">
            <div className = "input-group-text">
            <FontAwesomeIcon color="black" icon= {faPlusCircle} size="lg"/>
            </div>
          </div>
          <input className = "form-control" placeholder = "valor maximo" name = "valorMax"
            value = {values.valorMax}
            onChange = {handleInputChange} >
          </input>
        </div>

        </div>

        <div className = "form-group input-group">
          <div className = "input-group-pretend">
            <div className = "input-group-text">
            <FontAwesomeIcon color="blue" icon= {faExclamationTriangle} size="lg"/>
            </div>
          </div>
          <input className = "form-control" placeholder = "mensajemin" name = "mensajeMin"
            value = {values.mensajeMin}
            onChange = {handleInputChange}
            >
          </input>
        </div>

        <div className = "form-group input-group">
          <div className = "input-group-pretend">
            <div className = "input-group-text">
            <FontAwesomeIcon color="red" icon= {faExclamationTriangle} size="lg"/>
            </div>
          </div>
          <input className = "form-control" placeholder = "mensaje max" name = "mensajeMax"
            value = {values.mensajeMax}
            onChange = {handleInputChange}
            >
          </input>
        </div>
        <div className = "form-group">
            <input type="submit" value = {props.CurrentId==""?"Registrar":"Actualizar"} className = "btn btn-primary btn-block"></input>
        </div>
      </form>
  );
}

export default SensorForm;
