import styles from "./Gerador.module.css"
import { useState } from "react"

export default function Gerador(){
    const [numero, setNumero] = useState("")
    const [mensagem, setMensagem] = useState("")
    const [link, setLink] = useState("")

  function gerarLink(){
    // essa linha verifica se há uma mensagem digitada, se sim ele vai codificar a mensagem e adicionar na url, se não houver, ele só gera a url com o número
    const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : ""
    setLink(`https://wa.me/${numero}${texto}`)
    
  }

  function abrirWhatsapp() {
    if (link) {
      window.open(link, "_blank")
    }
  }

    return(
    <div className= {styles.gerador}>
      <h1>Gerador de Links</h1>
      <div>
        <label htmlFor="numero">Número do Whatsapp</label>
      <input 
      type="tel"
      id="numero" 
      value={numero} 
      placeholder='(__) 9____-____'
      onChange={(e) => setNumero(e.target.value)} /></div>
      
      <div>
      <label htmlFor="mensagem">Mensagem (opcional)</label>
      <input 
      type="text" 
      id="mensagem" 
      onChange={(e) => setMensagem(e.target.value)} 
      value={mensagem} 
      placeholder='Digite sua mensagem'/></div>
      

      <button className={styles.btnGerar} onClick={gerarLink}>Gerar link</button>


      
        <div className={styles.link}>
        <p id={styles.linkgerado}>Link gerado:</p>
        <p id={styles.linkreal}>{link}</p>
        <button className={styles.btnAbrir}onClick={abrirWhatsapp} >Abrir whatsapp</button>
      </div>
    </div>
    )
}