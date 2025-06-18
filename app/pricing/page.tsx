"use client";
import React, { useState } from "react";
import Tamplate from "../components/common/template";
import Pricing from "../components/pricing/pricing";

const Service = () => {
  return (
    <Tamplate>
      <div className="bg-white py-8 px-6 md:px-20 space-y-16">
        <Pricing />
      </div>
    </Tamplate>
  );
};

export default Service;
