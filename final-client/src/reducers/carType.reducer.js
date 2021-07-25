const carTypes = [
        {
            id: 1,
            type: "SPORT",
            passenger: 2,
            load: 1,
            image: "https://msi-final-project-kyle-contents.s3.us-east-2.amazonaws.com/m3.jpg",
        },
        {
            id: 2,
            type: "SEDAN-LUXURY",
            passenger: 4,
            load: 2,
            image: "https://msi-final-project-kyle-contents.s3.us-east-2.amazonaws.com/a4.png"
        },
        {
            id: 3,
            type: "SEDAN",
            passenger: 4,
            load: 3,
            image: "https://msi-final-project-kyle-contents.s3.us-east-2.amazonaws.com/impreza.png"
        },
        {
            id: 4,
            type: "SUV-LUXURY",
            passenger: 4,
            load: 4,
            image: "https://msi-final-project-kyle-contents.s3.us-east-2.amazonaws.com/x5.jpg"
        },
        {
            id: 5,
            type: "SUV",
            passenger: 5,
            load: 4,
            image: "https://msi-final-project-kyle-contents.s3.us-east-2.amazonaws.com/rav4.jpg"
        },
        {
            id: 6,
            type: "VAN",
            passenger: 6,
            load: 5,
            image: "https://msi-final-project-kyle-contents.s3.us-east-2.amazonaws.com/sienna.png"
        },
        {
            id: 7,
            type: "TRUCK",
            passenger: 5,
            load: 7,
            image: "https://msi-final-project-kyle-contents.s3.us-east-2.amazonaws.com/putruck.jpg"
        }
    ];

export const carTypesReducer = (state = carTypes, action) =>{
    return state;
}
