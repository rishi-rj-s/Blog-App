import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', nullable: false})
  name: string;

  @Column({type: 'varchar', nullable: false})
  comment: string;

  @Column('uuid') 
  blog_id: string; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

}
