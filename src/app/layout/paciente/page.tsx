'use client'
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Menu from "@/components/templates/Menu";
import Pagina from "@/components/templates/Pagina";
import { logout } from '@/cookies' 
import Entrar from "@/components/Ui/Entrar";
import Link from "next/link";
import ImagePosicoes from "@/components/Ui/Camas";

export default function PacientePagina() {
  const [number, setNumber] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 

    const setorId = Cookies.get('selectedSetor'); 

    if (!setorId) {
      console.error("Setor não encontrado no cookie.");
      return; 
    }

    const data = {
      number: number,
      setorId: parseInt(setorId) 
    };

    try {
     
      const response = await axios.post(
        "https://superb-adventure-production.up.railway.app/leitos",
        data
      );
      console.log("Leito criado:", response.data); 
      setShowModal(false); 
    } catch (error) {
      console.error("Erro ao criar leito:", error); 
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <Pagina>
          <div  onClick={handleOpenModal}>
            <Entrar destino="Adicionar Leito" className=" flex text-slate-200 justify-center bg-pink-400 mt-[4%] ml-[2%]" />
          </div>
          <div className="flex flex-col w-16 ml-[83%] gap-3">
            <Menu />
            <Link href="/" className=" mb-10">
              <h1 onClick={handleLogout} className="sair rounded-md ">Sair</h1>
            </Link>
          </div>

          <div className="mt-5">
        
            {showModal && (
              <div className="modal-overlay" onClick={handleCloseModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <span className="close-button" onClick={handleCloseModal}>
                    &times;
                  </span>
                  <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="mb-4">
                      <label htmlFor="number" className="block text-white font-medium text-lg">Número do Leito:</label>
                      <input
                        type="text"
                        id="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="mt-1 p-2 border rounded"
                        required
                      />
                    </div>

                    <button type="submit" className="bg-pink-400 text-white p-2 rounded-md">Criar Leito</button>
                  </form>
                </div>
              </div>
            )}

      
            <ImagePosicoes />
          </div>
        </Pagina>
      </div>
    </>
  );
}
