const express = require('express')
const Task = require('../model/task')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner:req.user._id
    })



    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth,async (req, res) => {
    const match ={};
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    const completed= req.query.completed;

    let limit = 5;
    if(req.query.limit){
        limit = req.query.limit;
    }

    let skip = 0;
    if(req.query.skip){
        limit = req.query.skip;
    }

    try {
        await req.user.populate('tasks').populate({
            patch: 'tasks'

        });
        //const tasks = await Task.find({owner:req.user._id})
        res.send(req.user.tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        await task.populate('owner').execPopulate()

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findById(req.params.id)

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router