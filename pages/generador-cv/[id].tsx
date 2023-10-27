import FormLayout from '../../components/FormComponents/FormLayout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { wrapper } from '../../store/store';
import { useRouter } from 'next/router';

const ResumeForm = () => {
	const router = useRouter();
	const { id } = router.query;

    return (
        <div className="bg-[#0D1116] pb-32 pt-24">
            <div className="mt-12 mx-auto max-w-7xl z-10">
                <h1 className='text-white text-4xl font-semibold mb-10'>
                    {
                        !id || Number(id)==0 ? 'Generando nuevo curriculum' : 'Editando curriculum 4'
                    }
                </h1>
                <FormLayout id={Number(id)} />
            </div>
        </div>
    )
}


export default withPageAuthRequired(wrapper.withRedux(ResumeForm), {
    returnTo: '/generador-cv'
});


