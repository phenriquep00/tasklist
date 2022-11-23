import express, { response } from "express";
import { PrismaClient } from "@prisma/client";
import e from "express";
import { create } from "domain";
import axios from "axios";

export const routes = express.Router();

const prisma = new PrismaClient();

// simple testing route
routes.get("/test", async (req, res) => {
  return res.json("test1");
});

/** --------------------------------------------USER-------------------------------------------------**/
// get all users on database
routes.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  return res.json([users]);
});

// create single user
routes.post("/user", async (req, res) => {
  const body = req.body;

  const new_user: any = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      pictureUrl: body.pictureUrl,
      tasklist: {
        create: {
          name: "My day",
          color: body.color,
        },
      },
    },
  });

  return res.status(201).json(new_user);
});

// get single user
routes.get("/user/:id", async (req, res) => {
  const userId: any = req.params.id;

  const user = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      pictureUrl: true,
      tasklist: true,
    },
    where: {
      id: String(userId),
    },
  });

  return res.status(200).json(user);
});

// get single user by email
routes.get("/check-user/:email", async (req, res) => {
  const userEmail: any = req.params.email;

  const user = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      pictureUrl: true,
      tasklist: true,
    },
    where: {
      email: String(userEmail),
    },
  });

  return res.status(200).json(user);
});

// get user id by email
routes.get("/userId/:email", async (req, res) => {
  const userEmail = req.params.email;

  const userId = await prisma.user.findFirst({
    select: {
      id: true,
    },
    where: {
      email: userEmail,
    },
  });

  return res.status(200).json(userId);
});

/** --------------------------------------------TASKLIST---------------------------------------------**/
// get all tasklists on database
routes.get("/tasklists", async (req, res) => {
  const tasklist = await prisma.tasklist.findMany();

  return res.json([tasklist]);
});

// get all tasklists from a user
routes.get("/tasklists/:userEmail", async (req, res) => {
  const userEmail: string = req.params.userEmail;

  const tasklists = await prisma.tasklist.findMany({
    select: {
      name: true,
      color: true,
      tasks: true,
    },
    where: {
      user: {
        email: userEmail,
      },
    },
  });

  return res.status(200).json(tasklists);
});

//get tasklist id by name
routes.get("/tasklist/id/:name/:username", async (req, res) => {
  const username: string = req.params.username;
  const name: string = req.params.name;

  const id = await prisma.tasklist.findFirst({
    select: {
      id: true,
    },
    where: {
      user: {
        name: username,
      },
      name,
    },
  });

  return res.status(200).json(id);
});

// create tasklist
routes.post("/tasklist/:id", async (req, res) => {

  const id: string = req.params.id;
  const newTasklistBody = req.body;
  
  const newTasklist: any = await prisma.tasklist.create({
    data: {
      name: newTasklistBody.name,
      color: newTasklistBody.color,
      tasks: {
        create: {
          description: "welcome to your new tasklist!",
          completed: false,
          priority: "common",
        },
      },
      user: {
        connect: {
          id,
        },
      },
    },
  });

  return res.status(200).json(newTasklist);
});

/** --------------------------------------------TASK-------------------------------------------------**/
// get all tasks on database
routes.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();

  return res.json([tasks]);
});

// get tasks from a given tasklist
routes.get("/tasks/:userEmail/:tasklist", async (req, res) => {
  const tasklistName: string = req.params.tasklist;
  const userEmail = req.params.userEmail;

  const tasks = await prisma.task.findMany({
    select: {
      description: true,
      createdAt: true,
      priority: true,
    },
    where: {
      tasklist: {
        user: {
          email: userEmail,
        },
        name: tasklistName,
      },
      completed: false,
    },
  });

  return res.status(200).json(tasks);
});

// create a new task
routes.post("/task/:tasklistId", async (req, res) => {
  const tasklistId: string = req.params.tasklistId;
  const newTaskBody = req.body;

  const newTask: any = await prisma.task.create({
    data: {
      description: newTaskBody.description,
      completed: false,
      priority: "common",
      tasklist: {
        connect: {
          id: tasklistId,
        },
      },
    },
  });

  return res.status(200).json(newTask);
});

// delete all entrie DO NOT USE
routes.delete("/all", async (req, res) => {
  await prisma.task.deleteMany({});
  await prisma.tasklist.deleteMany({});
  await prisma.user.deleteMany({});

  return res.json([true]);
});

//TODO: create update task route to change task.completed to true