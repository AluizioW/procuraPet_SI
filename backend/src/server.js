require("dotenv").config();

const https = require("https");
const fs = require("fs");
const path = require("path"); // Adicione esta linha
const app = require('./app'); 
const db = require('./config/db'); 

const PORT = process.env.PORT || 3000;

const options = {
  key: fs.readFileSync(path.join(__dirname, "../ssl/server.key")),
  cert: fs.readFileSync(path.join(__dirname, "../ssl/server.cert")),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS rodando na porta ${PORT}`);
});

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`[Server] Servidor da API ProcuraPet rodando na porta ${PORT}`);
  console.log(`[Server] Acesse https://localhost:${PORT}/api para verificar o status da API.`);

  try {
    const queryResult = await db.query('SELECT NOW() as now');
    console.log(`[DB MySQL] Conexão com o banco de dados MySQL estabelecida com sucesso: ${queryResult[0].now}`);
  } catch (err) {
    console.error('[DB MySQL] Falha ao conectar ou testar o banco de dados MySQL!', {
        message: err.message,
    });
  }
});