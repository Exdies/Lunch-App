import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

export default function userPage(){
    const[session, loading] = useSession()
    const[content, setContent] = useState()

    useEffect(() =  () =>{
        const fecthData = async() => {
            const res = await fetch("/api/userPage");
            const json = await res.json()

            if(json.content){
                setContent(json.content)
            }
        }
        fecthData();
    }, [session])

    if(typeof window !== "undefined" && loading) return null;

    if(!session){
        return (
            <main>
                <div>
                    <h1>
                        No has ingresado aun, por favor ingresa en tu cuenta
                    </h1>
                </div>
            </main>
        )
    }
    return(
        <main>
            <div>
                <h1>
                    pagina principal del usuario ingresado</h1>
                <p>
                {content}
                </p>
            </div>
        </main>
    )
}