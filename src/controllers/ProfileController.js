// Pega os dados do arquivo "Profile.js"
const Profile = require('../model/Profile')

module.exports = {
        
    // Página dos dados pessoais (get)
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get() }) 
        // "get()": PEGA os dados
    },
    
    // Alteração dos dados pessoais (post)
    async update(req, res) {
        
        // req.body para pegar os dados
        const data = req.body
        
        // definir quantas semanas tem um ano
        const weeksPerYear = 52
        
        // remover as semanas de férias do ano, para pegar quantas semanas tem em um mês
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        
        // Total de horas trabalhadas na semana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

        // total de horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        // Valor da hora/trabalho do usuário
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        // Pega os dados do BD e passa para uma constante
        const profile = await Profile.get();
        
        // Altera os dados de profile no BD
        await Profile.update({
        // "update()": ALTERA os dados
                
            ...profile,
            ...req.body,
            "value-hour": valueHour 
        })

        // Rederiza página dos dados do usuário
        return res.redirect('/')
    }
}