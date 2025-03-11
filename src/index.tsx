import React, { useEffect, useState } from 'react';

const MyComponent: React.FC = () => {
  // Estado para almacenar el HTML
  const [htmlContent, setHtmlContent] = useState<string>('');

  // Usamos useEffect para cargar el contenido HTML cuando el componente se monta
  useEffect(() => {
    // Simulamos una función asincrónica que devuelve HTML como cadena
    const fetchHtmlContent = async () => {
      const html = await fetchSomeHtml();
      setHtmlContent(html);
    };

    fetchHtmlContent();
  }, []); // Ejecutar solo una vez cuando el componente se monte

  // Función para simular la obtención de HTML (puede ser una API o una promesa)
  const fetchSomeHtml = async (): Promise<string> => {
    // Simulamos un retardo y luego devolvemos un string con HTML
    return new Promise((resolve) => {
      setTimeout(() => resolve('<h1>Hola Mundo</h1>'), 1000);
    });
  };

  return (
    <div>
      {/* Usamos dangerouslySetInnerHTML solo si htmlContent tiene un string válido */}
      {htmlContent && (
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
};

export default MyComponent;