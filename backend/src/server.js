const app = require('./app'); 
const db = require('./config/db'); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`[Server] Servidor da API ProcuraPet rodando na porta ${PORT}`);
  console.log(`[Server] Acesse http://localhost:${PORT}/api para verificar o status da API.`);

  try {
    const queryResult = await db.query('SELECT NOW() as now');
    console.log(`[DB MySQL] Conexão com o banco de dados MySQL estabelecida com sucesso: ${queryResult[0].now}`);
  } catch (err) {
    console.error('[DB MySQL] Falha ao conectar ou testar o banco de dados MySQL!', {
        message: err.message,
    });
  }
});