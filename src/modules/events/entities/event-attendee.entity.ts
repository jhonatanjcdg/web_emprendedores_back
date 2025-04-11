import { User } from "src/modules/users/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Event } from "./events.entity";

@Entity()
@Unique(['event', 'user'])
export class EventAttendee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, event => event.attendees)
  event: Event;

  @ManyToOne(() => User, user => user.eventAttendances)
  user: User;

  @Column({ default: 'REGISTERED' })
  status: string;

  @Column({ nullable: true })
  checkInTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}