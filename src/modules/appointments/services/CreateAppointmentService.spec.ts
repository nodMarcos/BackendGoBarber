
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository
        );
    })

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        })

        const appointment = await createAppointment.execute({
            date: new Date(2021, 4, 10, 13),
            user_id: 'user_id',
            provider_id: 'provider_id'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider_id');

    });

    it('should not be able to create a two appointment on the same time', async () => {

        const appointmentDate = new Date(2021, 4, 20, 11);
        await createAppointment.execute({
            date: appointmentDate,
            user_id: 'user_id',
            provider_id: 'provider_id'
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: 'user_id',
                provider_id: 'provider_id'
            })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        })

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 10, 11),
                user_id: 'user_id',
                provider_id: 'provider_id'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment with the same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        })

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 10, 13),
                user_id: 'user_id',
                provider_id: 'user_id'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment with the same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        })

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 10, 13),
                user_id: 'user_id',
                provider_id: 'user_id'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment before 8am and 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        })

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 11, 7),
                user_id: 'user_id',
                provider_id: 'provider_id'
            })
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 11, 18),
                user_id: 'user_id',
                provider_id: 'provider_id'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});