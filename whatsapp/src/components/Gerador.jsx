import styles from "./Gerador.module.css"
import { useState } from "react"

export default function Gerador() {
  const [numero, setNumero] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [link, setLink] = useState("")

  function gerarLink() {
    if (!numero) {
      return alert("Digite um número")
      setMensagem("")
    }
    else {
      const quantidade = numero.toString()
      if(numero == quantidade && quantidade.length == 11){
        // essa linha verifica se há uma mensagem digitada, se sim ele vai codificar a mensagem e adicionar na url, se não houver, ele só gera a url com o número
      const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : ""
      setLink(`https://wa.me/${numero}${texto}`)
      }
      else{
        alert("digite um numero válido")
        setNumero("")
        setMensagem("")
      }
      
    }
  }

  function abrirWhatsapp() {
    if (link) {
      window.open(link, "_blank")
    }
  }


  return (
    <div className={styles.gerador}>
      <h1>Gerador de Links</h1>
      {/* gabriel, comenta isso aqui por favor */}
      <form onSubmit={(e) => { e.preventDefault(); gerarLink(); }}>
        <div>
          <label htmlFor="numero">Número do Whatsapp</label>
          <input
            type="tel"
            id="numero"
            placeholder="Digite um número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)} /></div>

        <div>
          <label htmlFor="mensagem">Mensagem (opcional)</label>
          <input
            type="text"
            id="mensagem"
            onChange={(e) => setMensagem(e.target.value)}
            value={mensagem}
            placeholder='Digite sua mensagem (opcional)' /></div>

        <button className={styles.btnGerar} onClick={gerarLink}>Gerar link</button>
      </form>



      <div className={styles.link}>
        <p id={styles.linkgerado}>Link gerado:</p>
        <p id={styles.linkreal}>{link}</p>
        <button className={styles.btnAbrir} onClick={abrirWhatsapp} >Abrir whatsapp</button>
      </div>
    </div>
  )
}