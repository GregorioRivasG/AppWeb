import { Request, Response } from "express";
import { Product } from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, descri, qty, price } = req.body;
        
        const newProduct = new Product({
            name,
            descri,
            qty,
            price
        });

        await newProduct.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error en createProduct:", error);
        return res.status(500).json({ message: "Error al crear producto" });
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ deleteDate: null });
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener productos" });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || product.deleteDate) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener producto" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { name, descri, qty, price, status } = req.body;
        
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, descri, qty, price, status },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.json(updatedProduct);
    } catch (error) {
        console.error("Error en updateProduct:", error);
        return res.status(500).json({ message: "Error al actualizar producto" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { deleteDate: new Date(), status: false },
            { new: true }
        );

        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.json({ 
            message: `Producto ${deletedProduct.name} eliminado`,
            product: deletedProduct 
        });
    } catch (error) {
        console.error("Error en deleteProduct:", error);
        return res.status(500).json({ message: "Error al eliminar producto" });
    }
};