import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('blogs')
export class Blog {
  @PrimaryColumn('uuid') 
  id: string;

  @Column({ type: 'varchar', nullable: false }) 
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}