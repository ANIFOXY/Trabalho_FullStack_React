import { useEffect, useState } from 'react'
import "./styles.css";
const mock = {
    "error": false,
    "category": "Misc",
    "type": "twopart",
    "setup": "O que o pagodeiro foi fazer na igreja?",
    "delivery": "Cantar pá God.",
    "flags": {
        "nsfw": false,
        "religious": true,
        "political": false,
        "racist": false,
        "sexist": false,
        "explicit": false
    },
    "safe": false,
    "id": 1,
    "lang": "pt"
}
export default function Categories() {
    return (
        <div className='lista-principal'>
            { conteudo }
        </div>
    )
}
