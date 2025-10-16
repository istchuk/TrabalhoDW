import styles from "./Gerador.module.css"
import { useState } from "react"
import image from './icon.png'
import { supabase } from "../supabaseCliente"
import { useEffect } from "react"

export default function Gerador() {

  // declaração das variáveis de estado
  const [numero, setNumero] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [link, setLink] = useState("")
  // const [usandoIndex, setUsandoIndex] = useState("")
  const [modalAberto, setModalAberto] = useState(false)
  const [mensagensSalvas, setMensagensSalvas] = useState([])

  // funçoes de manipular e alterar os estados via inputs
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

  // função para gerar o link
  function gerarLink() {
    if (!numero) {
      alert("Digite um número")
      setMensagem("")
      return
    }
    //condição do replace vai fazer substituir tudo que não é um dígito numérico (0-9) por um espaço em branco
    let quantidade = numero.toString().replace(/\D/g, "")

    //Aqui ele verifica se a string obedece a condição de ter 11 carac, se for true ele entra na gração
    if (/^\d{11}$/.test(quantidade)) {
      const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : ""
      setLink(`https://wa.me/${quantidade}${texto}`)
    } else {
      alert("Digite um número válido")
      setNumero("")
      setMensagem("")
    }
  }

  // função para abrir o link em uma nova aba
  function abrirWhatsapp() {
    if (link) {
      window.open(link, "_blank")
    }
  }
  // função para copiar o link para a área de transferência
  async function copiar() {
    try {
      await navigator.clipboard.writeText(link)
      alert("Link copiado para a área de transferência!")
    } catch (err) {
      console.error("Falha ao copiar: ", err)
    }
  }

  // salve uma mensagem no supabase
  async function adicionarMensagem(mensagem) {
    if (!mensagem) return alert("Digite uma mensagem para salvar!")
    const { data, error } = await supabase
      .from("mensagens")
      .insert([{ conteudo: mensagem }])
      .select()
    if (!error) {
      setMensagensSalvas([...mensagensSalvas, data[0]])
      setMensagem("")
    }
  }
  // excluir uma mensagem do supabase
  async function excluirMensagem(id) {
    const { error } = await supabase.from("mensagens").delete().eq("id", id)
    if (!error) setMensagensSalvas(mensagensSalvas.filter(msg => msg.id !== id))
  }

  // usar uma mensagem salva
  function usarMensagemSalva(conteudo) {
    setMensagem(conteudo)
    setModalAberto(false)
  }

  // abrir e fechar modal
  function abrirModal() {
    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
  }

  // carrega as mensagens salvas do supabase quando o componente é montado
  useEffect(() => {
    async function carregarMensagens() {
      const { data, error } = await supabase.from("mensagens").select("*")
      if (error) {
        console.error("Erro ao buscar mensagens:", error)
      } else {
        setMensagensSalvas(data)
      }
    }
    carregarMensagens()
  }, [])


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
            placeholder='Digite sua mensagem (opcional)'
          />
        </div>

        <button
          type="button"
          className={styles.btnGerar}
          onClick={() => adicionarMensagem(mensagem)}
        >
          Salvar Mensagem
        </button>

        <button
          type="button"
          className={styles.btnGerar}
          onClick={abrirModal}
        >
          Ver Mensagens Salvas
        </button>

        <button
          type="button"
          className={styles.btnGerar}
          onClick={gerarLink}
        >
          Gerar link
        </button>
      </form>

      <div className={styles.link}>
        <p id={styles.linkgerado}>Link gerado:</p>
        <p id={styles.linkreal}>{link}</p>
        <div className={styles.alinhar}>
          <button className={styles.btnAbrir} onClick={abrirWhatsapp}>
            Abrir whatsapp
          </button>
          <button onClick={copiar} className={styles.btnCopy}>
            <img src={image} alt="" />
          </button>
        </div>
      </div>


      {modalAberto && ( // Se o estado modalAberto for true, o modal será renderizado
        <div className={styles.modalWindow}> {/* Janela flutuante que funciona como o modal */}

          <div className={styles.modalHeader}> {/* Cabeçalho do modal */}
            <h2>Mensagens Salvas</h2> {/* Título do modal */}
            <button className={styles.btnFechar} onClick={fecharModal}>X</button> {/* Botão para fechar o modal */}
          </div>

          <ul className={styles.modalContent}> {/* Lista de mensagens salvas */}
            {mensagensSalvas.map(msg => ( // Percorre cada mensagem salva
              <li key={msg.id} className={styles.itemMensagem}> {/* Cada item da lista representa uma mensagem */}

                <span>{msg.conteudo}</span> {/* Exibe o texto da mensagem */}

                <div> {/* Container para os botões de ação */}
                  <button
                    className={styles.btnExcluir}
                    onClick={() => excluirMensagem(msg.id)} // Chama função para excluir a mensagem pelo id
                  >
                    Excluir
                  </button>

                  <button
                    className={styles.btnExcluir}
                    onClick={() => usarMensagemSalva(msg.conteudo)} // Chama função para usar a mensagem salva (ex: preencher input)
                  >
                    Usar
                  </button>
                </div>

              </li>
            ))}
          </ul>

        </div>
      )}

    </div>
  )
}
