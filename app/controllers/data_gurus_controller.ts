import type { HttpContext } from '@adonisjs/core/http'
import DataGuru from '#models/data_guru'

export default class DataGurusController {
    public async index({response }: HttpContext)
        {
            const DataGuru1 = await DataGuru.all();
            return response.ok(DataGuru1);
        }

    public async store({request, response }: HttpContext)
        { 
            const data = request.only(['nama', 'mapelajaran', 'email']);
            const DataGuru1 = await DataGuru.create(data);
            return response.created(DataGuru1);
        }

    public async show({params, response }: HttpContext)
        {
            const DataGuru1 = await DataGuru.find(params.id);
            if (!DataGuru1) {
                return response.notFound({ message: 'Gada Cok' });
            }
            return response.ok({
                status: 'success',
                message: 'Data Guru found',
                data: DataGuru1
            });
        }

    public async update({params, request, response }: HttpContext)
        {
            const DataGuru1 = await DataGuru.find(params.id);
            if (!DataGuru1) {
                return response.notFound({ message: 'Gada Cok' });
            }
            const data = request.only(['nama', 'mapelajaran', 'email']); 
            DataGuru1.merge(data);
            await DataGuru1.save();
            return response.ok(DataGuru1);
        }

    public async destroy({params, response }: HttpContext)
        {
            const DataGuru1 = await DataGuru.find(params.id);
            if (!DataGuru1) {
                return response.notFound({ message: 'Gada Cok' });
            }
            
            await DataGuru1.delete();
            return response.noContent();
        }
}