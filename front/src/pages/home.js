import React from 'react';

export default function Home() {
    async function handleImgs() {
        await fetch('http://localhost:5000/getImages');
    }

    return <ul>
        {handleImgs()}
    </ul>
}