import React, { useState } from 'react'
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'
import api from '../../services/api'

export default function NewIncident() {

    const history = useHistory()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const ongid = localStorage.getItem('ongId')

    async function registrarCaso(e){
      //Evitar atualização de tela ao enviar formulario
      e.preventDefault()

      const dadosCaso = {
        title,
        description,
        value,
      }
      
      try {
        api.post('casos', dadosCaso, {
          headers: {
            Authorization: ongid,
          }
        })
        alert("Caso cadastrado com sucesso!")
        
        history.push("/profile")
      } catch (error) {
        alert("Erro ao cadastrar caso!")
      }


    }

    return(
      <div className="new-incident-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero"/>

            <h1>Cadastrar novo caso</h1>
            <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

            <Link className="back-link" to="/profile">
              <FiArrowLeft size={16} color="#E02041"/>
              Voltar para a home  
            </Link>
          </section>
          <form onSubmit={registrarCaso}>

            <input 
              placeholder="Titulo do caso"
              value={title}
              onChange = {e => {setTitle(e.target.value)}}
            />

            <textarea
              placeholder="Descrição"
              value={description}
              onChange = {e => {setDescription(e.target.value)}}
            />

            <input 
              placeholder="Valor em reais"
              value={value}
              onChange={e => {setValue(e.target.value)}}  
            />

            <button className="button" type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    )
}