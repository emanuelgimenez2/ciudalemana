import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import './Home.css'; // Importa tu archivo CSS aquí

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
     
      const topicsCollection = collection(db, 'temas'); // Cambia 'temas' al nombre de tu colección en Firebase
      console.log(topicsCollection);
      const q = query(topicsCollection, where('titulo', '>=', searchTerm));

      try {
        const querySnapshot = await getDocs(q);
        const topicData = querySnapshot.docs.map((doc) => doc.data());
        setTopics(topicData);
      } catch (error) {
        console.error('Error al obtener los temas:', error);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="home-container"> {/* Agrega la clase CSS para el contenedor */}
      <input
        type="text"
        placeholder="Buscar por título"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>{topic.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

