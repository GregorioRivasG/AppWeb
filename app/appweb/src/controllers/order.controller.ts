import { Request, Response } from "express";
import { Order } from "../models/Order";
import { Product } from "../models/Product";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { userID, products } = req.body;

        // Calcluar subtotal y total
        let subtotal = 0;
        const productsWithPrice = await Promise.all(products.map(async (item: any) => {
            const product = await Product.findById(item.productId);
            if (!product) throw new Error(`Producto ${item.productId} no encontrado`);
            
            const price = product.price;
            subtotal += price * item.quantity;
            
            return {
                productId: item.productId,
                quantity: item.quantity,
                price
            };
        }));

        const total = subtotal * 1.18;

        const newOrder = new Order({
            userID,
            products: productsWithPrice,
            subtotal,
            total,
            status: 'pendiente',
            updateDate: new Date()
        });

        await newOrder.save();
        return res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error en createOrder:", error);
        return res.status(500).json({ message: "Error al crear orden" });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Orden no encontrada" });
        return res.json(order);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener orden" });
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find();
        return res.json(orders);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener órdenes" });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status, updateDate: new Date() },
            { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ message: "Orden no encontrada" });
        return res.json(updatedOrder);
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar orden" });
    }
};

export const cancelOrder = async (req: Request, res: Response) => {
    try {
        const canceledOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelado', updateDate: new Date() },
            { new: true }
        );
        if (!canceledOrder) return res.status(404).json({ message: "Orden no encontrada" });
        return res.json(canceledOrder);
    } catch (error) {
        return res.status(500).json({ message: "Error al cancelar orden" });
    }
};