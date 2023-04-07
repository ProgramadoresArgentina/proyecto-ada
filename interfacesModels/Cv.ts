import { Education } from "./Education"
import { Experience } from './Experience'
import { Certifications } from "./Certifications"


export interface Cv {
    id?: number,
    title: String,
    published? : boolean
    experience: Experience,
    education: Education,
    certifications: Certifications,
}
  