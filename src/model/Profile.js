const Database = require('../db/config');

// Pega dados pra exportar para "ProfileController"
module.exports = {
    
    // Traz os dados do BD, da tabela "profile"
    // Ver a nomenclatura de cada ação em "db/init.js"
    async get() {

        const db = await Database();

        const data = await db.get(`SELECT * FROM profile`);

        await db.close();

        // Normalização de dados. Pega os dados do bd (com underline) e passa para as propriedades desde objeto conforme está no restante do código (com hífem)
        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour,
        };
    },
    
    // Altera os dados do perfil no BD
    async update(newData){
        
        const db = await Database();
        
        await db.run(`UPDATE profile SET 
                    name = "${newData.name}",
                    avatar = "${newData.avatar}",
                    monthly_budget = ${newData["monthly-budget"]},
                    days_per_week = ${newData["days-per-week"]},
                    hours_per_day = ${newData["hours-per-day"]},
                    vacation_per_year = ${newData["vacation-per-year"]},
                    value_hour = ${newData["value-hour"]}
        `)

        await db.close();
    }
}