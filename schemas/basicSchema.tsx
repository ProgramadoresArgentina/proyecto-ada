import * as yup from "yup";

export const basicSchema = yup.object().shape({
    basic: yup.array().of(
        yup.object().shape({
            email: yup.string().required("email required").email("Ingresa un email valido"),
            name: yup.string().required("Ingresa tu nombre"),
            position: yup.string().required("Ingresa tu puesto")
        })
    ),
    experiences: yup.array().of(
        yup.object().shape({

            title: yup.string().required("Ingresa tu titulo"),
            company: yup.string().required("Ingresa tu empresa"),
            dateSince: yup.string().required("Ingresa fecha de inicio"),
            place: yup.string().required("Ingresa el lugar"),
            description: yup.string().required("Ingresa una descripcion")
        })
    ),
    education: yup.array().of(
        yup.object().shape({

            degree: yup.string().required("Ingresa tu titulo"),
            university: yup.string().required("Ingresa la institucion"),
            dateSince: yup.string().required("Ingresa fecha de inicio"),
            place: yup.string().required("Ingresa el lugar"),
            description: yup.string().required("Ingresa una descripcion")
        })
    ),
    certificates: yup.array().of(
        yup.object().shape({

            degree: yup.string().required("Ingresa tu titulo"),
            university: yup.string().required("Ingresa el lugar"),
            dateSince: yup.string().required("Ingresa fecha de inicio"),
            description: yup.string().required("Ingresa una descripcion")
        })
    )

});


