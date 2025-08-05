"use client";
import React from "react";
import Tamplate from "../components/common/template";
import ReviewForm from "../components/form/reviewForm";

const ReviewsPage = () => {
  return (
    <Tamplate>
      <div className="py-10 px-4 md:px-10 bg-[#F4F7FF] ">
        <ReviewForm />
      </div>
    </Tamplate>
  );
};

export default ReviewsPage;
