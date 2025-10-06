import styles from "./Gerador.module.css"
import { useState } from "react"
import image from './icon.png'

export default function Gerador() {
  const [numero, setNumero] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [link, setLink] = useState("")

  function gerarLink() {
    if (!numero) {
      alert("Digite um número")
      setMensagem("")
      return
    }
    else {
      const quantidade = numero.toString()
      if(numero == quantidade && quantidade.length == 11){
        // essa linha verifica se há uma mensagem digitada, se sim ele vai codificar a mensagem e adicionar na url, se não houver, ele só gera a url com o número
      const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : ""
      setLink(`https://wa.me/${numero}${texto}`)
      }
      else{
        alert("Digite um número válido")
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

  function handleChange(e) {
    //captura o valor do input e remove tudo que não é número
  let valor = e.target.value.replace(/\D/g, "")

  //faz a verificação para quando foram digitados mais de dois algariasmos colocar os ()
  if (valor.length > 2) {
    //.slice pega o começo e o fim do numero, nesse caso é como se tivessems quebrado o numero em 2
    // o primeiro slice adiciona e exibe os dois primeiros numeros com ()
    //o segundo exibe o restante do numero
    valor = `(${valor.slice(0, 2)})${valor.slice(2)}`
  }

  setNumero(valor)
}


  return (
    <div className={styles.gerador}>
      <h1>Gerador de Links</h1>
      {/* para poder criar um link com o enter do teclado */}
      <form onSubmit={(e) => { e.preventDefault()}}>
        <div>
          <label htmlFor="numero">Número do Whatsapp</label>
          <input
            type="tel"
            id="numero"
            placeholder="Digite um número"
            value={numero}
            onChange = {handleChange}
            /> 
            </div>

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
        <div className={styles.alinhar}>
          <button className={styles.btnAbrir} onClick={abrirWhatsapp} >Abrir whatsapp</button>
          <button className={styles.btnCopy}><img src={image} alt="" /></button>
        </div>
      </div>
    </div>
  )
}