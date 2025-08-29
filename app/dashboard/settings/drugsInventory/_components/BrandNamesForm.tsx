"use client";
import React, { useState } from "react";
import { useDrugsInventoryStore } from "./DrugsInventoryStore";
import axios from "axios";

const BrandNamesForm = () => {
  const { drug } = useDrugsInventoryStore();
  const [brandName, setBrandName] = useState("");

  const handleClickBrandName = async () => {
    const brandNames = [...drug.brandNames, { brand_name: brandName }];
    alert("Brand name clicked");
    const response = await axios.patch("/api/drugs/" + drug.generic_id, {
      brandNames,
    });
    if (response.status === 200) {
      alert("Brand name added successfully");
    } else {
      alert("Failed to add brand name");
    }
  };

  return (
    <div>
      <h2>Brand Names for {drug.generic_name}</h2>
      {drug.brandNames && drug.brandNames.length > 0 ? (
        <ul>
          {drug.brandNames.map((brand) => (
            <div key={brand.brand_name}>
              <span>{brand.brand_name}</span>
              {/* Add more details or actions for each brand name if needed */}
              {brand.brand_details && brand.brand_details.length > 0 ? (
                <ul>
                  {brand.brand_details.map((detail) => (
                    <li key={detail.form}>
                      {detail.form} - {detail.form} - {detail.strength}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </ul>
      ) : (
        <p>No brand names available for this drug.</p>
      )}
      {/* Add form elements to add a new brand name */}

      <h3>Add New Brand Name</h3>
      <input
        type="text"
        placeholder="Brand Name"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />
      <button onClick={handleClickBrandName}>Add Brand Name</button>
    </div>
  );
};

export default BrandNamesForm;
