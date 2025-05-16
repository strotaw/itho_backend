import type { HttpContext } from '@adonisjs/core/http'
import DataSiswa from '#models/data_siswa'


export default class DataSiswasController {
    public async index({response }: HttpContext)
        {
            const DataSiswa1 = await DataSiswa.all();
            return response.ok(DataSiswa1);
        }

    public async store({request, response }: HttpContext)
        { 
            const data = request.only(['nama', 'kelas', 'jurusan']);
            const DataSiswa1 = await DataSiswa.create(data);
            return response.created(DataSiswa1);
        }

    public async show({params, response }: HttpContext)
        {
            const DataSiswa1 = await DataSiswa.find(params.id);
            if (!DataSiswa1) {
                return response.notFound({ message: 'Gada Cok' });
            }
            return response.ok({
                status: 'success',
                message: 'Data Siswa found',
                data: DataSiswa1
            });
        }

    public async update({params, request, response }: HttpContext)
        {
            const DataSiswa1 = await DataSiswa.find(params.id);
            if (!DataSiswa1) {
                return response.notFound({ message: 'Gada Cok' });
            }
            const data = request.only(['nama', 'kelas', 'jurusan']); 
            DataSiswa1.merge(data);
            await DataSiswa1.save();
            return response.ok(DataSiswa1);
        }

    public async destroy({params, response }: HttpContext)
        {
            const DataSiswa1 = await DataSiswa.find(params.id);
            if (!DataSiswa1) {
                return response.notFound({ message: 'Gada Cok' });
            }
            
            await DataSiswa1.delete();
            return response.noContent();
        }
}