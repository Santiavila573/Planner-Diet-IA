# Planner-Diet-IA
# Asistente Inteligente para Planificación de Dietas Personalizadas con React

<img width="971" height="792" alt="2025-10-02 16 21 14 (3)" src="https://github.com/user-attachments/assets/a8e179f2-1328-4ec6-b1de-506220bad8dd" />
<img width="1579" height="759" alt="2025-10-02 16 21 14 (2)" src="https://github.com/user-attachments/assets/a6b44d0f-faae-4395-bc0d-d506f942c5f8" />
<br>
<img width="1579" height="759" alt="2025-10-02 16 21 14 (2)" src="https://github.com/user-attachments/assets/b05053f2-fe23-4c76-8054-470117815217" />
<br>
<img width="1579" height="759" alt="2025-10-02 16 21 14 (2)" src="https://github.com/user-attachments/assets/66fc1c05-c4ee-4209-8e88-94c380ac77a2" />
<br>
<img width="1572" height="770" alt="2025-10-02 16 21 14 (6)" src="https://github.com/user-attachments/assets/b141d72f-92a5-4097-9ad8-8882b92fd992" />
<br>
<br>
📌 Descripción
Planner-Diet-IA es una aplicación web basada en React que genera planes de alimentación personalizados utilizando inteligencia artificial. El sistema está diseñado para ofrecer recomendaciones nutricionales adaptadas a las necesidades del usuario, sin depender de una base de datos externa. Los planes generados pueden exportarse en formato PDF para facilitar su uso e impresión.

🔧 Tecnologías Utilizadas
TecnologíaDescripciónReactBiblioteca para construir interfaces de usuario dinámicas y escalables.LangChainFramework para integrar cadenas de procesamiento de IA.OpenAI APIModelo de lenguaje para generación de recomendaciones.PDF-LibBiblioteca para generar y exportar archivos PDF.Node.js/ExpressBackend opcional para manejar lógica de negocio (si aplica).

📂 Estructura del Proyecto

<img width="577" height="297" alt="image" src="https://github.com/user-attachments/assets/7bdc7664-318b-4329-8d4a-d955eadee769" />

⚙️ Instalación y Configuración
1. Requisitos previos

Node.js (v18 o superior)
Cuenta en OpenAI (para usar la API de IA)

2. Clonar el repositorio
 Copygit clone https://github.com/Santiavila573/Planner-Diet-IA.git
cd Planner-Diet-IA/client
3. Instalar dependencias
 Copynpm install
4. Configurar variables de entorno
Crear un archivo .env en la raíz del proyecto client/ con las siguientes variables:
 CopyREACT_APP_OPENAI_API_KEY=tu_api_key_de_openai
5. Ejecutar la aplicación
 Copynpm start

La aplicación estará disponible en http://localhost:3000.


🎯 Funcionalidades Clave

Generación de dietas personalizadas: Basadas en el perfil del usuario (edad, peso, altura, objetivos).
Exportación a PDF: Los planes generados pueden descargarse en formato PDF para su impresión o uso offline.
Interfaz intuitiva: Diseño responsivo y fácil de usar, construido con React.
Integración con IA: Uso de LangChain y OpenAI API para recomendaciones nutricionales precisas.


📊 Ejemplo de Uso

Registro de datos: El usuario ingresa sus datos básicos (edad, peso, altura, objetivos).
Selección de preferencias: Indica restricciones alimentarias, alergias o condiciones específicas.
Generación del plan: El sistema genera un plan de alimentación personalizado.
Exportación a PDF: El usuario puede descargar el plan en formato PDF con un solo clic.


📝 Contribuciones
¡Las contribuciones son bienvenidas! Para colaborar:

Abrir un issue con la propuesta.
Crear un fork del repositorio.
Enviar un pull request con los cambios.


📜 Licencia
Este proyecto está bajo la licencia Apache 2.0. Consulta el archivo LICENSE para más detalles.

📬 Contacto

Autor: Santiago Avila
<br>
Correo: avilasantiago917@ngmail.com
<br>
Linkedin: https://www.linkedin.com/in/santiago-ávila-301047200
