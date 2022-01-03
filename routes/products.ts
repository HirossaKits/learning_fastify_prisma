const { getProducts, getProduct, addProduct, deleteProduct, updateProduct } = require('../controller/products')

const Product = {
  tyep: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    price: { type: 'integer' },
    createdAt: { type: 'string' },
    categoryId: { type: 'string' },
    category: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' }
      }
    },
  }
}

const getProductsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Product
      }
    }
  },
  handler: getProducts
}

const getProductOpts = {
  schema: {
    params: {
      id: { type: 'integer' }
    },
    response: {
      200: Product
    }
  },
  handler: getProduct
}

const postProductOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'price'],
      properties: {
        name: { type: 'string' },
        price: { type: 'integer' }
      }
    }
  },
  handler: addProduct
}

const deleteProductOpts = {
  schema: {
    params: {
      id: { type: 'integer' }
    },
    response: {
      200: Product
    }
  },
  handler: deleteProduct
}

const updateProductOpts = {
  schema: {
    params: {
      id: { type: 'integer' }
    },
    response: {
      200: Product,
    }
  },
  handler: updateProduct
}

function productRoutes(fastify, options, done) {

  fastify.get('/products', getProductsOpts)
  fastify.get('/products/:id', getProductOpts)
  fastify.post('/products', postProductOpts)
  fastify.delete('/products/:id', deleteProductOpts)
  fastify.put('/products/:id', updateProductOpts)

  done()
}

export = productRoutes