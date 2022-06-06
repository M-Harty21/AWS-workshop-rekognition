export class Celebrity {
    name: string | undefined
    gender: string | undefined
    smile: {
        Confidence: any
        Value: boolean
    } | undefined 
    emotions: emotions[] | undefined
}

class emotions{
    Confidence: any
    Type: string | undefined
}

/**
emotions: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
gender: "Male"
name: "Tom Hardy"
smile: {Confidence: 99.38912200927734, Value: false}
 */