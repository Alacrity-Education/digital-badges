import AwardeesView from "../components/AwardeesView";

export default function Awardees() {

    const awardees = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            hashedEmail: "hashed_john_doe",
            createdAt: new Date("2023-01-01"),
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            hashedEmail: "hashed_jane_smith",
            createdAt: new Date("2023-02-01"),
        },
    ];

    return (
        <AwardeesView awardees={awardees} />
    )
}