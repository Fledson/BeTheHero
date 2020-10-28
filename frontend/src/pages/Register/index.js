import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register(){

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  // usar navegação se ser pelo link, usando navegação por função
  const history = useHistory() 

  // função que vai registrar os casos
  async function handleRegistre(e){
    // linha abaixo usa a função chamada para não recarregar a pagina ao chamar o submit
    e.preventDefault();

    // declarando uma variavel com as informações dos inputs
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    try {
      // passsando informações para o backend via http post e armazenando no response o retorno se deu certo ou não
      const response = await api.post('ongs', data)
      alert(`Seu ID de acessp: ${response.data.id}`)
      history.push('/')
    }catch (err) {
      alert('Erro no cadastro, tente novamente!')
    }
    


  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para o Logon  
          </Link>
        </section>
        <form onSubmit={handleRegistre}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)} //pegando o valor do input e armazenando na varial de estadp
          />
          <input
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)} //pegando o valor do input e armazenando na varial de estado
           />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input 
              placeholder="UF" 
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}