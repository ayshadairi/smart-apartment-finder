export async function GET() {
    const apartments = [
        {
            id: 1,
            title: "Downtown 2 Bed 1 Bath House",
            price: "$1,850/month",
            location: "Downtown St. John's",
            bedrooms: 2,
            description: "Charming heritage row house with original hardwood floors, exposed brick, and modern kitchen. Steps to George Street, Bannerman Park, and The Rooms. Includes laundry and private patio.",
            image: ""
        },
        {
            id: 2,
            title: "Modern Condo",
            price: "$2,400/month",
            location: "St. John's",
            bedrooms: 2,
            description: "Stunning ocean views! New construction with floor-to-ceiling windows, rooftop terrace, gym access. Walking distance to Signal Hill and Quidi Vidi Village. Parking included.",
            image: ""
        },
        {
            id: 3,
            title: "Studio 1 Bath - Near MUN",
            price: "$1,150/month",
            location: "Mount Royal - Near MUN",
            bedrooms: 0,
            description: "Perfect for students! Fully furnished studio, utilities and WiFi included. 5 minute walk to MUN's main campus. Shared laundry, bike storage, and study lounge.",
            image: ""
        },
        {
            id: 4,
            title: "Spacious 3BR Family Home",
            price: "$2,150/month",
            location: "Mount Pearl - Commonwealth Avenue",
            bedrooms: 3,
            description: "Large bungalow in quiet family neighborhood. Big backyard, finished basement, driveway parking. 15 min drive to downtown St. John's. Appliances included.",
            image: ""
        },
        {
            id: 5,
            title: "Cozy 1BR Near Avalon Mall",
            price: "$1,350/month",
            location: "Kenmount Terrace - St. John's",
            bedrooms: 1,
            description: "Modern basement apartment with separate entrance. In-suite laundry, dishwasher, and lots of storage. Close to bus routes, shopping, and restaurants.",
            image: ""
        },
        {
            id: 6,
            title: "Ocean View 2BR in CBS",
            price: "$1,950/month",
            location: "Conception Bay South - Topsail Beach",
            bedrooms: 2,
            description: "Beautiful ocean views from every window! Open concept living, large deck, and walking trails nearby. 20 minute drive to St. John's. Pet friendly!",
            image: ""
        }
    ];

    return new Response(JSON.stringify(apartments), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}