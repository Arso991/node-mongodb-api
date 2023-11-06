const mongoose = require("mongoose");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../config/token");
const Mail = require("../facades/Mail");

function generateCode(length) {
  const charaters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomI = Math.floor(Math.random() * charaters.length);
    code += charaters.charAt(randomI);
  }

  return code;
}

const register = async (req, res) => {
  try {
    //génération d'un code aléatoire
    const code = generateCode(4);

    //recuperation des informations entrées
    const { username, email, password } = req.body;
    console.log(req.body);
    // cryptage du mot de passe
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordCrypt = await bcrypt.hash(password, salt);

    // création d'une nouvelle instance user
    const newUser = new Users({
      username: username,
      code: code,
      email: email,
      email_verified_at:"",
      password: passwordCrypt,
    });

    //envoie du code de confirmation dans le mail de celui qui s'inscrit
    await Mail.to(email).send(code);

    //sauvegarde de l'utilisateur dans la base de données
    const savedUser = await newUser.save();
    res
      .status(200)
      .send({
        savedUser,
        msg: "Inscription effectuée, un code de vérification a été envoyé dans votre mail pour cofirmer votre inscription",
      });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur", error);
    res.status(500).send({
      msg:
        "Erreur lors de l'inscription, veuillez réessayer. Si vous avez déjà un compte veuillez vous connecter",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const resp = await Users.findOne({ email: email });

    if (!resp) {
      res.status(401).send({ msg: "Email ou mot de passe incorrect" });
      return;
    }

    if(resp.email_verified != true){
      res.status(401).send({msg: "Vous ne pouvez pas vous connecter car votre compte n'a pas été confirmé"})
    }

    const matchPassword = await bcrypt.compare(password, resp.password);
    if (matchPassword) {
      const user = {
        _id: resp._id,
        username: resp.username,
        email: resp.email,
      };

      const accessToken = generateAccessToken(user);

      res.status(200).send({ accessToken, msg: "Connecté(e) avec succès !" });
    } else {
      res.status(401).send({ msg: "Email ou mot de passe incorrect, accès non autorisé" });
      return;
    }
  } catch (error) {
    console.error("Erreur lors de la connexion", error);
    res.status(500).send({
      msg:
        "Erreur lors de la connexion. Si vous n'avez pas un compte veuillez vous inscrire",
    });
  }
};

const validation = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await Users.findOne({ email, code });
    console.log(user);
    if (!user) {
      res
        .status(401)
        .send({ msg: "Vous avez entré un email ou un code invalide !" });
        return
    }
    
    const resp = await Users.findOneAndUpdate(
      { email: user.email },
      { email_verified: true, email_verified_at: new Date() },
      { new: true }
    );

    res.send({resp, msg:"Votre compte a été confirmé, vous pouvez vous connecter à présent"})
  } catch (error) {
    console.error("Erreur lors de la confirmation", error);
    res.status(500).send({ msg: "Erreur lors de la confirmation" });
  }
};

module.exports = { register, signIn, validation };

/* //recuperation des informations entrées
const { username, email, password } = req.body;

// cryptage du mot de passe
const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds);
const passwordCrypt = await bcrypt.hash(password, salt);

await users.findOne({}, {}, { sort: { _id: -1 } }),
  function (err, user) {
    let idNext = 1;

    if (user) {
      idNext = user._id + 1;
    }

    // création d'une nouvelle instance user
    const newUser = new users({
      _id: idNext,
      username: username,
      email: email,
      password: passwordCrypt,
    });
    //sauvegarde de l'utilisateur dans la base de données
    newUser.save((err, savedUser) => {
      if (err) {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
        res
          .status(500)
          .send({
            error: "Erreur lors de l'inscription, veuillez réessayer",
          });
      } else {
        console.log("Utilisateur ajouté");
        res.status(201).json({ msg: "Inscription effectuée" });
      }
    });
  }; */
