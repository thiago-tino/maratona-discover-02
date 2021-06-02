const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

// Eventos do projeto
module.exports = {
  
    // Página de criação do projeto (get)
    create(req, res) {res.render("job")},

    // Salva informações do projeto (post)
    async save(req, res) {
                
        // Salva as informações do projeto no bd
        await Job.create({          
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // Atribuindo data de hoje);
        });

        // Retorna pra página inicial
        return res.redirect('/');
    },

    // Página de edição do projeto (get)
    async show(req, res) {

        // Traz infos do BD
        const jobs = await Job.get()
        const profile = await Profile.get()

        // Pega o id retornado via parâmetro pela página 'job-edit"
        const jobId = req.params.id

        // Verifica se o id da página 'job-edit' existe salvo em 'jobs'
        const job = jobs.find(job => Number(job.id) === Number(jobId))
        // "find()" Retorna a informação caso for verdadeiro
        
        // Valdação retornando a mensagem abaixo caso for "false"
        if (!job) {
            return res.send('Não existente')
        }

        // Chama função para calcular valor total do projeto e passa para "job.budget" renderizar no "job-edit"
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        // Renderiza página 
        return res.render("job-edit", { job })
    },

    // Editando informações do projeto (post)
    async update(req, res) {
        
        // Pega o id retornado via parâmetro pela página 'job-edit"
        const jobId = req.params.id
        
        // Alterando dados e guardando em "updatedJobs"
        const updatedJobs = {
            name: req.body.name, // Nome
            "daily-hours": req.body["daily-hours"], // horas/dia que vou trabalhar no projeto
            "total-hours": req.body["total-hours"], // Quantidade de horas total para consumir do projeto
        }

        // Manda para "Job.js" atualizar os dados
        await Job.update(updatedJobs, jobId)

        // Renderiza página de edição do job
        res.redirect('/job/' + jobId)
    },

    // Deletar um projeto no BD
    async delete(req, res) {
        // Pega o id retornado via parâmetro pela página 'job-edit"
        const jobId = req.params.id

        // Manda para o "Job.js" deletar
        await Job.delete(jobId)

        // Renderiza página inicial
        return res.redirect('/');
    }
}