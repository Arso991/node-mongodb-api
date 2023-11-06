const Courses = require("../models/courses");

const addCourses = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { title, client_name, localisation } = req.body;
    if (!user_id) {
      res.status(404).send({ msg: "Votre session a expiré" });
      return;
    }

    const newCourse = new Courses({
      title: title,
      client_name: client_name,
      localisation: localisation,
      user_id: user_id,
    });

    const addCourse = await newCourse.save();

    res.status(200).send({ addCourse, msg: "Course ajoutée !" });
  } catch (error) {
    console.error("Erreur lors de l'ajout", error);
    res.status(500).send({ msg: "Erreur lors de l'ajout de la course" });
  }
};

const allCourses = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const resp = await Courses.find({user_id:user_id});
    if (!resp) {
      res.status(404).send({ msg: "Liste des courses introuvables" });
      return;
    }
    res.status(200).send(resp);
  } catch (error) {
    console.error("Erreur lors de la récupération", error);
    res.status(500).send({
      error: "Erreur lors de la récupération de la liste des courses",
    });
  }
};

const aCourse = async (req, res) => {
  try {
    const course = await Courses.findById(req.params._id);
    if (!course) {
      res.status(404).send({ msg: "Course introuvable" });
      return;
    }
    res.status(200).send({ course });
  } catch (error) {
    console.error("Erreur lors de la récupération", error);
    res
      .status(500)
      .send({ error: "Erreur lors de la récupération de la course" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { title, client_name, localisation } = req.body;

    const course = await Courses.findOneAndUpdate(
      { _id: req.params._id },
      { title: title, client_name: client_name, localisation: localisation },
      { new: true }
    );

    if (!course) {
      res.status(404).send({ msg: "Course introuvable" });
      return;
    }

    res.status(200).send({ course, msg: "Course modifiée" });
  } catch (error) {
    console.error("Erreur lors de la modification", error);
    res
      .status(500)
      .send({ error: "Erreur lors de la modification de la course" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Courses.findOneAndRemove({ _id: req.params._id });

    if (!course) {
      res.status(404).send({ msg: "Course introuvable" });
      return;
    }

    res.status(200).send({ msg: "Course supprimée" });
  } catch (error) {
    console.error("Erreur lors de la suppression", error);
    res
      .status(500)
      .send({ error: "Erreur lors de la suppression de la course" });
  }
};

const makeImportant = async (req, res) => {
  try {
    const respon = await Courses.findById(req.params._id);

    const resp = await Courses.findOneAndUpdate(
      { _id: req.params._id },
      { is_important: !respon.is_important }
    );
    
    if (respon.is_important == true) {
      res.status(200).send({ msg: "Marquer comme normal" });
      return;
    } 
    if (respon.is_important == false) {
      res.status(200).send({ msg: "Marquer comme important" });
      return;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour", error);
    res.status(500).send({ error: "Erreur lors de la mise à jour" });
  }
};

const makeFinish = async (req, res) => {
    try {
      const respon = await Courses.findById(req.params._id);
  
      const resp = await Courses.findOneAndUpdate(
        { _id: req.params._id },
        { status: "is_finished" }
      );
      
      if (respon.status == "is_finished") {
        res.status(200).send({ msg: "Marquer comme en cours" });
        return;
      } 
     /*  if (respon.is_finished == false) {
        res.status(200).send({ msg: "Marquer comme exécuter" });
        return;
      } */
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
      res.status(500).send({ error: "Erreur lors de la mise à jour" });
    }
  };

  const makeProgress = async (req, res) => {
    try {
      const respon = await Courses.findById(req.params._id);
  
      const resp = await Courses.findOneAndUpdate(
        { _id: req.params._id },
        { status: "in_progress" }
      );
      
      if (respon.status == "in_progress") {
        res.status(200).send({ msg: "Marquer comme en attente" });
        return;
      } 
      /* if (respon.in_progress == false) {
        res.status(200).send({ msg: "Marquer comme en cours" });
        return;
      } */
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
      res.status(500).send({ error: "Erreur lors de la mise à jour" });
    }
  };

  const coursesProgress = async function(req, res){
    try {
      const user_id = req.params.user_id;

      const resp = await Courses.find({status:"in_progress", user_id:user_id})
      if(!resp){
        res.status(404).send({msg:"Aucune course en cours"})
        return
      }
      res.status(200).send(resp)
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste", error);
      res.status(500).send({ error: "Erreur lors de la récupération de la liste des courses en cours" });
    }
  }

  const coursesFinish = async function(req, res){
    try {
      const user_id = req.params.user_id;

      const resp = await Courses.find({status:"is_finished", user_id:user_id})
      if(!resp){
        res.status(404).send({msg:"Aucune course terminéé"})
        return
      }
      res.status(200).send(resp)
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste", error);
      res.status(500).send({ error: "Erreur lors de la récupération de la liste des courses terminées" });
    }
  }

module.exports = {
  allCourses,
  addCourses,
  aCourse,
  updateCourse,
  deleteCourse,
  makeImportant,
  makeFinish,
  makeProgress,
  coursesProgress,
  coursesFinish
};
