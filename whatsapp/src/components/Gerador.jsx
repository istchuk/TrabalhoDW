import styles from "./Gerador.module.css"

export default function Gerador(){
    return(
    <div className= {styles.gerador}>
      <h1>Gerador de Links</h1>
      <label htmlFor="numero">Número do Whatsapp</label>
      <input type="number"id="numero" placeholder='(__) 9____-____' />
      <label htmlFor="mensagem">Mensagem (opcional)</label>
      <input type="text" id="mensagem" placeholder='Digite sua mensagem'/>
      <button className={styles.btnGerar}>Gerar link</button>
      <div className={styles.link}>
        <p id={styles.linkgerado}>Link gerado:</p>
        <p id={styles.linkreal}>htts://...</p>
        <button className={styles.btnAbrir}>Abrir whatsapp</button>
      </div>
    </div>
    )
}