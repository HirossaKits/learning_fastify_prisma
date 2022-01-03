import { resolve } from "path/posix"

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getProducts = async (req, reply) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }
    })
    reply.send(products)
  } catch (error) {
    reply.status(500).send(error)
  }
}

const getProduct = async (req, reply) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: { id: id },
      include: { category: true }
    })
    reply.send(product)
  } catch (error) {
    reply.status(500).send(error)
  }
}

const addProduct = async (req, reply) => {
  try {
    const product = await prisma.product.create({
      data: req.body,
    })
    reply.status(201).send(product)
  } catch (error) {
    reply.status(500).send(error)
  }
}

const deleteProduct = async (req, reply) => {
  const { id } = req.params
  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id: id
      }
    })
    reply.send(deleteProduct)
  } catch (error) {
    reply.status(500).send(error)
  }
}

const updateProduct = async (req, reply) => {
  try {
    const { id } = req.params
    const product = await prisma.product.update({
      where: {
        id: id
      },
      data: req.body,
      include: { category: true }
    })
    reply.send(product)
  } catch (error) {
    reply.status(500).send(error)
  }
}

export = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct
}