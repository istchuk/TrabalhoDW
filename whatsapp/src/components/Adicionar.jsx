import styles from "./Adicionar.module.css"
import { useState, useEffect } from "react"
import { supabase } from "../supabaseCliente"

export default function Adicionar() {
  // Aqui estão todas as nossas variáveis de estado
  const [nome, setNome] = useState("")
  const [numero, setNumero] = useState("")
  const [tipo, setTipo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [contatos, setContatos] = useState([]) // lista de contatos
  const [editIndex, setEditIndex] = useState(null) // índice do contato sendo editado

  // funções de atualizar e manipular os estados qando o uusuário interage com os inputs
  function handleChangeNome(event) {
    setNome(event.target.value)
  }

  function handleChangeNumero(e) {
    // remove tudo que não é número
    let valor = e.target.value.replace(/\D/g, "")
    // adiciona parênteses nos dois primeiros dígitos
    if (valor.length > 2) {
      valor = `(${valor.slice(0, 2)})${valor.slice(2)}`
    }
    setNumero(valor)
  }

  function handleChangeTipo(event) {
    setTipo(event.target.value)
  }

  function handleChangeCategoria(event) {
    setCategoria(event.target.value)
  }

  // função para adicionar ou editar contato
  async function adicionarContato() {
    // verifica se o número foi digitado
    if (!numero) {
      alert("Digite um número")
      setNome("")
      return
    }
    // remove tudo que não é número
    const numeroLimpo = numero.toString().replace(/\D/g, "")

    // verifica se o nome e o número são válidos
    if (nome && numeroLimpo.length === 11) {
      if (editIndex !== null) {
        // função para editar contato
        const contatoParaEditar = contatos[editIndex]

        // salva as alterações no Supabase
        const { data, error } = await supabase
          .from("contato")
          .update({
            nomeContato: nome,
            numeroContato: numeroLimpo,
            tipoContato: tipo,
            categoria: categoria
          })
          .eq("id", contatoParaEditar.id)

        if (error) {
          console.error("Erro ao atualizar contato:", error)
        } else {
          const novosContatos = [...contatos]
          novosContatos[editIndex] = {
            ...contatoParaEditar,
            nomeContato: nome,
            numeroContato: numeroLimpo,
            tipoContato: tipo
          }
          setContatos(novosContatos)
          setEditIndex(null)
        }
      } else {
        // adiciona novo contato no supabase
        const { data, error } = await supabase
          .from("contato")
          .insert([
            {
              nomeContato: nome,
              numeroContato: numeroLimpo,
              tipoContato: tipo,
            }
          ])
          .select()

        if (error) {
          console.error("Erro ao adicionar contato:", error)
        } else {
          setContatos([...contatos, data[0]])
        }
      }

      // limpa os inputs
      setNome("")
      setNumero("")
      setTipo("")
      setCategoria("")
    } else {
      // alerta se o número for inválido
      alert("Digite um número válido")
      setNumero("")
      setNome("")
    }
  }

  // excluir contato
  async function excluirContato(IndexParaExcluir) {
    const contatoParaExcluir = contatos[IndexParaExcluir]
    setContatos(contatos.filter((_, index) => index !== IndexParaExcluir))
    // exclui do supabase
     const { data, error } = await supabase
          .from("contato")
          .delete()
          .eq("id", contatoParaExcluir.id)
        
    }
  

  // função para enviar mensagem no whatsapp
  function enviarMensagem(numeroContato) {
    const numeroLimpo = numeroContato.toString().replace(/\D/g, "")
    const abrir = `https://wa.me/${numeroLimpo}`
    window.open(abrir, "_blank")
  }

  // puxa o editar contato para os inputs
  function editarContato(index) {
    setNome(contatos[index].nomeContato)
    setNumero(contatos[index].numeroContato)
    setTipo(contatos[index].tipoContato)
    setCategoria(contatos[index].categoria)
    setEditIndex(index)
  }

  // filtra os contatos pela categoria selecionada
  const contatosFiltrados =
    categoria === "Todos" || categoria === ""
      ? contatos
      : contatos.filter(c => c.tipoContato === categoria)

  // carrega os contatos do supabase quando o componente é montado
  useEffect(() => {
    async function carregarContatos() {
      const { data, error } = await supabase.from("contato").select("*")
      if (error) {
        console.error("Erro ao buscar contatos:", error)
      } else {
        setContatos(data)
      }
    }
    carregarContatos()
  }, [])

 
  return (
    <div className={styles.adicionar}>
      <h1>Adicionar contato</h1>
      <div className={styles.inputs}>
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={handleChangeNome}
          />

          <input
            type="tel"
            placeholder="Número Ex:(xx)9..."
            value={numero}
            onChange={handleChangeNumero}
          />

          <select onChange={handleChangeTipo} value={tipo}>
            <option value="">Selecione o tipo do contato</option>
            <option value="Amigos">Amigos</option>
            <option value="Família">Família</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Escola">Escola</option>
          </select>

          <button className={styles.btnAdicionar} onClick={adicionarContato}>
            {editIndex !== null ? "Salvar edição" : "Adicionar"}
          </button>
        </form>

        <h3>Seus contatos ({contatos.length})</h3>

        <select
          onChange={handleChangeCategoria}
          value={categoria}
          className={styles.tipoContato}
        >
          <option value="">Selecione o tipo do contato</option>
          <option value="Todos">Todos</option>
          <option value="Amigos">Amigos</option>
          <option value="Família">Família</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Escola">Escola</option>
        </select>
      </div>

      <div className={styles.adicionarcontato}>
        {contatosFiltrados.map((c, index) => (
          <div key={index} className={styles.contato}>
            <div>
              <p className={styles.nomeContato}>{c.nomeContato}</p>
              <p>{c.numeroContato}</p>
              <p>{c.tipoContato}</p>
            </div>

            <div className={styles.alinhamento}>
              <button onClick={() => enviarMensagem(c.numeroContato)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
                  <path fill="#000000" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-4.586l-2.707 2.707a1 1 0 0 1-1.414 0L8.586 19H4a2 2 0 0 1-2-2V6zm18 0H4v11h5a1 1 0 0 1 .707.293L12 19.586l2.293-2.293A1 1 0 0 1 15 17h5V6zM6 9.5a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1z" />
                </svg>
              </button>

              <button onClick={() => editarContato(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 21 21">
                  <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="M17 4a2.121 2.121 0 0 1 0 3l-9.5 9.5l-4 1l1-3.944l9.504-9.552a2.116 2.116 0 0 1 2.864-.125zm-1.5 2.5l1 1" />
                </svg>
              </button>

              <button onClick={() => excluirContato(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 21 21">
                  <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="M5.5 4.5h10v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2zm5-2a2 2 0 0 1 1.995 1.85l.005.15h-4a2 2 0 0 1 2-2zm-7 2h14m-9 3v8m4-8v8" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
