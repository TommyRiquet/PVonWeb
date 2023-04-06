const User = require('../models/User')
import { Request, Response } from 'express'


export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email } = req.body
    const user = await User.create({ firstName, lastName, email })
    res.status(201).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll()
    res.status(200).json({ users })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const { firstName, lastName, email } = req.body
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    await user.save()
    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    await user.destroy()
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
