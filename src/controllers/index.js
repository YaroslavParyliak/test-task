const sql = require("../models");

// constructor
const Lesson = function(lesson) {
  this.theme = lesson.theme;
  this.lecturer = lesson.lecturer;
  this.studentgroup = lesson.studentgroup;
  this.office = lesson.office;
};

Lesson.create = (newLesson, result) => {
  sql.query("INSERT INTO lessons SET ?", newLesson, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created lesson: ", { id: res.insertId, ...newLesson });
    result(null, { id: res.insertId, ...newLesson });
  });
};

Lesson.findById = (lessonId, result) => {
  sql.query(`SELECT * FROM lessons WHERE id = ${lessonId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found lesson: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Lesson with the id
    result({ kind: "not_found" }, null);
  });
};

Lesson.getAll = result => {
  sql.query("SELECT * FROM lessons", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("lessons: ", res);
    result(null, res);
  });
};

Lesson.updateById = (id, lesson, result) => {
  sql.query(
    "UPDATE lessons SET theme = ?, lecturer = ?, studentgroup = ?, office = ? WHERE id = ?",
    [lesson.theme, lesson.lecturer, lesson.studentgroup, lesson.office, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found lesson with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated lesson: ", { id: id, ...lesson });
      result(null, { id: id, ...lesson });
    }
  );
};

Lesson.remove = (id, result) => {
  sql.query("DELETE FROM lessons WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Lesson with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted lesson with id: ", id);
    result(null, res);
  });
};

Lesson.removeAll = result => {
  sql.query("DELETE FROM lessons", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} lessons`);
    result(null, res);
  });
};

module.exports = Lesson;