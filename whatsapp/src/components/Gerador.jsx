import styles from "./Gerador.module.css"
import { useState } from "react"
import image from './icon.png'
import { supabase } from "../supabaseCliente"  // ajuste o caminho se necessário

export default function Gerador() {
  const [numero, setNumero] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [link, setLink] = useState("")
  const [usandoIndex, setUsandoIndex] = useState("")


  function gerarLink() {
    if (!numero) {
      alert("Digite um número")
      setMensagem("")
      return
    }
    //condição do replace vai fazer substituir tudo que não é um dígito numérico (0-9) por um espaço em branco
    let quantidade = numero.toString().replace(/\D/g, "");

    //Aqui ele verifica se a string obedece a condição de ter 11 carac, se for true ele entra na gração
    if (/^\d{11}$/.test(quantidade)) {
      const numeroCodificado = btoa(quantidade);
      const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : "";
      setLink(`https://wa.me/${numeroCodificado}${texto}`);
    } else {
      alert("Digite um número válido");
      setNumero("");
      setMensagem("");
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

  async function copiar() {
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copiado para a área de transferência!");
    } catch (err) {
      console.error("Falha ao copiar: ", err);
    }
  }

  async function adicionarMensagem(mensagem) {
    const { data, error } = await supabase
      .from("mensagens")
      .insert([{conteudo: mensagem }])

    if (error) console.error("Erro ao adicionar mensagem:", error)
    else console.log("Mensagem adicionada:", data)
  }

  function usarMensagemSalva(){

  }

  function usandoInput(index){
    setUsandoIndex(index) //indica que está usando
  }


  // busca as mensagens quando o componente monta
  // useEffect(() => {
  //   async function carregarMensagens() {
  //     const { data, error } = await supabase
  //       .from("mensagens")
  //       .select("conteudo")

  //     if (error) {
  //       console.error("Erro ao carregar mensagens:", error)
  //     } else {
  //       setMensagens(data)
  //     }
  //   }

  //   carregarMensagens()
  // }, [])



  return (
    <div className={styles.gerador}>
      <h1>Gerador de Links</h1>
      {/* para poder criar um link com o enter do teclado */}
      <form onSubmit={(e) => { e.preventDefault() }}>
        <div>
          <label htmlFor="numero">Número do Whatsapp</label>
          <input
            type="tel"
            id="numero"
            placeholder="Digite um número"
            value={numero}
            onChange={handleChange}
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

        <button className={styles.btnGerar} onClick={() => adicionarMensagem(mensagem)}>{usandoIndex !== null ? "Salvar Mensagem" : "Mensagens Salvas"}</button>
        <button className={styles.btnGerar} onClick={gerarLink}>Gerar link</button>
      </form>



      <div className={styles.link}>

        <p id={styles.linkgerado}>Link gerado:</p>
        <p id={styles.linkreal}>{link}</p>
        <div className={styles.alinhar}>
          <button className={styles.btnAbrir} onClick={abrirWhatsapp} >Abrir whatsapp</button>
          <button onClick={copiar} className={styles.btnCopy}><img src={image} alt="" /></button>
        </div>
      </div>
    </div>
  )
}