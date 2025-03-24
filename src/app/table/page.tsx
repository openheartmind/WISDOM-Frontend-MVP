import { Payment } from "./columns"

export default async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      title: "Meta-Science",
      owner: "Daniel",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      title: "OHM Gathering",
      owner: "Jack",
      email: "m@example.com",
    },
  ]
}
