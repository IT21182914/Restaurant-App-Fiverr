import React from "react";
import Menu from "../components/Menu";
import OrderForm from "../components/OrderForm";
import QRCodeGenerator from "../components/QRCodeGenerator";

const Home = () => {
  return (
    <div>
      <Menu />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <OrderForm />
          <QRCodeGenerator />
        </div>
      </div>
    </div>
  );
};

export default Home;
