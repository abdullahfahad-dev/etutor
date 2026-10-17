import { useForm } from "react-hook-form";
import useAuth from "../../../../../hook/useAuth";
import { Loading } from "../../../../../components/utils/Loading";
import PlaceholderImage from './../../../../../assets/placeholder.png'
import useSecureAxios from "../../../../../hook/useSecureAxios";
import Swal from "sweetalert2";
const ProfileSettings = () => {
    const { user, loading: userLoading, profileUpdate } = useAuth();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const {secureAxios} = useSecureAxios();
    const onSubmit = async (data) => {
        const userData = {
            name: data?.name,
            number: data?.number,
            photo_url: data?.photo_url,
            email: user.email
        }
        const result = await profileUpdate(userData.name, userData.photo_url);
        if(result.success){
            secureAxios.patch('/api/user/update-profile',userData).then(response => {
                if(response?.data?.success){
                    Swal.fire('Success', response?.data?.message, 'success')
                }
            })
        }
    }
    if(userLoading) return <Loading />
    return (
        <div className="mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-emerald-500 p-1">
                        <img src={user.photoURL || PlaceholderImage} alt="Profile" className="w-full h-full rounded-full" />
                    </div>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input type="text" {...register('name', { required: true })} defaultValue="Muzahidul Islam" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                            {errors?.name && <label className="text-red-500">Full name field is required</label>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input type="text" {...register('number', { required: true })} defaultValue="+880 1712 345 678" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                            {errors?.number && <label className="text-red-500">Number field is required</label>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input type="email" defaultValue={user?.email} disabled className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
                    </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                            <input type="text" {...register('photo_url', { required: true })} defaultValue={user.photoURL} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                            {errors?.photo_url && <label className="text-red-500">Photo URL field is required</label>}
                        </div>
                    <div className="pt-4">
                        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all cursor-pointer">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSettings;