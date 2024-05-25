import { 
    Column,
    Entity,
    PrimaryGeneratedColumn,
  ManyToOne, JoinColumn,
  OneToOne} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Rol } from './rol.entity';
import { CarritoCompras } from 'src/carrito-compras/entidades/carrito-compras.entity';


@Entity()
export class usuario {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 20})
  cedula: string;
  @Column({ type: 'varchar', length: 50})
  nombre: string;
  @Column({ type: 'varchar', length: 50})
  apellido: string;
  @Column({ type: 'date'})
  fechaNacimiento: Date;
  @Column({ type: 'varchar', length: 15})
  telefono: string;
  @Column({ type: 'varchar', length: 50})
  correo: string;
  @Column({ type: 'varchar', length: 100})
  direccion: string;
  @Exclude()
  @Column({ type: 'varchar', length: 200})
  password: string;
  //Relacion Rol  
   @ManyToOne(() => Rol, (rol) => rol.usuario, {
    nullable: false,
    })
  @JoinColumn({ name: 'fk_rol_user' })
  fk_rol_user: Rol;

  @OneToOne(() => CarritoCompras, (cc) => cc.id)
  @JoinColumn({name: 'carrito_compras_id'})
  carrito_compras__id: CarritoCompras
}