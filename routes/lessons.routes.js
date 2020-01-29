module.exports = app => {
    const lessons = require("../db/lessons.controller.js");
  
    // Create a new Lesson
    app.post("/lessons", lessons.create);
  
    // Retrieve all Lessons
    app.get("/lessons", lessons.findAll);
  
    // Retrieve a single Lesson with lessonId
    app.get("/lessons/:lessonId", lessons.findOne);
  
    // Update a Lesson with lessonid
    app.put("/lessons/:lessonId", lessons.update);
  
    // Delete a Lesson with lessonid
    app.delete("/lessons/:lessonId", lessons.delete);
  
    // Create a new Lesson
    app.delete("/lessons", lessons.deleteAll);
  };