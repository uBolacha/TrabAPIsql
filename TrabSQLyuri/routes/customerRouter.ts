import express, {Request, Response} from "express";
import * as productModel from '../models/customer'
import { Customer, BasicCustomer } from '../types/customer.js'
const customerRouter = express.Router()

customerRouter.get('/', async (req: Request, res: Response) => {
    productModel.findAll((err: Error, customers: Customer[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "data": customers })
    });
});

customerRouter.get('/:id', async (req: Request, res: Response) => {
    const customerId: number = Number(req.params.id)
    productModel.findOne(customerId, (err: Error, customer: Customer) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "data": customer })
    })
})

customerRouter.post('/', async (req: Request, res: Response) => {
    const newCustomer: Customer = req.body
    productModel.create(newCustomer, (err: Error, customerId: number) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "customerId": customerId })
    })
})

customerRouter.put('/:id', async (req:Request, res:Response) => {
    const customer: Customer = req.body
    productModel.update(customer, (err: Error) => {
        if(err) {
            return res.status(500).json({ "message": err.message})
        }

        res.status(200).send()
    })
})

customerRouter.delete('/:id', async(req: Request, res: Response) => {
    const customerId: number = Number(req.params.id)
    productModel.deleteCustomer(customerId, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message })
        }

        res.status(200).json({ "message": "Product deleted succesfully"})
    })
})

export {customerRouter}