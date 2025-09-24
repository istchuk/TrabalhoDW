
import Gerador from "./components/Gerador"
import "./styles/global.css"
import "./styles/temas.css"
import Adicionar from "./components/Adicionar"


export default function App() {
  
  return (
   <div className="container">
    <Gerador></Gerador>
    <div className="alinhamento">
      <Adicionar></Adicionar>
    </div>
   </div>

  )
}
