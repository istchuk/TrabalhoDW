export default function ListaContatos({ contatos, editarContato, excluirContato, enviarMensagem, styles }) {
  return (
    <div className={styles.adicionarcontato}>
      {contatos.map((c, index) => (
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
  )
}
