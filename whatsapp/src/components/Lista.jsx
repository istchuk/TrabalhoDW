import styles from "./Lista.module.css"

export default function Lista(){
    return(
    <div className={styles.adicionar}>
      <h3>Seus contatos (1)</h3>
      <div className={styles.contato}>
        <div>
            <p>Nome</p>
            <p>99 999999999</p>
        </div>
        <div className={styles.alinhamento}>
            <button>Mensagem</button>
            <button>Editar</button>
            <button>Excluir</button>
        </div>
      </div>
    </div>
    )
}