import { 
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,} from 'typeorm';
import { Categoria } from 'src/categoria/entidades/categoria.entity';
import { usuario } from 'src/usuario/entidades/usuario.entity';
import { Producto } from 'src/Producto/entidades/producto.entity';

@Entity()
export class CarritoCompras {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 10})
    cantidad: string

    @OneToOne(() => usuario, (user) => user.id, {
        nullable: false,
    })
    @JoinColumn({name: 'usuario_id'})
    usuario_id: usuario

    @ManyToOne(() => Producto, (producto) => producto.id)
    @JoinColumn({name: 'producto_id'})
    producto_id: Producto
}