// Funções para o projeto
module.exports = {
    // Cálculo de dias restantes
    remainingDays (job) {   

        // Saber total em dias de execução do projeto
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

        // Pegou a data de criação do projeto (tipo date)
        const createdDate = new Date(job.created_at)


        // Soma da quantidade de dias totais de execução do projeto (remaingingDays) com a data de criação (createdDate) para saber em qual a data que o projeto terá que estar pronto:
        
        // createdDate: Data da criação do projeto (dia 10 em number) + remainingDays: Quantidade de dias de execução do projeto (30 dias em number) = 40 (number)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        // "getDate()" transforma tipo "date" em "number" (dia "10" em tipo number).

        // O "setDate()" pega o 40 (dia 10 + 30 dias em number) e transforma estes 40 em um resultado em milisegundos.
        const dueDateInMs = createdDate.setDate(dueDay) 
        // "setDate()" Transforma em tipo "date" (em milisegundos)


        // Contabiliza os dias restantes através do dia atual:

        // dueDateInMs: Dias totais até conclusão do projeto (em milisegundos) - Date.now(): Dia atual (em milisegundos) = Dias faltantes para término do projeto (milisegundos).
        const timeDiffInMs = dueDateInMs - Date.now() 
        
        // Saber a quantidade de milisegundos que um dia tem
        const dayInMs = 1000 * 60 * 60 * 24 

        // Transforma a quantidade de dias restantes que está em milisegundos em dias interios
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
        // "Math.floor()" Menor número inteiro.
        // "Math.ceil()" Maior número inteiro.

        // Restam x dias
        return dayDiff
    },

    // Calcula meu ganho total com o projeto
    // "ValueHour": Valor da hora * "total-hours": Total de horas do projeto = Valor total
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
}