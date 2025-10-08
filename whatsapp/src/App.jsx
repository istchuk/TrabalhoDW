import { supabase } from "./supabaseCliente"
import { useEffect } from "react";
import Gerador from "./components/Gerador"
import "./styles/global.css"
import "./styles/temas.css"
import Adicionar from "./components/Adicionar"



export default function App() {

  return (
   <div className="container">
    <Gerador></Gerador>
      <Adicionar></Adicionar>
   </div>

  )
}
