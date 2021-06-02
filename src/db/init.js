const Database = require('./config');

const initDb = {

    // Cria uma função "async"
    async init(){
    // "async": Assincronismo. Pega cada "await" para jogar no "Event loop"

        // Abre conexão com o BD
        const db = await Database();
        // "await": "Espera" a execução da função

        // Cria tabelas
        await db.exec(`CREATE TABLE profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthly_budget INT,
                days_per_week INT,
                hours_per_day INT,
                vacation_per_year INT,
                value_hour INT
            );`
        );

        await db.exec(`CREATE TABLE jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                created_at DATETIME
            );`
        );

        //inserta dados
        await db.run(`INSERT INTO profile (
                name,
                avatar,
                monthly_budget,
                days_per_week,
                hours_per_day,
                vacation_per_year,
                value_hour
            ) VALUES (
                "",
                "",
                NULL,
                NULL,
                NULL,
                NULL,
                0
            );`
        );

        // Fecha conexão com BD
        await db.close()
    }       
}

initDb.init()