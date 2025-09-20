import styles from "./Gerador.module.css"

export default function Gerador(){
    return(
    <div className= {styles.gerador}>
      <h1>Gerador de links</h1>
      <input type="number" placeholder='Numero Ex:(xx)9...' />
      <input type="text" placeholder='Mensagem (opcional)'/>
      <button>Gerar link</button>
      <div className={styles.link}>
        <p>link gerado:</p>
        <p>htts://...</p>
        <button>Abrir whatsapp</button>
      </div>
    </div>
    )
}