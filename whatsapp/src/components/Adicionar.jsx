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

  function excluirContato(IndexParaExcluir){
    setContatos(contatos.filter((_, index) => index !== IndexParaExcluir))
  }

  function enviarMensagem(numero){
    const abrir = (`https://wa.me/${numero}`)
    if (abrir) {
      window.open(abrir, "_blank")
    }
  }

  return (
    <div className={styles.adicionar}>
      <h1>Adicionar contato</h1>
    <div className={styles.inputs}>
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
        {/* .length usado para gerar a contagem de contatos salvos no array */}
      <h3>Seus contatos ({contatos.length})</h3>
    </div>
      


        <div className={styles.adicionarcontato}>
          {/* aqui, o react pega o contatos do usestate e para cada contato adicionado que ele percorre com o map é criada uma div específica para ele */}
          {contatos.map((c, index) => (
            // o key é uma funcionalidade do react para associar cada elemento da tela corresponde a cada item de uma lista, nesse caso o contato e sua div
            <div key={index} className={styles.contato}>
              <div>
                <p className={styles.nomeContato}>{c.nome}</p>
                <p>{c.numero}</p>
              </div>
              <div className={styles.alinhamento}>
                <button onClick={() => enviarMensagem(c.numero)}><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="#000000" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-4.586l-2.707 2.707a1 1 0 0 1-1.414 0L8.586 19H4a2 2 0 0 1-2-2V6zm18 0H4v11h5a1 1 0 0 1 .707.293L12 19.586l2.293-2.293A1 1 0 0 1 15 17h5V6zM6 9.5a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1z"/></svg></button>
                <button><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 21 21"><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M17 4a2.121 2.121 0 0 1 0 3l-9.5 9.5l-4 1l1-3.944l9.504-9.552a2.116 2.116 0 0 1 2.864-.125zm-1.5 2.5l1 1"/></svg></button>
                <button onClick={() => excluirContato(index)}><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 21 21"><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M5.5 4.5h10v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2zm5-2a2 2 0 0 1 1.995 1.85l.005.15h-4a2 2 0 0 1 2-2zm-7 2h14m-9 3v8m4-8v8"/></svg></button>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
