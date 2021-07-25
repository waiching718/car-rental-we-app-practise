
const penalties = [
    {
        id: 1,
        name: 'Late return',
        price: 20,
    },
    {
        id: 2,
        name: 'Early return',
        price: 20,
    },
    {
        id: 3,
        name: 'Refuel',
        price: 30,
    },
    {
        id: 4,
        name: 'Lost key',
        price: 40,
    },
    {
        id: 5,
        name: 'Damages',
        price: 50,
    }
]

export const penaltiesReducer = (state= penalties, action) =>{
    return state;
}
