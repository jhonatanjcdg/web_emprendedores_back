import { Entity, Column, ManyToOne, OneToMany, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EventType } from 'src/enums/event.enum';
import { User } from 'src/modules/users/users.entity';
import { EventAttendee } from './event-attendee.entity';
import { EventProduct } from './event-product.entity';
import { Location } from 'src/modules/locations/locations.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: EventType })
  eventType: EventType;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => Location)
  location: Location;

  @ManyToOne(() => User)
  organizer: User;

  @Column({ default: true })
  isPublic: boolean;

  @Column({ nullable: true })
  maxAttendees: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @OneToMany(() => EventProduct, eventProduct => eventProduct.event)
  products: EventProduct[];

  @OneToMany(() => EventAttendee, attendee => attendee.event)
  attendees: EventAttendee[];
}