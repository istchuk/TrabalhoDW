import styles from "./Adicionar.module.css"
import { useState } from "react"

export default function Adicionar() {
  const [nome, setNome] = useState("")
  const [numero, setNumero] = useState("")
  //usado para criar uma array com os contatos
  const [contatos, setContatos] = useState([])

  //função chamada toda vez que o input muda
  function handleChangeNome(event) {
    setNome(event.target.value)
  }
  //função chamada toda vez que o input muda
  function handleChangeNumero(event) {
    setNumero(event.target.value)
  }

  function adicionarContato() {
    //verifica se ha um nome e um numero
    if (nome && numero) {
      //cria uma copia do array contatos, e depois adiciona o novo contato
      setContatos([...contatos, { nome, numero }])
      //limpa os inputs
      setNome("")
      setNumero("")
    }
  }

  return (
    <div className={styles.adicionar}>
      <h1>Adicionar contato</h1>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={handleChangeNome}
      />

      <input
        type="number"
        placeholder="Número Ex:(xx)9..."
        value={numero}
        onChange={handleChangeNumero}
      />

      <button className={styles.btnAdicionar} onClick={adicionarContato}>
        Adicionar
      </button>

        <div className={styles.adicionarcontato}>
          {/* .length usado para gerar a contagem de contatos salvos no array */}
          <h3>Seus contatos ({contatos.length})</h3>
          {/* aqui, o react pega o contatos do usestate e para cada contato adicionado que ele percorre com o map é criada uma div específica para ele */}
          {contatos.map((c, index) => (
            // o key é uma funcionalidade do react para associar cada elemento da tela corresponde a cada item de uma lista, nesse caso o contato e sua div
            <div key={index} className={styles.contato}>
              <div>
                <p>{c.nome}</p>
                <p>{c.numero}</p>
              </div>
              <div className={styles.alinhamento}>
                <button>Mensagem</button>
                <button>Editar</button>
                <button>Excluir</button>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
