import { Producto } from "src/producto/entidades/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50})
    nombre: string

    @Column({ type: 'varchar', length: 50})
    descripcion: string

    @OneToMany(() => Producto, (producto) => producto.categoria_id)
    productos: Producto[]

}