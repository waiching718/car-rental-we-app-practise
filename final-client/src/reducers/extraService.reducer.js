const services = [
    {
        id: 1,
        service: "Additional-driver",
        price: 20,
    },
    {
        id: 2,
        service: "Prepaid-Fuel",
        price: 25,
    },
    {
        id: 3,
        service: "Car-Protection",
        price: 30
    },
    {
        id: 4,
        service: "Baby-Seat",
        price: 10
    }
]

export const extraServiceReducer = (state= services, action) =>{
    return state;
}
