
import Gerador from "./components/Gerador"
import "./styles/global.css"
import "./styles/temas.css"
import Adicionar from "./components/Adicionar"
import Lista from "./components/Lista"

export default function App() {
  
  return (
   <div className="container">
    <Gerador></Gerador>
    <div className="alinhamento">
      <Adicionar></Adicionar>
      <Lista></Lista>
    </div>
   </div>

  )
}
