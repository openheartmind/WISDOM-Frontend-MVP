import { Payment } from "./columns"

export default async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      title: "Meta-Science",
      member: "Daniel",
      email: "m@example.com",
      contribution: "Website",
      mi: "",
      gi: "",
      co: ""
    },
    {
      id: "728ed52f",
      amount: 100,
      title: "OHM Gathering",
      member: "Jack",
      email: "m@example.com",
      contribution: "Works",
      mi: "",
      gi: "",
      co: ""
    },
  ]
}
