import type { Employee } from "./types";

const Sophie: Employee = {
    uniqueID: 0,
    name: "Sophie Turner",
    subordinates: [],
};

const Georgina: Employee = {
    uniqueID: 1,
    name: "Georgina Flangy",
    subordinates: [Sophie],
};

const Bruce: Employee = {
    uniqueID: 2,
    name: "Bruce Willis",
    subordinates: [Georgina, Sophie],
};

const Gary: Employee = {
    uniqueID: 3,
    name: "Gary Styles",
    subordinates: [],
};

const George: Employee = {
    uniqueID: 4,
    name: "George Carrey",
    subordinates: [],
};

const Thomas: Employee = {
    uniqueID: 5,
    name: "Thomas Brown",
    subordinates: [],
};

const Harry: Employee = {
    uniqueID: 6,
    name: "Harry Tobs",
    subordinates: [],
};

const Tyler: Employee = {
    uniqueID: 7,
    name: "Tyler Simpson",
    subordinates: [],
};

const Will: Employee = {
    uniqueID: 8,
    name: "Will Turner",
    subordinates: [
        {
            uniqueID: 100,
            name: "fake",
            subordinates: [],
        },
    ],
};

const Tina: Employee = {
    uniqueID: 9,
    name: "Tina Teff",
    subordinates: [],
};

const Bob: Employee = {
    uniqueID: 10,
    name: "Bob Saget",
    subordinates: [],
};

const Mary: Employee = {
    uniqueID: 11,
    name: "Mary Blue",
    subordinates: [],
};

const Cassandra: Employee = {
    uniqueID: 12,
    name: "Cassandra Reynolds",
    subordinates: [Harry, Thomas, George, Gary],
};

const Sarah: Employee = {
    uniqueID: 13,
    name: "Sarah Donald",
    subordinates: [Cassandra, Mary, Bob, Tina, Will],
};

export const Mark: Employee = {
    uniqueID: 14,
    name: "Mark Zuckerberg",
    subordinates: [Sarah, Tyler, Bruce, Georgina],
};