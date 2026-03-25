import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-bd17b-default-rtdb.europe-west1.firebasedatabase.app";

export async function storeExpense(expenseData) {
  const res = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
  const id = res.data.name;
  return id;
}

export async function fetchExpenses() {
  const res = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in res.data) {
    const expenseObj = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
