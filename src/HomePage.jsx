import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function HomePage() {
  const amountInput = useRef();
  const [isShow, setIShow] = useState(false);
  const [balance, setBalance] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let savedBalance = +localStorage.getItem("balance");
    let savedTransaction =
  JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTransaction);
  }, []);

  const deposit = () => {
    let amount = +amountInput.current.value;
    let newBalance = balance + amount;
    setBalance(newBalance);
    amountInput.current.value = "";
    toast.success("تم ايداع المبلغ بنجاح");

    let newAction = {
      beforeBalance: balance,
      amount: amount,
      afterBalance: newBalance,
      type: "deposit",
    };
    let copy = [...transactions];
    copy.push(newAction);
    setTransactions(copy);

    let transJSON = JSON.stringify(copy);

    localStorage.setItem("balance", newBalance);
    localStorage.setItem("transactions", transJSON);
  };

  const withdraw = () => {
    let amount = +amountInput.current.value;

    if (amount <= balance) {
      let newBalance = balance - amount;
      setBalance(newBalance);
      amountInput.current.value = "";

      let newAction = {
        beforeBalance: balance,
        amount: amount,
        afterBalance: newBalance,
        type: "withdraw",
      };
      let copy = [...transactions, newAction];
      setTransactions(copy);
      let transJSON = JSON.stringify(copy);
      localStorage.setItem("balance", newBalance);
      localStorage.setItem("transactions", transJSON);
    } else {
      toast.error("يا ابو شراب مقطوع🤣🤣🤣🤣🤣🤣");
    }
  };

  return (
    <div
      className="w-full h-dvh bg-gray-200 overflow-auto flex justify-center"
      data-theme="light"
    >
      <Toaster />
      <div className="container">
        <div className="py-4 bg-gray-950 text-white text-center text-2xl flex justify-center gap-3">
          <h1>Your Balance is : {isShow ? balance : "*****"}</h1>
          <button
            className={`btn ${isShow ? `btn-primary` : `btn-error`}`}
            onClick={() => {
              isShow ? setIShow(false) : setIShow(true);
            }}
          >
            {isShow ? "Hide" : "Show"} Balance
          </button>
        </div>
        <div className="py-4">
          <input
            ref={amountInput}
            className="input"
            type="number"
            placeholder="Enter Amount"
          />
          <button className="btn btn-error" onClick={withdraw}>
            Withdraw
          </button>
          <button className="btn btn-success" onClick={deposit}>
            Deposit
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Before Balance</th>
              <th>Type</th>
              <th>Amount</th>
              <th>AfterBalance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((el, index) => {
              return (
                <tr
                  key={index}
                  className={
                    el.type == "deposit" ? "bg-green-200" : "bg-red-200"
                  }
                >
                  <td>{index + 1}</td>
                  <td>{el.beforeBalance} EGP</td>
                  <td>{el.type}</td>
                  <td>{el.amount} EGP</td>
                  <td>{el.afterBalance} EGP</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}