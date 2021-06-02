const Database = require('../db/config');

module.exports = {

    // Pega as informações dos projetos no BD
    async get(){
        const db = await Database();
    
        const jobs = await db.all(`SELECT * FROM jobs`);

        await db.close();

        // Colocar os parenteses () por fora da arrow function é a mesma coisa de dar o return
        return jobs.map(job => ({
            
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at
        }));
    },
    
    // Cria novo projeto no BD
    async create(newJob) {  
        const db = await Database();

        await db.run(`INSERT INTO jobs(
                        name,
                        daily_hours,
                        total_hours,
                        created_at 
                    ) VALUES (
                        "${newJob.name}",
                        ${newJob["daily-hours"]},
                        ${newJob["total-hours"]},
                        ${newJob.created_at}
        );`)
        
        await db.close();
    },
    // Altera as informações dos projetos no BD
    async update(updatedJob, jobId){
        const db = await Database();

        await db.run(`UPDATE jobs SET
                        name = "${updatedJob.name}",
                        daily_hours = ${updatedJob["daily-hours"]},
                        total_hours = ${updatedJob["total-hours"]}
                        WHERE id = ${jobId}
        `)
        
        await db.close()
    },
    // Deleta o projeto no BD
    async delete(id){

        const db = await Database();
        
        db.run(`DELETE FROM jobs WHERE id = ${id}`)
        
    }
}