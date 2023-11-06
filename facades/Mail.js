const mailer = require("../config/mailer")

const Mail = {
    to : function(email){
        this.email = email
        return this
    },
    send : async function(code){
        await mailer.sendMail({
            from : "itoshi147@gmail.com",
            to : this.email,
            html:`<p>Bonjour! Voici ci dessous votre code de validation pour valider votre inscription</p><br/>
                    <strong>Code de validation: ${code}</strong>`,
            subject: "Code d'authentification"
        })
        
    }
}

module.exports = Mail