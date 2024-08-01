const express = require('express');
const bodyParser = require('body-parser');
const sample =require('./models/todoListModels');
const app = express();
const port = 3001;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
dotenv.config();

const uri = process.env.mongo_uri;
mongoose.connect(uri);

const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/api/todos', (req, res) => {
//     res.json(todos);
// });
app.get('/api/todos', async (req, res) => {
    try {
        const allTask = await sample.find();

        if (allTask.length > 0) {
            res.status(200).json(allTask);
        } else {
            res.status(404).json({ message: 'No task found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
// app.post('/api/todos', (req, res) => {
//     const { task } = req.body;
//     if (task) {
//         const newTodo = { id: idCounter++, task };
//         todos.push(newTodo);
//         res.status(201).json(newTodo);
//     } else {
//         res.status(400).json({ error: 'Task content is required' });
//     }
// });

app.post('/add', async (req, res) => {
    try {
        const data = req.body;
        const result = await sample.create(data);
        console.log(result);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
});

// app.put('/api/todos/:id', (req, res) => {
//     const { id } = req.params;
//     const { task } = req.body;
//     const todo = todos.find(t => t.id == id);
//     if (todo && task) {
//         todo.task = task;
//         res.json(todo);
//     } else {
//         res.status(404).json({ error: 'Todo not found or invalid data' });
//     }
// });

app.put('/api/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const updatedDetails = await sample.findOneAndUpdate({ _id: id }, updatedData, options);

        if (updatedDetails) {
            res.status(200).json(updatedDetails);
        } else {
            res.status(404).json({ message: 'task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// app.delete('/api/todos/:id', (req, res) => {
//     const { id } = req.params;
//     const todoIndex = todos.findIndex(t => t.id == id);
//     if (todoIndex !== -1) {
//         todos.splice(todoIndex, 1);
//         res.status(204).end();
//     } else {
//         res.status(404).json({ error: 'Todo not found' });
//     }
// });

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const deletedDetails = await sample.findOneAndDelete({ _id: id });

        if (deletedDetails) {
            res.status(200).json({ message: 'task Details deleted successfully' });
        } else {
            res.status(404).json({ message: 'task Details not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
