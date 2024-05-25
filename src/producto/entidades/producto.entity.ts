import { 
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,} from 'typeorm';
import { Categoria } from 'src/categoria/entidades/categoria.entity';
import { CarritoCompras } from 'src/carrito-compras/entidades/carrito-compras.entity';

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50})
    nombre: string

    @Column({ type: 'varchar', length: 1000})
    descripcion: string

    @Column({type: 'varchar', length: 15})
    precio: string

    @ManyToOne(() => Categoria, (categoria) => categoria.id, {
        nullable: false,
    })

    @JoinColumn({name: 'categoria_id'})
    categoria_id: Categoria

    @OneToMany(() => CarritoCompras, (CarritoCompras) => CarritoCompras.id)
    CarritoComprass: CarritoCompras[]
}