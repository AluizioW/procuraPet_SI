function montarUpdate(body, dadosAtuais, campos, tabela, chaveEstrangeira, valorChaveEstrangeira) {
    const atualizacoes = [];
    const return_atualizacoes = {};
    const valores = [];
    let campoDataModificacao = false

    for (const campo of campos) {
        const novoValor = body[campo];
        const valorAtual = dadosAtuais[campo];

        // Só atualiza se veio no body e mudou
        if (novoValor !== undefined && novoValor !== valorAtual && campo != 'dataModificacao') {
            return_atualizacoes[campo] = novoValor;
            atualizacoes.push(`${campo} = ?`);
            valores.push(novoValor);
        }

        if (campo == 'dataModificacao'){
            campoDataModificacao = true
        }
    }

    if (atualizacoes.length === 0) {
        return null;  // Nada pra atualizar
    }
    else{
        if (campoDataModificacao){
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            return_atualizacoes['dataModificacao'] = date;
            atualizacoes.push(`dataModificacao = ?`);
            valores.push(date);
        }
    }

    const sql = `UPDATE ${tabela} SET ${atualizacoes.join(', ')} WHERE ${chaveEstrangeira} = ?`;
    valores.push(valorChaveEstrangeira);

    return { sql, valores, return_atualizacoes };
}

module.exports = { montarUpdate };
