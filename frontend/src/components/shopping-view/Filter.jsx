import React, { Fragment } from "react";
import { filterOptions } from "../../config";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white text-black rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-semibold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={
                        filters?.[keyItem]?.includes(option.id) || false
                      }
                      onChange={() => handleFilter(keyItem, option.id)}
                    />
                    <span className="text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="divider"></div> {/* DaisyUI Divider */}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
