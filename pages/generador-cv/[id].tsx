import FormLayout from '../../components/FormComponents/FormLayout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { wrapper } from '../../store/store';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { launchToast } from '../../helpers/launchToast';

const ResumeForm = () => {
	const router = useRouter();
	const { id } = router.query;
	const dialogRef = useRef(null);

    function onClickDelete() {
		dialogRef.current.showModal();
		fetch(`/api/resume/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status === 200) {
                    router.push('/generador-cv');
					launchToast("success", "Curriculum eliminado correctamente");
				} else {
					launchToast("error", "No se pudo eliminar el blog");
				}
			})
			.finally(() => dialogRef.current.close());
    }

    return (
        <div className="bg-[#0D1116] pb-32 pt-24">
            <div className="mt-12 mx-auto max-w-7xl z-10">
                <div className="mb-10">
                    <h1 className='text-white text-4xl font-semibold mb-2'>
                        {
                            !id || Number(id)==0 ? 'Generando nuevo curriculum' : 'Editando curriculum'
                        }
                    </h1>
                    {
                        id && Number(id)>0 &&
                        <button
                            type="button"
                            className="bg-gray-100 hover:bg-red-400 rounded px-3 py-2 text-black"
                            onClick={() => dialogRef.current.showModal()}
                        >
                            <p className="text-xs font-normal">Eliminar curriculum</p>
                        </button>
                    }
                </div>
                <FormLayout id={Number(id)} />
            </div>
			<dialog
				className="w-screen h-screen shadow-2xl backdrop-blur-md bg-white/20 max-w-full max-h-full"
				ref={dialogRef}
				open={false}>
				<div className="m-auto w-full h-full flex flex-col justify-center items-center">
					<div className="bg-[#0D1116] mb-4 p-5 flex flex-col gap-5
                    border-t-4 border-[#FFC800] w-1/3">
						<div className="flex items-center gap-4 flex-row">
                            <img src="https://cdn-icons-png.flaticon.com/256/6324/6324052.png"
                            className="w-[50px]" />
                            <div className="text-white">
                                <h5 className="text-lg">Eliminar Curriculum</h5>
                                <p className="text-base leading-6">
                                    Estás seguro de eliminar el curriculum?
                                </p>
                            </div>
                            </div>
						<div className="w-full flex items-center justify-end gap-5 border-t border-[#333] pt-5">
							<button
								className=" border-red-400 hover:text-white text-slate-400 font-bold rounded focus:outline-none focus:shadow-outline"
								onClick={() => dialogRef.current.close()}>
								Cancelar
							</button>
							<button
								onClick={() => onClickDelete()}
								className="bg-[#f0d05d] hover:bg-[#FFC800] text-[#0D1116] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
								Eliminar
							</button>
						</div>
					</div>
				</div>
			</dialog>
        </div>
    )
}


export default withPageAuthRequired(wrapper.withRedux(ResumeForm), {
    returnTo: '/generador-cv'
});


