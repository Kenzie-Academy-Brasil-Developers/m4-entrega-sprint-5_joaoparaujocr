import AppDataSource from "../data-source";
import Property from "../entities/properties.entities";
import SchedulesUserProperties from "../entities/schedules_user_properties.entities";
import { Users } from "../entities/users.entities";
import AppError from "../errors";
import { IScheduleRequest } from "../interfaces/schedules";

export const schedulesCreateService = async ({ userId, date, hour, propertyId }:IScheduleRequest) => {
  const schedulesRepository = AppDataSource.getRepository(SchedulesUserProperties);
  const propertiesRepository = AppDataSource.getRepository(Property);
  const usersRepository = AppDataSource.getRepository(Users);

  const dateSchedule = new Date(`${date} ${hour}`);
  const hourSchedule = dateSchedule.getHours()
  const minuteSchedule = dateSchedule.getMinutes();
  const daySchedule = dateSchedule.getDay();

  if((hourSchedule <= 8 || hourSchedule >= 18) && minuteSchedule > 0 || daySchedule === 0 || daySchedule === 6) {
    throw new AppError("Time not available")
  }
  
  const property = await propertiesRepository.findOneBy({ id: propertyId });
  if(!property) throw new AppError("Property not found", 404);

  const schedule = await schedulesRepository.findOneBy({ date, hour });
  if(schedule) throw new AppError("There is already a visitor at this time", 400);

  const user = await usersRepository.findOneBy({ id: userId });

  const newSchedule = schedulesRepository.create({
    user: user!,
    date,
    hour,
    property
  })

  await schedulesRepository.save(newSchedule);

  return await schedulesRepository.findOneBy({ id: newSchedule.id })
}

export const schedulesListPropertyService = async (id: string) =>{
  const propertiesRepository = AppDataSource.getRepository(Property);

  const listScheules = await propertiesRepository.findOne({
    where: {
      id: id
    },
    relations: {
      schedules: true
    }
  });

  if(!listScheules) throw new AppError("Property not found", 404);
  return listScheules
}