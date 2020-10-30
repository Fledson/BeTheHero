import React, {useEffect, useState} from 'react'
import './component.css'

export function Input(props){
  return (
    <div className="input-teste">
      {props.icon}
      <input type="text" placeholder="teste"/>
    </div>
  )
}

export function Botao(props){
  const [nome, setNome] = useState(props.carro)
  let sobrenome = "Tavares"  

    useEffect(() => {
      setTimeout(() => {
        setNome(Math.floor(Math.random() * 1000))
        sobrenome = "SOUSA"
      }, 2000);
    },[nome])

  return (
  <button type="reset">{nome}{sobrenome}</button>
  )
}