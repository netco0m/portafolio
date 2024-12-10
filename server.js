const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
  const { email, message } = req.body;

  require('dotenv').config();

  // Configuración del transportador SMTP
  const transporter = nodemailer.createTransport({
    host: 'cpanel159.wnpservers.net', // Servidor SMTP de tu hosting
    port: 465, // Puerto seguro para SSL
    secure: true, // true para conexiones SSL
    auth: {
      user: 'nicktoledo@alancodes.dev', // Tu correo profesional
      pass: '142536Netco0m@' // Tu contraseña del correo
    }
  });

  // Configurar el contenido del correo
  const mailOptions = {
    from: `"Portafolio Web" <nicktoledo@alancodes.dev>`, // Remitente
    to: 'nicktoledo@alancodes.dev', // Correo receptor (puedes cambiarlo)
    replyTo: email, // Permite responder al correo del formulario
    subject: 'Nuevo mensaje desde tu portafolio', // Asunto del correo
    text: `Has recibido un nuevo mensaje:\n\nDe: ${email}\n\nMensaje: ${message}` // Contenido del correo
  };

  try {
    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado correctamente.');
    res.status(200).send('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error enviando el correo:', error);
    res.status(500).send('Error enviando el correo');
  }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
