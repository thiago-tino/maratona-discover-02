const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {

    // Renderiza página inicial
    async index (req, res) {

        // Pega dados das tabelas "jobs" e "profile" no BD e atribui em uma variável
        const jobs = await Job.get();
        const profile = await Profile.get();

        // Contador de projetos. Inicia em zero e altera através do "map" do updatedJobs
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // Cria variável recenbendo "zero" de total de horas por dia de cada projeto em progresso
        let jobTotalHours = 0;

        // Renderizar informações do projeto na página inicial
        const updatedJobs = jobs.map((job) => {
        // Utilizou o "map()" ao invés do "forEarch()" para iterar o array e retornar o resultado das horas faltantes
            
            // Chamando função de cálculo de dias restante
            const remaining = JobUtils.remainingDays(job) 
            
            // Retornando status se o projeto chegou no dia ou ainda está sendo executado
            const status = remaining <= 0 ? 'done' : 'progress' 

            // Soma as quantidades de status
            statusCount[status] += 1;

            // Calcula o total de horas por dia de cada projeto em progresso
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;
            
            // Retorna dados para renderização das informações do projeto na página inicial
            return {
                ...job, // Spread (espalhamento): pegou todas as propriedades do objeto "jobs" e chamou com os "..."
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }     
        })
        // Quantidade de horas livres no dia
        // Horas de trabalho por dia (setado no perfil) - Total de horas diárias de trabalho nos projetos em execução 
        const freeHours = profile["hours-per-day"] - jobTotalHours;

        // Renderiza página inicial
        return res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours })
    }
}