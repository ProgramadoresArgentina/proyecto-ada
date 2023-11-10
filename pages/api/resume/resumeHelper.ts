export function formatExperiences(experiencesArray, resumeId: number) {
    return experiencesArray.map(e => {
        return {
            title: e.title,
            company: e.company,
            description: e.description,
            currently: e.currently,
            dateSince: new Date(e.dateSince),
            dateTo: e.currently ? null : e.dateTo ? new Date(e.dateTo) : null,
            experienceId: resumeId,
        };
    })
}

export function formatCertifications(certificationsArray, resumeId: number) {
    return certificationsArray.map(e => {
        return {
            degree: e.degree,
            university: e.university,
            linkId: e.linkId,
            certificationsId: resumeId
        };
    })
}

export function formatEducations(educationsArray, resumeId: number) {
    return educationsArray.map(e => {
        return {
            degree: e.degree,
            university: e.university,
            currently: e.currently,
            description: e.description,
            dateSince: new Date(e.dateSince),
            dateTo: e.currently ? null : e.dateTo ? new Date(e.dateTo) : null,
            educationId: resumeId
        };
    })
}

export function formatLanguages(languagesArray, resumeId: number) {
    return languagesArray.map(e => {
        return {
            name: e.name,
            level: e.level,
            languagesId: resumeId
        };
    })
}