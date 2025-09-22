import styles from "./Adicionar.module.css"

export default function(){
    return(
    <div className={styles.adicionar}>
      <h1>Adicionar contato</h1>
      <input type="text" placeholder='Nome' />
      <input type="number" placeholder='Numero Ex:(xx)9...' />
      <button className={styles.btnAdicionar}>Adicionar</button>
    </div>
    )
}