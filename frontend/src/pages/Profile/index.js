import React, { useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/logo.svg'

export default function Profile() {

  const history = useHistory()
  const [incidents, setIncidents] = useState([])
  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')
  

  // useEffect serve para disparar uma função em um momento (exemplo: quando a pagina inicia)]
  // primeiro parametro função que quer que seja carregada 
  // segundo parametro um array, quando a função vai ser executada dentro do array vai os items monitorados, toda
  // vez que forem mudados a função será chamada, se deixar vazio ele chama apenas uma vez
  useEffect( () => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data)
    }).catch(
      console.log('deu ruim')
    )
  }, [ongId])

  //DELETAR CASOS
  async function deletarCaso(id){
    try {
      await api.delete(`casos/${id}`, {
        headers: {
          Authorization: ongId,
        }
      })

      //FAZENDO VARREDURA NO ARRAY DE INCIDENT E REMOVENDO ELE DA LISTA
      //VAI DEIXAR APENAS OS ITENS QUE TEM O ID DIFERENTE DO QUE FOI DELETADO
        setIncidents(incidents.filter(incident => incident.id !== id))
    }catch (err) {
      alert("Erro ao deletar caso, tente novamente")
    }
  }

  //Deslogando da aplicação
  function logout(){
    localStorage.clear() //Limpando o localStorage

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName} </span>

        {/* Botão para cadastrar novo caso */}
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>

        {/* Botão de Logout */}
        <button type="button" onClick={logout}>
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

            <button type="button" onClick={() => deletarCaso(incident.id)}>
              <FiTrash2 size={20} color="#A8A8B3"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}