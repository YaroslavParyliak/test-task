const Lesson = require("../controllers");

// Create and Save a new Lesson
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Lesson
    const lesson = new Lesson({
      id: req.body.id,
      theme: req.body.theme,
      lecturer: req.body.lecturer,
      studentgroup: req.body.studentgroup,
      office: req.body.office
    });
  
    // Save Lesson in the database
    Lesson.create(lesson, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Lesson."
        });
      else res.send(data);
    });
  };

// Retrieve all Lessons from the database.
exports.findAll = (req, res) => {
    Lesson.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving lessons."
        });
      else res.send(data);
    });
  };

// Find a single Lesson with a lessonId
exports.findOne = (req, res) => {
    Lesson.findById(req.params.lessonId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Lesson with id ${req.params.lessonId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Lesson with id " + req.params.lessonId
          });
        }
      } else res.send(data);
    });
  };

// Update a Lesson identified by the lessonId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Lesson.updateById(
    req.params.lessonId,
    new Lesson(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Lesson with id ${req.params.lessonId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Lesson with id " + req.params.lessonId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Lesson with the specified lessonId in the request
exports.delete = (req, res) => {
    Lesson.remove(req.params.lessonId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Lesson with id ${req.params.lessonId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Lesson with id " + req.params.lessonId
          });
        }
      } else res.send({ message: `Lesson was deleted successfully!` });
    });
  };

// Delete all Lessons from the database.
exports.deleteAll = (req, res) => {
    Lesson.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all lessons."
        });
      else res.send({ message: `All Lessons were deleted successfully!` });
    });
  };