const tarefasJson = require("../models/tarefas.json");
// const fs = require("fs");

const getAll = (request, response) => {
    response.status(200).send(tarefasJson);
};

const getById = (request, response) => {
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    response.status(200).send(tarefaFiltrada)
}

const createTask = (request, response) => {
    const descricaoRequirida = request.body.descricao
    const nomeColaboradorRequirido = request.body.nomeColaborador

    const novaTarefa = {
        id: Math.random().toString(32).substr(2, 9),
        dataInclusao: new Date(),
        concluido: false,
        descricao: descricaoRequirida,
        nomeColaborador: nomeColaboradorRequirido
    }

    tarefasJson.push(novaTarefa)

    // fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', function(err){
    //     if(err) {
    //         return response.status(424).send({message: err})
    //     }
    // })

    response.status(200).send(novaTarefa)

}

const deleteTask = (request, response) => {
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1)

    // fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', function(err){
    //     if(err) {
    //         return response.status(424).send({message: err})
    //     }
    // })

    response.status(200).json([{
        "mensagem": "Tarefa deletada com sucesso",
        tarefasJson
    }])

}

const replaceTask = (request, response) => {
    let requestedId = request.params.id
    let taskFromBody = request.body


    let filteredTask = tarefasJson.find(task => task.id == requestedId)

    let updatedTask = {
        "id": filteredTask.id,
        "dataInclusao": filteredTask.dataInclusao,
        "concluido": filteredTask.concluido,
        "descricao": taskFromBody.descricao,
        "nomeColaborador": filteredTask.nomeColaborador
    }

   const indice = tarefasJson.indexOf(filteredTask)

   tarefasJson.splice(indice, 1, updatedTask)
    response.status(200).send({
        "message": "Tarefa atualizada com sucesso", updatedTask
    })
}

const updateName = (request, response) => {
    let requestedId = request.params.id
    let newName = req.body.nomeColaborador

    //achar o item da lista que tem o mesmo id

    let filteredName = tarefasJson.find(post => post.id == requestedId)

    //o titulo do post filtrado seja igual ao titulo que vem da requisicao

    filteredName.nomeColaborador = newName
    response.status(200).send({
        "message": "Nome do colaborador atualizado com sucesso", filteredName
    })

}


module.exports = {
    getAll,
    getById,
    createTask,
    deleteTask,
    replaceTask, 
    updateName
}