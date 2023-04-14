import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
    // email: yup.string().email("Please enter a valid email").required("Required"),
    // age: yup.number().positive().integer().required("Required")

    basic: yup.array().of(
        yup.object().shape({
            //   name: Yup.string().required("Name required"),
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


