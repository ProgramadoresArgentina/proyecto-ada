import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
    // email: yup.string().email("Please enter a valid email").required("Required"),
    // age: yup.number().positive().integer().required("Required")

    basic: yup.array().of(
        yup.object().shape({
            //   name: Yup.string().required("Name required"),
            name: yup.string().required("requerido"),
            position: yup.string().required("requerido"),
            descripcion: yup.string()
        })
    ),
    experiences: yup.array().of(
        yup.object().shape({
            title: yup.string().required("requerido"),
            company: yup.string().required("requerido"),
            dateSince: yup.string().required("requerido"),
            description: yup.string().required("requerido"),
            dateTo: yup.date()
            .when('currently', {
                is: false,
                then: yup.date().required('requerido')
            }),
            currently: yup.boolean()
        })
    ),
    education: yup.array().of(
        yup.object().shape({
            degree: yup.string().required("requerido"),
            university: yup.string().required("requerido"),
            dateSince: yup.string().required("requerido"),
            dateTo: yup.date().when('currently', {
                is: false,
                then: yup.date().required('requerido')
            }),
            currently: yup.boolean(),      
            description: yup.string()
        })
    ),
    certificates: yup.array().of(
        yup.object().shape({
            degree: yup.string().required("requerido"),
            university: yup.string().required("requerido"),
            linkId: yup.string().required("requerido")
        })
    ),
    languages: yup.array().of(
        yup.object().shape({
            name: yup.string().required("requerido"),
            level: yup.string().required("requerido")
        })
    )

});


